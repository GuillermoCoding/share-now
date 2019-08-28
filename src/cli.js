import express from 'express'
const walk = require('../traversing.js');
const ngrok = require('ngrok');
const PORT = 3000;

const app = express();

export function cli(args) {
  walk(args[2], function(err, results) {
    console.log(results); 
  }, app);
  app.use(args[2].substr(1), express.static(args[2].substr(2)))
  app.listen(3000, async function(req, res) {
    const url = await ngrok.connect(PORT);
    console.log('Listening....');
	console.log(url);
  });

}
