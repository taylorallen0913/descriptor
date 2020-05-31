from flask import Flask, jsonify, request
from flask_cors import CORS
import speech_recognition as sr
import subprocess
from os import path
from pytube import YouTube
from google.cloud import storage
from google.cloud import videointelligence

import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx

from nlp import generate_summary, format_summary

app = Flask(__name__)
CORS(app)


@app.route('/')
def root():
    return "Hello world!"


@app.route('/transcribe/youtube/<string:video_id>', methods=['GET', 'POST'])
def transcribe(video_id):

    # Get youtube video from id and download it
    videoFile = YouTube(
        f'http://youtube.com/watch?v={video_id}').streams.filter(only_audio=True).first().download(filename="Video")

    print('Finished downloading video')

    storageCli = storage.Client()
    # Get GCP bucket and upload video
    bucket = storageCli.get_bucket('descriptor')
    blob = bucket.blob('Video.mp4')
    blob.upload_from_filename('Video.mp4')

    print('Finished uploading video')

    # Set up GCP video intelligence service
    video_client = videointelligence.VideoIntelligenceServiceClient()
    features = [videointelligence.enums.Feature.SPEECH_TRANSCRIPTION]

    config = videointelligence.types.SpeechTranscriptionConfig(
        language_code='en-US', enable_automatic_punctuation=True
    )
    video_context = videointelligence.types.VideoContext(
        speech_transcription_config=config
    )

    operation = video_client.annotate_video(
        'gs://descriptor/Video.mp4', features=features, video_context=video_context
    )

    # Get transcription of video
    result = operation.result(timeout=3000)

    # Format result of transcription call
    annotation_results = result.annotation_results[0]
    paragraph = ''
    for speech_transcription in annotation_results.speech_transcriptions:
        for alternative in speech_transcription.alternatives:
            paragraph += alternative.transcript

    # Generate summary from input
    summary = generate_summary(paragraph)

    # Format summary into notes form
    notes = format_summary(summary)

    # What to return back in api call
    data = {
        'paragraph': paragraph,
        'summary': summary,
        'notes': notes
    }

    return jsonify(data)
