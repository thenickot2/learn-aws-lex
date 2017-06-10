import MovieService from './services/MovieService';

// Route the incoming request based on intent.
exports.handler = (event, context, callback) => {
  MovieService.dispatch(event)
    .then((response) => {
      callback(null, response);
      return;
    }).catch((err) => {
      callback(err);
      return;
    });
};
