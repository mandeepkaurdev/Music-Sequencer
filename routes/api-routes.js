var db = require("../models");

/*
1-user routes
2-beat routes
*/

module.exports = function (app) {
    /*1*/
    app.get('/api/users', function (req, res) {
        db.User.findAll({})
            .then(function (dbUser) {
                res.json(dbUser);
            });
    });


    app.post("/api/users", function (req, res) {
        console.log(req.body)
        db.User.create({
            username: req.body.username,
            password: req.body.password
        }).then(function (dbUser) {
            res.json({ user: dbUser, status: 301 });


        })
            .catch(function (err) {
                res.json(err);
            });
    });
    /*2*/
    //     app.get('/api/beats', function () {
    //         db.Beats.findAll({})
    //     })

    app.post('/api/beats', function (req, res) {
        db.Beats.create({
            array: req.body.array,
            beatOwner: req.body.beatOwner
        })
    });
};


