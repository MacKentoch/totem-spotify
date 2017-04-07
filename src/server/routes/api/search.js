'use strict';
/* eslint-disable no-unused-vars */
const express   = require('express');
const Client    = require('node-rest-client').Client;
const appConfig = require('../../config');

const router = express.Router();
const client = new Client();

router.get('/', (req, res) => search(req, res));


function search(req, res) {
  const searchPayload = req.query.q;
  const searchOffset  = req.query.offset;

  if (!searchPayload) {
    return res.status(200).json({ info: 'search payload is empty' });
  }

  // call Spotify search API:
  const url = searchOffset
    ? urlForSearchWithOffset(searchPayload, searchOffset)
    : urlForSearchNoOffset(searchPayload);

  return client
    .get(
      url,
      (data, reponse) => res.status(200).json(data)
    )
    .on(
      'error',
      (err) => res.status(500).json(err.request.options)
    );
}

function urlForSearchNoOffset(searchPayload = '') {
  const BASE_URL = appConfig.spotify.searchAPI;
  return `${BASE_URL}?q=${searchPayload}&type=artist`;
}

function urlForSearchWithOffset(searchPayload = '', offset = 0) {
  const BASE_URL = appConfig.spotify.searchAPI;
  return `${BASE_URL}?q=${searchPayload}&type=artist&offset=${offset}`;
}

module.exports = router;
