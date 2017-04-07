'use strict';

/* eslint no-console:0 */
/* eslint no-process-env:0 */

const express     = require('express');
const bodyParser  = require('body-parser');
const helmet      = require('helmet');
const morgan      = require('morgan');
const routes      = require('./routes');
const config      = require('./config');

const app = express();

app.use(helmet()); // ensure app security (a bare minimum for a little code)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined')); // dev logs
}

app.use(express.static(config.staticsPath));

/** ========================================================
 *    ROUTES
 ======================================================== */
app.use('/api/search', routes.api.search);
app.use('/api/artist', routes.api.artistAlbums);
app.use('/api/album', routes.api.albumTracks);

/* ======================================================= */
// SPA app
app.use('*', routes.home);

/** ========================================================
 *    ERROR HANDLING (really basic)
 ======================================================== */
// catch 404 and forward to error handler
app.use(
  (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
);

// error handler
/* eslint-disable no-unused-vars  */
app.use(
  (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  }
);
/* eslint-enable no-unused-vars  */
/* ======================================================= */

app.set('port', config.port);
app.set('ipAdress', config.apiAdress);

// launch server:
app.listen(
  app.get('port'),
  app.get('ipAdress'),
  'localhost',
  () => console.log(
    'Server running on  %s:%s',
    app.get('ipAdress'),
    app.get('port')
  )
);

module.exports = app; // export app just for testing purpose (even if I don't write them right now since it is not the purpose)
