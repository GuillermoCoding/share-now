const express = require('express');
const ngrok = require('ngrok');
const path = require('path');
const PORT = 3000;

const app = express();

export function cli(args) {
  app.listen(3000, async function(req, res) {
    const url = await ngrok.connect(PORT);
    console.log("Your file "+args[2]+" is available at: "+url);
  });

  app.get('/', function(req, res) {
    console.log("Your file "+args[2]+" has been downloaded");
    res.download(path.join(process.cwd(), args[2]));
  })
};
