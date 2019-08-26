var fs = require('fs');
var walk = function(dir, done, app) {
  app.get('/src', function(req, res) {
    res.send('Hello World') 
  });
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
      var i = 0;
      (function next() {
	    console.log(list)
        var file = list[i++];
		console.log('file:')
		console.log(file)
        if (!file) return done(null, results);
          file = dir + '/' + file;
          fs.stat(file, function(err, stat) {
		    console.log('stat');
			console.log(stat.isDirectory())
            if (stat && stat.isDirectory()) {
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
