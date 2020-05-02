# TV SHOWS

---

Name: Ellen Pearson

Date: 5/2/2020

Project Topic: Popular TV Shows

URL:

---


### 1. Data Format and Storage

Data point fields for TV Shows:
- `Field 1`: Title          `Type: String`
- `Field 2`: Release Year   `Type: Number`
- `Field 3`: Genre          `Type: String`
- `Field 4`: Reviews        `Type: [String]`

Data point fields for Reviews:
- `Field 1`: Rating          `Type: Float`
- `Field 2`: Comment         `Type: String`
- `Field 3`: Author          `Type: String`

Schema for TV Show:
```javascript
{
    title: String,
    year: Number,
    genre: String
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

HTML form route: `/addShow`

POST endpoint route: `/show/addShow`

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
        genre: "Comedy"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
##Add Review to Show

HTML form route: `/:id/newReview`

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

HTML form route: `/:id`

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
HTML form route: `/:id/review/delete`

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

### 3. View Data

GET endpoint route to view shows: `/show/getShows`
GET endpoint route view show's review: `/show/:id/reviews`


### 4. Navigation Pages

Navigation Filters
1. Select a Genre -> `/show/genre/:genre`
2. Select a Year -> `/show/year/:year`
3. Find a Show's Review -> `/show/:id/reviews`
4. Find Tweets -> `/show/tweets/:title`
5. Find Videos -> `/show/youtube/:title`

### 5. npm packages
1. Youtube-search -> gathers youtube videos with title
2. Twitter -> finds Tweets with a specific query
