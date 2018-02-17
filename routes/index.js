var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://jwana:jan51999@ds129733.mlab.com:29733/jwana').then(
    function () {
        console.log("database connected")
    }
).catch(function (error) {
        console.log(error.message);
    }
);
var Movie = mongoose.model('Movie', {
    name: String,
});
/* GET home page. */
router.get('/movies', function (req, res, next) {
    res.render('one and only');
});
router.get('/secondpage', function (req, res) {
    res.render('second page');
});
router.get('/api/movies', function (req, res) {
    //
    // console.log("oyguy")
    Movie.find(function (error, movies) {
        res.json(movies);
    });
});
router.get('/movies/secondpage', function (req, res) {
    res.render('second page')
});
router.post('/api/movies', function (req, res) {
    var newMovie = req.param('movie');
    var dataBaseMovie = new Movie(newMovie);

    dataBaseMovie.save().then(function () {

        console.log("saved")
        res.json({
            isSuccess: true,
            message: "name saved"
        })
    }).catch(function (error) {

        console.log("error", error)
        res.json({
                isSuccess: false,
                message: error.message
            }
        )
    })
})
;
router.delete('/api/movies', function (req, res) {
    console.log(req.params);
    var id = req.param('id');
    console.log(id);

    Movie.findByIdAndRemove(id).then(function () {
        console.log("deleted")
    }).catch(function (error) {
        console.log(error)
    })

})


module.exports = router;
