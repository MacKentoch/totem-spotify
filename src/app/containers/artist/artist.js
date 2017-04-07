import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as artistActions     from '../../redux/modules/artist';
import { Artist }             from '../../views';


const mapStateToProps = (state) => {
  return {
    // -- views: -- //
    currentView:  state.views.currentView,

    // -- artist: -- //
    // selected artist:
    artistId:       state.artist.artistId,
    artistName:     state.artist.artistName,
    // artist albums:
    isFetching:     state.artist.isFetching,
    lastFetchTime:  state.artist.lastFetchTime,
    albums:         state.artist.albums
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views:
      enterArtist: viewsActions.enterArtist,
      leaveArtist: viewsActions.leaveArtist,
      // artist:
      getArtistAlbum: artistActions.getArtistAlbumIfNeeded
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Artist);
