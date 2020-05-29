from flask import Flask, jsonify, request
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)


@app.route('/')
def root():
    return 200


@app.route('/transcript/<string:video_id>', methods=['GET', 'POST'])
def get_transcript(video_id):
    return jsonify(YouTubeTranscriptApi.get_transcript(video_id))
