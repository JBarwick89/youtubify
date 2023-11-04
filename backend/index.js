const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
require('dotenv').config();
 
app.get('/apikey', (req, res) => {
  res.send(process.env.YOUTUBE_API_KEY);
});

app.listen(port, () => console.log(`Backend is running on ${port}`));
