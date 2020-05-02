var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var reviewSchema = new mongoose.Schema({
    rating:{
        type: Number,
        min: 0.0,
        max: 10.0,
        required: true
    },
    comment: {
        type: String
    },
    author: {
        type: String,
        required: true
    }
});


//Let's define a second schema

var tvSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    reviews:[reviewSchema]
});

var TVShow = mongoose.model('TVShow', tvSchema);
module.exports = TVShow;
