import omdb from 'omdb';
import Promise from 'bluebird';

const OMDBUtils = {
  get: Promise.promisify(omdb.get),
}

module.exports = OMDBUtils;
