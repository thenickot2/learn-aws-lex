import omdb from '../utils/OMDBUtils';

class MovieService {
  constructor() {
    return this;
  }
  
  close(sessionAttributes, fulfillmentState, message) {
    // Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
    return {
      sessionAttributes,
      dialogAction: {
        type: 'Close',
        fulfillmentState,
        message,
      },
    };
  }
     
  dispatch(intentRequest) {
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const moviename = slots.name;
    const whatInfo = slots.summary.toLowerCase();
    console.log(`request received for Slots=${moviename}, ${whatInfo}`);
        
    return omdb.get({ title: moviename  }, true).then((movie) => {
      if (!movie) {
        return console.log('Movie not found!');
      }
      const movietitle = movie.title;
      const date = movie.year;
      const actors = movie.actors;
      const rating = movie.imdb.rating;
      const plot = movie.plot;
      const votes = movie.imdb.votes;
      const director = movie.director;

      if ( whatInfo === 'rating' ){
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': `Rating of ${moviename} is ${rating}`});
      } else if (whatInfo === 'actors' || whatInfo === 'actor') {
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': `Actors: ${actors}`});
      } else if (whatInfo === 'votes' || whatInfo === 'vote') {
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': `Votes for ${moviename}: ${votes}`});
      } else if (whatInfo === 'plot' || whatInfo === 'story') {
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': `Plot of ${moviename} is: ${plot}`});
      } else if (whatInfo === 'release date'|| whatInfo === 'release year' || whatInfo === 'year') {
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': ` ${moviename} released in: ${date}`});
      } else if (whatInfo === 'director') {
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': `Director of ${moviename} is/are: ${director}`});
      } else {
        return this.close(sessionAttributes, 'Fulfilled',
          {'contentType': 'PlainText', 'content': `MovieName: ${moviename}, Year: ${date}, Actors: ${actors}, Rating: ${rating}, Plot: ${plot} Votes: ${votes} Director: ${director}`});
      }
    });
  }
};

module.exports = MovieService;
