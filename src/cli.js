const express = require('express');
const ngrok = require('ngrok');
const path = require('path');
const fs = require('fs')
const PORT = 6000;

const app = express();

export function cli(args) {
  const filePath = args[2];
  if (!fs.existsSync(filePath)) {
    console.log("The file does not exist. Please try again (:");
  } else {
    app.listen(PORT, async function(req, res) {
      const url = await ngrok.connect(PORT);
      console.log("Your file "+filePath+" is available at: "+url);
      console.log("Share the URL with anyone across the web!")
    });

    app.get('/', function(req, res) {
      console.log("Your file "+filePath+" has been downloaded by someone");
      res.download(path.join(process.cwd(), filePath));
    })
  }
};
