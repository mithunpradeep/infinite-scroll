// API to retrive randomly generated email ids

var router = require('express').Router();

var email_gen = require('../../util/email_gen');

var image_gen = require('../../util/down_images');

router.get('/', async function (req, res, next) {
    var avatarList = email_gen(req.query.count);
    var down_img_list = [];
    for (var avatar of avatarList) {
        down_img_list.push(image_gen(avatar['hash']));
    }
    Promise.all(down_img_list)
        .then(function () {
            return res.json({
                'avatars': avatarList,
                'status': true
            })
        })
        .catch(function (err) {
            return res.json({
                'avatars': avatarList,
                'status': false
            })
        });
});

module.exports = router;