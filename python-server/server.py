from flask import Flask, jsonify, request, Response, send_from_directory
from flask_cors import CORS
import speech_recognition as sr
import subprocess
from os import path
import json
from pytube import YouTube
from google.cloud import storage
from google.cloud import videointelligence
from fpdf import FPDF
import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx

from nlp import generate_summary, format_summary

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route('/api/youtube/download-video/', methods=['POST'])
def download_video():
    id = request.get_json()['id']
    # Get youtube video from id and download it
    videoFile = YouTube(
        f'http://youtube.com/watch?v={id}').streams.filter(only_audio=True).first().download(filename=id)
    return Response(status=200)


@app.route('/api/youtube/upload-video/', methods=['POST'])
def upload_video():
    bucket_name = request.get_json()['bucket_name']
    id = request.get_json()['id']
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(f'{id}.mp4')
    blob.upload_from_filename(f'{id}.mp4')
    return Response(status=200)


@app.route('/api/youtube/transcribe/', methods=['POST'])
def transcribe():
    id = request.get_json()['id']
    video_client = videointelligence.VideoIntelligenceServiceClient()
    features = [videointelligence.enums.Feature.SPEECH_TRANSCRIPTION]
    config = videointelligence.types.SpeechTranscriptionConfig(
        language_code='en-US', enable_automatic_punctuation=True
    )
    video_context = videointelligence.types.VideoContext(
        speech_transcription_config=config
    )
    operation = video_client.annotate_video(
        f'gs://descriptor/{id}.mp4', features=features, video_context=video_context
    )

    # Get transcription of video
    result = operation.result(timeout=3000)

    # Format result of transcription call
    annotation_results = result.annotation_results[0]
    transcript = ''
    for speech_transcription in annotation_results.speech_transcriptions:
        for alternative in speech_transcription.alternatives:
            transcript += alternative.transcript

    return transcript


@app.route('/api/youtube/format/', methods=['POST'])
def format():
    transcript = request.get_json()['transcript']
    id = request.get_json()['id']

    # Generate summary from transcript
    summary = generate_summary(transcript)

    # Format summary into notes form
    notes = format_summary(summary)

    print(notes)

    # What to return back in api call
    data = {
        'transcript': transcript,
        'summary': summary,
        'notes': notes
    }

    return jsonify(data)


@app.route('/api/summary', methods=['POST'])
def summary():
    input = request.get_json()['input']
    try:
        output = generate_summary(input)
        return output
    except:
        return 'ERROR'


@app.route('/api/pdf/<path:filepath>')
def data(filepath):
    return send_from_directory('pdfs', filepath)
