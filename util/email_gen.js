var crypto = require('crypto')

module.exports = function (count) {
    var emails = [];
    var imagePromise = [];
    // Character set for email address
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    for (var i = 0; i < count; i++) {
        var email = '';
        // unique email with 10 to 12 characters
        var emailLength = Math.floor(Math.random() * 3) + 10;
        for (var j = 0; j < emailLength; j++) {
            email += chars[Math.floor(Math.random() * chars.length)];
        }
        // add domain
        email = email + '@avalara.com';
        emailHash = crypto.createHash('md5').update(email).digest("hex");
        emails.push({
            'email': email,
            'hash': crypto.createHash('md5').update(email).digest("hex"),
        });
    }
    return emails;
}