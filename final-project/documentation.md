# TV SHOWS

---

Name: Ellen Pearson

Date: 5/2/2020

Project Topic: Popular TV Shows

URL: https://final-project-tv.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields for TV Shows:
- `Field 1`: Title          `Type: String`
- `Field 2`: Release Year   `Type: Number`
- `Field 3`: Genre          `Type: String`
- `Field 4`: Seasons        `Type: Number`
- `Field 5`: Url            `Type: String`
- `Field 6`: Reviews        `Type: [String]`

Data point fields for Reviews:
- `Field 1`: Rating          `Type: Float`
- `Field 2`: Comment         `Type: String`
- `Field 3`: Author          `Type: String`

Schema for TV Show:
```javascript
{
    title: String,
    year: Number,
    genre: String,
    seasons: Number,
    url: String,
    reviews: [String]
}
```

Schema for Review:
```javascript
{
    rating: Number,
    comment: String,
    author: String
}
```

### 2. Add New Data

##Add Show

POST endpoint route: `/show/addShow`

Uses socket.io so that users can see added show in real time

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/show/addShow',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        title: 'The Office',
        year: 2005,
        genre: "Comedy",
        seasons: 9,
        url: "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
##Add Review to Show

POST endpoint route: `/show/:id/newReview`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/show/5ea629efd3a10c5baec5ad15/newReview',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        rating: 7.9,
        comment: "Okay...",
        author: "Ellie Pearson"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
### 3. Delete Data

##Delete Show

DELETE endpoint route: `/show/:id`

Example Node.js DELETE request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'DELETE',
    url: 'http://localhost:3000/show/5ea629efd3a10c5baec5ad15',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        id: '5ea629efd3a10c5baec5ad15',
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

##Delete Review
DELETE endpoint route: `/show/:id/review/delete`

Example Node.js DELETE request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'DELETE',
    url: 'http://localhost:3000/show/5ea629efd3a10c5baec5ad15/review/delete',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        id: '5ea629efd3a10c5baec5ad15',
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 4. View Data

GET endpoint route to view shows: `/show/`
GET endpoint route view reviews: `/reviews`

### 5. Search Data

Search Field: `title`

### 6. Navigation Pages

Navigation Filters
1. Select a Genre -> `/show/genre/:genre`
2. Select a Year -> `/show/year/:year`
3. Find a Show's Review -> `/show/:id/reviews`
4. Find Tweets -> `/show/tweets/:title`
5. Find Videos -> `/show/youtube/:title`
6. Find Oldest Show -> `/show/oldest`

### 7. Module used

I used a module export in data.js to find the oldest show.

It exports getData() which returns the data for that show.


### 8. npm packages
1. Youtube-search -> gathers youtube videos with title
2. Twitter -> finds Tweets with a specific query
