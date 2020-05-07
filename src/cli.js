const colors = require('colors');
const express = require('express');
const fs = require('fs')
const ngrok = require('ngrok');
const path = require('path');
const expressUserAgent = require('express-useragent');

const PORT = 0;
const app = express();

export function cli(args) {
  const filePath = args[2];

  if (!fs.existsSync(filePath)) {
    console.log(`ERROR: The file path not exist. Please try again.`.brightRed);
  } else {
    const server = app.listen(PORT, async (req, res) => {
      const url = await ngrok.connect(server.address().port);
      console.log('SUCCESS! '.brightGreen);
      console.log(`Your file ${filePath.yellow} is available for download at -> ${url.brightBlue}`);
      console.log('We will notify you here once the file has been downloaded.');
    });
    app.get('/', (req, res) => {
      const source = req.headers['user-agent'];
      const userAgent = expressUserAgent.parse(source);

      if (!userAgent.isBot) {
        res.download(path.join(process.cwd(), filePath), (err)=>{
          if (err) {
            console.log(`ERROR: The file was not able to be downloaded successfully. Please try again`.brightRed);
          } else {
            console.log(`Your file ${filePath} has been downloaded! 'CTRL + C' to stop sharing.`.brightYellow);
          }
        });
      }
    });
  };
};
