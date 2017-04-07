import moment from 'moment';
import { getLocationOrigin } from '../../services/fetchTools';
import appConfig from '../../config';
const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////

const SET_NEW_SELECTED_ALBUM = 'SET_NEW_SELECTED_ALBUM';

const REQUEST_ALBUM_TRACK  = 'REQUEST_ALBUM_TRACK';
const RECEIVED_ALBUM_TRACK = 'RECEIVED_ALBUM_TRACK';
const ERROR_ALBUM_TRACK    = 'ERROR_ALBUM_TRACK';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  // selected album:
  albumId:      '',
  albumName:    '',
  albumImgSrc:  'http://placehold.it/640x640',
  // album tracks:
  isFetching:     false,
  lastFetchTime:  null,
  tracks:        []
};

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);

  switch (action.type) {

  case SET_NEW_SELECTED_ALBUM:
    return {
      ...state,
      albumId:      action.albumId,
      albumName:    action.albumName,
      albumImgSrc:  action.albumImgSrc
    };

  case REQUEST_ALBUM_TRACK:
    return {
      ...state,
      isFetching:      true
    };

  case RECEIVED_ALBUM_TRACK:
    return {
      ...state,
      lastFetchTime:   currentTime,
      isFetching:      false,
      tracks:         [...action.payload.items]
    };

  case ERROR_ALBUM_TRACK:
    return {
      ...state,
      lastFetchTime:   currentTime,
      isFetching:      false,
      tracks:         [...initialState.tracks]
    };

  default:
    return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
function getAlbumTracks(albumId = '') {
  return dispatch => {
    const url = `${getLocationOrigin()}/${appConfig.api.album}/${albumId}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_ALBUM_TRACK,
          success:  RECEIVED_ALBUM_TRACK,
          fail:     ERROR_ALBUM_TRACK
        },
        url,
        method,
        options
      }
    });
  };
}

export function getAlbumTracksIfNeeded(albumId = '') {
  return (dispatch, getState) => {
    if (shouldGetAlbumTracks(getState())) {
      const selectedAlbum = getState().artist.albums.find(album => album.id === albumId);
      const albumName = selectedAlbum.name;
      const albumImgSrc = selectedAlbum.images.length > 0
        ? selectedAlbum.images[0].url
        : initialState.albumImgSrc;

      dispatch({ type: SET_NEW_SELECTED_ALBUM, albumId, albumName, albumImgSrc });
      return dispatch(getAlbumTracks(albumId));
    }
    return Promise.resolve();
  };
}

function shouldGetAlbumTracks(state) {
  const albumState = state.album;
  if (albumState.isFetching) {
    return false;
  } else {
    return true;
  }
}
