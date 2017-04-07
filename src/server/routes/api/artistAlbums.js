'use strict';
/* eslint-disable no-unused-vars */
const express   = require('express');
const Client    = require('node-rest-client').Client;
const appConfig = require('../../config');

const router = express.Router();
const client = new Client();

router.get('/:id', (req, res) => getArtistAlbums(req, res));


function getArtistAlbums(req, res) {
  const artistId = req.params.id;
  const url = urlForArtistAlbums(artistId);

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

function urlForArtistAlbums(id = '') {
  const BASE_URL = appConfig.spotify.artistAlbums;
  return `${BASE_URL}/${id}/albums`;
}


module.exports = router;
