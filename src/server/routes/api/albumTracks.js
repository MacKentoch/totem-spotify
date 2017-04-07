'use strict';
/* eslint-disable no-unused-vars */
const express   = require('express');
const Client    = require('node-rest-client').Client;
const appConfig = require('../../config');

const router = express.Router();
const client = new Client();

router.get('/:id', (req, res) => getAlbumTracks(req, res));


function getAlbumTracks(req, res) {
  const albumId = req.params.id;
  const url = urlForAlbumTracks(albumId);

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

function urlForAlbumTracks(id = '') {
  const BASE_URL = appConfig.spotify.albumTracks;
  return `${BASE_URL}/${id}/tracks`;
}


module.exports = router;
