import express from 'express'
const walk = require('../traversing.js');
const ngrok = require('ngrok');
const PORT = 3000;

const app = express();

export function cli(args) {
  console.log('cli function arguments');
  console.log(args);
  walk(args[2], function(err, results) {
    console.log(results); 
  }, app);
  app.listen(3000, async function(req, res) {
    const url = await ngrok.connect(PORT);
    console.log('Listening....');
	console.log(url);
  });

}
