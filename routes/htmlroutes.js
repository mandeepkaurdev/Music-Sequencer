// ------- Mandeep's API Routes ------- //
const path = require('path');
var db = require("../models");

module.exports = function (app) {

    app.get('/dashboard', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/dashboard.html'));


    });



};

// ------- Mandeep's API Routes ------- //