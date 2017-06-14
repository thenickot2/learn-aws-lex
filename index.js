import Promise from 'bluebird';
import GreetingService from './services/GreetingService';
import MovieService from './services/MovieService';

// Route the incoming request based on intent.
exports.handler = (event, context, callback) => {
  const intentName = event.currentIntent.name;
  console.log(`request received for userId=${event.userId}, intentName=${intentName}`);
  
  const greetingService = new GreetingService;
  const movieService = new MovieService;
  
  let promise = Promise.reject;
  
  switch (intentName) {
    case 'greeting':
      promise = greetingService.dispatch(event);
      break;
    case 'movieInfo':
      promise = movieService.dispatch(event);
      break;
  }
  
  promise
    .then((response) => {
      callback(null, response);
      return;
    }).catch((err) => {
      callback(err);
      return;
    });
};
