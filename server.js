const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const video = require('./routes/api/video');

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// For development
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/video', video);

// For production

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
