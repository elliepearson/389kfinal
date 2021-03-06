
var express = require('express');
var Twitter = require('twitter');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
mongoose.Promise=global.Promise;
var TVShow = require('./models/TVShow');
var data =  require('./data');
var _ = require("underscore");
var http = require('http').Server(app);
var io = require('socket.io')(http);
var search = require('youtube-search');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Load envirorment variables
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public'));
app.engine('handlebars', exphbs({
  helpers: {
        nospace: function (value) { return value.split(" ").join(""); },
        link: function (value) {
             return "https://www.youtube.com/embed/" + value;
        }
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',

}));
app.set('view engine', 'handlebars');
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var client = new Twitter({
  consumer_key: '8oI9FXNsEUYSSvjH4c4znyQ7K',
  consumer_secret: 'DsTClf89t1J1IatuCLhGX4EAbTAOEEF4RchGmQLR6N55PD5ZRt',
  access_token_key: '1255649439735111680-ix9aJTjsazFLKlOPauyMVrLFTnVGM6',
  access_token_secret: '57LJQ7SQcWSYJunzrLbJCfE2sDs1NTQpJMzTlRf4rmRfu'
});

var opts = {
  maxResults: 5,
  type: "video",
  key: 'AIzaSyDsur2FURmn0OmDYB5jRG4Rpb5Qzg6hZ2c'
};

let ids = {};

app.get('/',function(req,res){
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;
    res.render('home', {
      name: "Home",
      create: true,
      search: ids,
      data: ids
    });
});

});


app.get('/show',function(req,res){
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;
    res.send(shows);
  });
});

app.get('/reviews',function(req,res){
  TVShow.find({}, 'reviews', function(err, shows){
    if(err) throw err;
    ids = shows;
    res.send(shows);
  });
});

app.get('/show/description',function(req,res){
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;
    res.render('description', {
      name: "Description",
      create: true,
      data: ids,
      tv: shows
    });

  });

});

//YOUTUBE SEARCH NPM
app.get('/show/youtube/:show',function(req,res){
  search(req.params.show, opts, function(err, results) {
    if(err) return console.log(err);
    res.render('apis', {
      name: "Youtube",
      create: true,
      data: ids,
      youtube: results
    });
  });
});


//TWITTER NPM
app.get('/show/tweets/:id', function (req, res, next) {
  let text = [];
  client.get('search/tweets', {q: req.params.id, count:50, lang: 'en' }, function(error,data,response){
    if(error){
        console.log('Not good');
    }else{
         let statuses= data.statuses;
         for(let i=0; i<statuses.length; i++){
             text[i] = statuses[i].text;
         }
         res.render('apis', {
           name: "Tweets",
           create: true,
           data: ids,
           tweets: text,
         });

      }
    });

  });

app.get('/show/getShows', function(req, res) {
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;

    res.render('home', {
      name: "All TV Shows",
      create: true,
      data: ids,
      tv: shows
    });
  });

});

app.get('/show/oldest', function(req, res) {
  TVShow.find({}, function(err, shows){
    if(err) throw err;
    ids = shows;
    contents = data.getShows(ids);
    res.render('home', {
      name:  "Oldest Show",
      create: true,
      data: ids,
      tv: [contents]
    });
  });

});


app.get('/show/genre/:genre_type', function(req, res) {
  TVShow.find({genre: req.params.genre_type.toLowerCase()}, function(err, shows){
    if(err) throw err;
    res.render('genre', {
      name: req.params.genre_type.charAt(0).toUpperCase() +   req.params.genre_type.slice(1),
      create: true,
      data: ids,
      tv: shows
      });
    });
});

app.get('/show/year/:year', function(req, res) {
  TVShow.find({year: req.params.year}, function(err, shows){
    if(err) throw err;
    res.render('home', {
      name: req.params.year,
      create: true,
      data: ids,
      tv: shows
      });
    });

});

app.get('/show/:id/reviews', function(req, res) {
  TVShow.findById(req.params.id, 'reviews', function(err, shows){
    if(err) throw err;
    res.render('shows', {
      reviews: shows.reviews,
      id: req.params.id,
      name: "Reviews",
      create: true,
      data: ids,
      tv: shows
      });
    });

});

app.get('/show/addShow', function(req, res) {
  TVShow.find({}, 'reviews', function(err, shows){
    if(err) throw err;
    res.render('create', {
      name: "Add Show",
      create: true,
      data: ids,
      tv: shows
    });

    });
});

app.get("/show/:id/newReview", function(req, res) {
  TVShow.findById(req.params.id, 'reviews', function(err, shows){
    if(err) throw err;
    res.render('review' ,{
      name: "Input New Review",
      id: req.params.id,
      data: ids
    });
    });
});

app.get("/show/:id", function(req, res) {
  TVShow.findByIdAndRemove(req.params.id, function(err, show) {
    if (err) throw err;
   if (!show) {
       return res.send('No show found with given ID.');
   }
  res.redirect('/show/getShows');
 });
});


app.get('/show/:id/review/delete', function(req, res) {
  TVShow.findOne({_id: req.params.id}, function(err, show){
    if(err) throw err;
    if(!show){
      res.send('No show found');
    }
    show.reviews.pop();
    show.save(function(err){
      if (err) throw err;
      res.redirect('/show/'+req.params.id+'/reviews');
    });
  });
});


app.post('/show/addShow', function(req, res) {
  var tv = new TVShow({
      title: req.body.title,
      year: parseInt(req.body.year),
      genre: req.body.genre,
      seasons: parseInt(req.body.seasons),
      url: req.body.url,
      reviews: []
  });
  tv.save(function(err) {
      if (err) throw err;
      res.redirect('/');
      io.emit('new show', tv);
  });


});

app.post('/show/:id/newReview', function(req, res) {
  TVShow.findOne({_id: req.params.id}, function(err, show){
    if(err) throw err;
    if(!show){
      res.send('No show found');
    }
    show.reviews.push({
      rating: parseFloat(req.body.rating),
      comment: req.body.comment,
      author: req.body.author
    });
    show.save(function(err){
      if (err) throw err;
      res.redirect('/show/'+req.params.id+'/reviews');
    });

  });

});

app.delete('/show/:id', function(req, res) {
  TVShow.findByIdAndRemove(req.params.id, function(err, show) {
    if (err) throw err;
   if (!show) {
       return res.send('No show found with given ID.');
   }
   res.redirect('/show/getShows');
});

});


app.delete('/show/:id/review/delete', function(req, res) {
  TVShow.findOne({_id: req.params.id}, function(err, show){
    if(err) throw err;
    if(!show){
      res.send('No show found');
    }
    show.reviews.pop();
    show.save(function(err){
      if (err) throw err;
      res.redirect('/show/'+req.params.id+'/reviews');

    });
  });

});


io.on('connection', function(socket) {
    console.log('NEW connection');
    socket.on('new show', function(show) {
        io.emit('new show', show);
    });


    socket.on('disconnect', function() {
        console.log('User has disconnected');
    });



});



http.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
})
