const express = require('express');
const YoutubeMp3Downloader = require('youtube-mp3-downloader');
const fs = require('fs');
const youtubedl = require('youtube-dl');
const path = require('path');
const mkdirp = require('mkdirp');

const router = express.Router();

const createDownloader = (video_id) => {
  return new YoutubeMp3Downloader({
    ffmpegPath: '/usr/local/bin/ffmpeg', // Where is the FFmpeg binary located?
    outputPath: path.join(__dirname, '..', '..', 'videos', video_id), // Where should the downloaded and encoded files be stored?
    youtubeVideoQuality: 'highest', // What video quality should be used?
    queueParallelism: 2, // How many parallel downloads/encodes should be started?
    progressTimeout: 2000, // How long should be the interval of the progress reports
  });
};

const makeDirectory = async (video_id) => {
  await mkdirp(path.join(__dirname, '..', '..', 'videos', video_id)).then(
    (made) => {
      console.log('SUCESSFUL');
    },
  );
};

const downloadMp3 = (video_id) => {
  const downloader = createDownloader(video_id);
  downloader.download(video_id);

  downloader.on('finished', function (err, data) {
    console.log(JSON.stringify(data));
  });

  downloader.on('error', function (error) {
    console.log(error);
  });

  downloader.on('progress', function (progress) {
    console.log(JSON.stringify(progress));
  });
};

router.post('/download', async (req, res) => {
  const video_id = req.body.video_id;
  if (video_id) {
    makeDirectory(video_id);
    downloadMp3(video_id);

    res.sendStatus(200);
  }
});

module.exports = router;
