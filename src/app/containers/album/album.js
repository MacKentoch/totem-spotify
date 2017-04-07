import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewsActions      from '../../redux/modules/views';
import * as albumActions      from '../../redux/modules/album';
import { Album }              from '../../views';


const mapStateToProps = (state) => {
  return {
    // -- views: -- //
    currentView:  state.views.currentView,

    // -- artist: -- //
    // selected artist:
    artistId:       state.artist.artistId,
    artistName:     state.artist.artistName,

    // -- album: -- //
    // selected album:
    albumId:        state.album.artistId,
    albumName:      state.album.albumName,
    albumImgSrc:    state.album.albumImgSrc,
    // album tracks:
    isFetching:     state.album.isFetching,
    lastFetchTime:  state.album.lastFetchTime,
    tracks:         state.album.tracks
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // views:
      enterAlbum: viewsActions.enterAlbum,
      leaveAlbum: viewsActions.leaveAlbum,
      // album:
      getAlbumTracks: albumActions.getAlbumTracksIfNeeded
    },
    dispatch
  );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Album);
