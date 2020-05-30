from flask import Flask, jsonify, request
import speech_recognition as sr
from os import path
from pydub import AudioSegment
from pytube import YouTube
from google.cloud import storage
from google.cloud import videointelligence

import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx

app = Flask(__name__)


@app.route('/')
def root():
    return "Hello world!"


@app.route('/transcribe/<string:video_id>', methods=['GET', 'POST'])
def transcribe(video_id):
    videoFile = YouTube(
        f'http://youtube.com/watch?v={video_id}').streams.get_highest_resolution().download(filename="Video")

    storageCli = storage.Client()
    # # get bucket
    bucket = storageCli.get_bucket('descriptor')
    blob = bucket.blob('Video.mp4')
    blob.upload_from_filename('Video.mp4')

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

    print("\nProcessing video for speech transcription.")

    result = operation.result(timeout=3000)

    # There is only one annotation_result since only
    # one video is processed.
    annotation_results = result.annotation_results[0]
    wallOfText = ""
    for speech_transcription in annotation_results.speech_transcriptions:
        for alternative in speech_transcription.alternatives:
            wallOfText += alternative.transcript

    global paragraph
    paragraph = wallOfText
    print(paragraph)
    return "OK"


# @app.route('/transcribe/<string:video_id>', methods=['GET', 'POST'])
# def transcribe(video_id):

#     # convert mp3 file to wav
#     sound = AudioSegment.from_mp3(f"../videos/{video_id}/{video_id}.mp3")
#     sound.export(f"../videos/{video_id}/{video_id}.wav", format="wav")

#     AUDIO_FILE = f"../videos/{video_id}/{video_id}.wav"
#     # use the audio file as the audio source
#     r = sr.Recognizer()
#     with sr.AudioFile(AUDIO_FILE) as source:
#         audio = r.record(source)  # read the entire audio file
#         print("Transcription: " + r.recognize_google(audio))


# def transcribe_get_all(url):
#     startTime = datetime.now()
#     """Transcribe speech from a video stored on GCS."""
#     video_client = videointelligence.VideoIntelligenceServiceClient()
#     features = [videointelligence.enums.Feature.SPEECH_TRANSCRIPTION]

#     config = videointelligence.types.SpeechTranscriptionConfig(
#         language_code="en-US", enable_automatic_punctuation=True
#     )
#     video_context = videointelligence.types.VideoContext(
#         speech_transcription_config=config
#     )

#     operation = video_client.annotate_video(
#         "gs://videos12491/trimmed.mp4", features=features, video_context=video_context
#     )

#     print("\nProcessing video for speech transcription.")

#     result = operation.result(timeout=3000)

#     # There is only one annotation_result since only
#     # one video is processed.
#     annotation_results = result.annotation_results[0]
#     for speech_transcription in annotation_results.speech_transcriptions:
#         # print(speech_transcription)

#         # The number of alternatives for each transcription is limited by
#         # SpeechTranscriptionConfig.max_alternatives.
#         # Each alternative is a different possible transcription
#         # and has its own confidence score.
#         for alternative in speech_transcription.alternatives:
#             print("Alternative level information:")

#             print("Transcript: {}".format(alternative.transcript))
#             print("Confidence: {}\n".format(alternative.confidence))

#             print("Word level information:")
#             for word_info in alternative.words:
#                 word = word_info.word
#                 start_time = word_info.start_time
#                 end_time = word_info.end_time
#                 print(
#                     "\t{}s - {}s: {}".format(
#                         start_time.seconds + start_time.nanos * 1e-9,
#                         end_time.seconds + end_time.nanos * 1e-9,
#                         word,
#                     )
#                 )
