# Final Project
#### Out: 4/13/20 | Deadline: 5/8/20 11:59 PM

### Description of the project

This project is designed to take information about shows and allow users to write reviews about them. It uses sockets when adding shows so that users can see them in real time. Users have the ability to add shows, delete show, add reviews for a specific show and delete the latest review of a show. They are able to categorize the shows by genre and by year.

### GET Requests


1. "/" -> displays all shows and navigation bar

2. "/show/description" -> displays the description of the program

3. "/show/youtube/:show" -> using the youtube-search npm package, gets 5 youtube videos with the name of the show in the title

4. "/show/tweets/:id" -> using the Twitter npm package, finds 50 tweets with the show title in the tweets

5. "/show/getShows" -> displays all the shows, with their title, year and genre

6. "/show/genre/:genre_type" -> gets all the shows with the specified genre

7. "/show/year/:year" -> returns all the shows that started in that year

8. "/show/:id/reviews" -> shows all the reviews for a specified show

### DELETE Requests

1. "/show/:id" -> deletes specific show using the id

2. "/show/:id/review/delete" -> deletes a show's latest review

### POST Requests

1. "/show/addShow" -> adds a show using sockets with title, year and genre

2. "/show/:id/newReview" -> adds a review to a show using the id of the show


### Handlebars pages

1. main.handlebars -> creates navigation bar and handles socket.io

2. home.handlebars -> displays all the shows or shows of a specific year

3. create.handlebars -> form that allows user to input show

4. apis.handlebars -> displays the content from the youtube-search and twitter npm packages

5. review.handlebars -> form that allows user to input review for a show

6. shows.handlebars -> displays all  the reviews for a show

7. genre.handlebars -> displays all the shows of a specific genre with just the title and year

8. description.handlebars -> shows the description of the project and my name


### Modules

1. exports schema from TVShow.js in models folder to index.js


### NPM packages

1. Twitter npm package

2. youtube-search npm package
