import React, {
  Component,
  PropTypes
}                             from 'react';
import {
  NavigationBar,
  BackToTop
}                             from '../../components';
import appConfig              from '../../config';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../redux/modules/views';
import Breadcrumb             from '../../components/breadcrumb/Breadcrumb';

class App extends Component {
  static propTypes = {
    // react-router:
    history:    PropTypes.object,
    location:   PropTypes.object,
    actions:    PropTypes.object,
    router:     PropTypes.object,

    children:   PropTypes.node,

    // views:
    currentView: PropTypes.string.isRequired,
    breadcrumb:  PropTypes.arrayOf(PropTypes.string),
    // artist:
    artistId:   PropTypes.string,
    // album:
    albumId:    PropTypes.string
  };

  state = {
    navModel: appConfig.navigation
  };

  render() {
    const { navModel } = this.state;
    const { children, breadcrumb } = this.props;
    return (
      <div id="appContainer">
        <NavigationBar
          brand={navModel.brand}
          navModel={navModel}
          handleLeftNavItemClick={this.handleLeftNavItemClick}
          handleRightNavItemClick={this.handleRightNavItemClick}
        />
        <div className="container">
          <Breadcrumb
            path={breadcrumb}
            onItemClick={this.handleBreadcrumbClick}
          />
          {children}
          <footer className="footer">
            &copy; 2017 - Totem
          </footer>
        </div>
        <BackToTop
          minScrollY={40}
          scrollTo={'appContainer'}
        />
      </div>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    // something to do here?
    /* eslint-disable no-console */
    console.log('left nav click view: ', viewName);
    /* eslint-enable no-console */
  }

  handleRightNavItemClick = (event, viewName) => {
    // something to do here?
    /* eslint-disable no-console */
    console.log('right nav click view: ', viewName);
    /* eslint-enable no-console */
  }

  handleBreadcrumbClick = item => {
    const { router, currentView } = this.props;
    const { text: link } = item;

    switch (link) {
    case 'Recherche':
      if (currentView !== 'home') {
        return router.push('/');
      }
      return false;
    case 'Artist':
      const { artistId } = this.props;
      return router.push(`/artist/${artistId}`);
    case 'Album':
      const { albumId } = this.props;
      return router.push(`/artist/album${albumId}`);
      // return router.push(
      //   '/artist/album',
      //   { params: { id: albumId }}
      // );
    default:
      return false;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // views:
    currentView:  state.views.currentView,
    breadcrumb:   state.views.breadcrumb,
    // artist:
    artistId:     state.artist.artistId,
    // album:
    albumId:      state.album.albumId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        ...viewsActions
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
