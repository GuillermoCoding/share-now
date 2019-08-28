const express = require('express');
const path = require('path');

var fs = require('fs');
var walk = function(dir, done, app) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
          file = dir + '/' + file;
          fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              app.use(file.substr(1), express.static(file.substr(2)));
              walk(file, function(err, res) {
                results = results.concat(res);
                        next();
                    }, app);
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

module.exports = walk;
