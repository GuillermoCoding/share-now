const express = require('express');
const app = express();

app.get('/', function(req, res) {
  console.log('Root route hit');
  res.send('Working');
});


app.listen(3000, function (req, res) {
  console.log('Listening on port 3000...')
});
