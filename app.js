var express = require('express');

var app = express();

// set base directory
global.__basedir = __dirname;

// configure rest apis
app.use(require('./routes'));

//config static file hosting
app.use(express.static(__dirname + '/public'));

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on port ' + server.address().port);
});