from flask import Flask, jsonify, request
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


@app.route('/')
def root():
    return "Hello world!"


@app.route('/transcribe/<string:video_id>', methods=['GET', 'POST'])
def transcribe(video_id):
    videoFile = YouTube(
        f'http://youtube.com/watch?v={video_id}').streams.filter(only_audio=True).first().download(filename="Video")

    print('Finished downloading video')

    storageCli = storage.Client()
    # # get bucket
    bucket = storageCli.get_bucket('descriptor')
    blob = bucket.blob('Video.mp4')
    blob.upload_from_filename('Video.mp4')

    print('Finished uploading video')

    video_client = videointelligence.VideoIntelligenceServiceClient()
    features = [videointelligence.enums.Feature.SPEECH_TRANSCRIPTION]

    config = videointelligence.types.SpeechTranscriptionConfig(
        language_code="en-US", enable_automatic_punctuation=True
    )
    video_context = videointelligence.types.VideoContext(
        speech_transcription_config=config
    )
    operation = video_client.annotate_video(
        "gs://descriptor/Video.mp4", features=features, video_context=video_context
    )

    result = operation.result(timeout=3000)

    # There is only one annotation_result since only
    # one video is processed.
    annotation_results = result.annotation_results[0]
    wallOfText = ""
    for speech_transcription in annotation_results.speech_transcriptions:
        for alternative in speech_transcription.alternatives:
            wallOfText += alternative.transcript

    paragraph = wallOfText
    print('Finished transcribing video\n\n')
    print(paragraph)

    summary = generate_summary(paragraph)
    print(summary)
    notes = format_summary(summary)
    print(notes)
    return "OK"
