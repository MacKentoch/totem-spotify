import React from 'react';
import {
  Route,
  IndexRoute
 }                              from 'react-router';
import {
  App,
  ConnectedHome,
  ConnectedArtist,
  ConnectedAlbum
}                               from '../containers';
import {
  PageNotFound
}                               from '../views';

const Routes = () => {
  return (
    <Route path="/" component={App} >
    <IndexRoute component={ConnectedHome} onEnter={scrollToTop} />
    <Route path="/artist/:id" component={ConnectedArtist} onEnter={scrollToTop} />
    <Route path="/artist/album/:id" component={ConnectedAlbum} onEnter={scrollToTop} />
    <Route path="*" component={PageNotFound} onEnter={scrollToTop} />
    </Route>
  );
};

function scrollToTop() {
  window.scrollTo(0, 0);
}

export default Routes;
