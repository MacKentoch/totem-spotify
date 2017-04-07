import moment from 'moment';
import { getLocationOrigin } from '../../services/fetchTools';
import appConfig from '../../config';
const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////

const SET_NEW_SELECTED_ARTIST = 'SET_NEW_SELECTED_ARTIST';

const REQUEST_ARTIST_ALBUM  = 'REQUEST_ARTIST_ALBUM';
const RECEIVED_ARTIST_ALBUM = 'RECEIVED_ARTIST_ALBUM';
const ERROR_ARTIST_ALBUM    = 'ERROR_ARTIST_ALBUM';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  // selected artist:
  artistId: '',
  artistName: '',
  // artist albums:
  isFetching:     false,
  lastFetchTime:  null,
  albums:        []
};

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);

  switch (action.type) {

  case SET_NEW_SELECTED_ARTIST:
    return {
      ...state,
      artistId:   action.artistId,
      artistName: action.artistName
    };

  case REQUEST_ARTIST_ALBUM:
    return {
      ...state,
      isFetching:      true
    };

  case RECEIVED_ARTIST_ALBUM:
    return {
      ...state,
      lastFetchTime:   currentTime,
      isFetching:      false,
      albums:         [...action.payload.items]
    };

  case ERROR_ARTIST_ALBUM:
    return {
      ...state,
      lastFetchTime:   currentTime,
      isFetching:      false,
      albums:         [...initialState.albums]
    };

  default:
    return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
function getArtistAlbum(artistId = '') {
  return dispatch => {
    const url = `${getLocationOrigin()}/${appConfig.api.artist}/${artistId}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_ARTIST_ALBUM,
          success:  RECEIVED_ARTIST_ALBUM,
          fail:     ERROR_ARTIST_ALBUM
        },
        url,
        method,
        options
      }
    });
  };
}

export function getArtistAlbumIfNeeded(artistId = '') {
  return (dispatch, getState) => {
    if (shouldGetArtistAlbum(getState())) {
      const artistName = getState().search.artists.find(artist => artist.id === artistId).name;
      dispatch({ type: SET_NEW_SELECTED_ARTIST, artistId, artistName });
      return dispatch(getArtistAlbum(artistId));
    }
    return Promise.resolve();
  };
}

function shouldGetArtistAlbum(state) {
  const artistState = state.artist;
  if (artistState.isFetching) {
    return false;
  } else {
    return true;
  }
}
