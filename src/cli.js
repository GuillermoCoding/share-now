const express = require('express');
const ngrok = require('ngrok');
const colors = require('colors');
const path = require('path');
const fs = require('fs')
const PORT = 0;

const app = express();

export function cli(args) {
  const filePath = args[2];
  if (!fs.existsSync(filePath)) {
    console.log(`ERROR: The file path not exist. Please try again.`.brightRed);
  } else {
    const server = app.listen(PORT, async function(req, res) {
      const url = await ngrok.connect(server.address().port);
      console.log("SUCCESS: ".brightGreen)
      console.log(`Your file ${filePath.brightGreen} is available for download at -> ${url.brightBlue}`);
    });

    app.get('/', function(req, res) {
      console.log(`Your file ${filePath} has been downloaded.`);
      res.download(path.join(process.cwd(), filePath));
    })
  } };
