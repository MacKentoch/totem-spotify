/* eslint-disable no-process-env */
'use strict';

const path = require('path');

const DOCS_PATH = '../../../docs/';

module.exports = {
  port: process.env.PORT || 8080,
  apiAdress: 'localhost',

  staticsPath: path.join(__dirname, DOCS_PATH),
  spotify: {
    searchAPI: 'https://api.spotify.com/v1/search',
    artistAlbums: 'https://api.spotify.com/v1/artists',
    albumTracks: 'https://api.spotify.com/v1/albums'
  }
};
