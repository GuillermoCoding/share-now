const express = require('express');
const ngrok = require('ngrok');
const PORT = 3000;
const app = express();

app.get('/', function(req, res) {
  console.log('Root route hit');
  res.send('Working');
});

app.listen(PORT, async function (req, res) {
  const url = await ngrok.connect(PORT);
  console.log(`Listening on port...${PORT}`);
  console.log(`ngrok url: ${url}`)
});
