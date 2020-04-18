var fs = require('fs')
var http = require('http')
var Stream = require('stream').Transform

// function to download image an save in server location. Later served to UI
module.exports = function (hash) {

    var imagePath = `${__basedir}/public/images/${hash}.png`;

    return new Promise((resolve, reject) => {
        var req = http.request(`http://www.gravatar.com/avatar/${hash}?d=identicon&s=50`, function (response) {
            var data = new Stream();
            response.on('data', function (chunk) {
                data.push(chunk);
            });
            response.on('end', function () {
                fs.writeFileSync(imagePath, data.read());
                resolve(response);
            });
        });
        req.on('error', function (err) {
            reject(req);
        });
        req.end();
    });
}