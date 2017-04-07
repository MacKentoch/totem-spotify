import moment from 'moment';
import { getLocationOrigin } from '../../services/fetchTools';
import appConfig from '../../config';
const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////

const SET_NEW_SEARCH_ARTIST = 'SET_NEW_SEARCH_ARTIST';

const REQUEST_SEARCH_ARTISTS  = 'REQUEST_SEARCH_ARTISTS';
const RECEIVED_SEARCH_ARTISTS = 'RECEIVED_SEARCH_ARTISTS';
const ERROR_SEARCH_ARTISTS    = 'ERROR_SEARCH_ARTISTS';

const MOVE_TO_ARTIST_PAGE  = 'MOVE_TO_ARTIST_PAGE';

// /////////////////////
// reducer
// /////////////////////
const initialState = {
  // search input info:
  lastSearchText: '',
  lastSearchTime: null,
  // search result:
  isFetching:     false,
  lastFetchTime:  null,
  artists:        [],
  // search result pagination:
  limit:  20,
  total:  0,
  offset: 0
};

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);

  switch (action.type) {

  case SET_NEW_SEARCH_ARTIST:
    return {
      ...state,
      lastSearchText:  action.searchText,
      lastSearchTime:  currentTime
    };

  case REQUEST_SEARCH_ARTISTS:
    return {
      ...state,
      isFetching:      true
    };

  case RECEIVED_SEARCH_ARTISTS:
    return {
      ...state,
      lastFetchTime:   currentTime,
      isFetching:      false,
      artists:         [...action.payload.artists.items],
      limit:           action.payload.artists.limit,
      total:           action.payload.artists.total,
      offset:          action.payload.artists.offset
    };

  case ERROR_SEARCH_ARTISTS:
    return {
      ...state,
      lastFetchTime:   currentTime,
      isFetching:      false,
      artists:         [...initialState.artists],
      limit:           initialState.limit,
      total:           initialState.total,
      offset:          initialState.offset
    };

  case MOVE_TO_ARTIST_PAGE:
    return {
      ...state,
      offset: action.offset
    };

  default:
    return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
function search(searchText = '', offset = 0) {
  return dispatch => {
    const url = `${getLocationOrigin()}/${appConfig.api.search}?q=${encodeURIComponent(searchText)}&offset=${offset}`;
    const method  ='get';
    const options = {};

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        type: 'FETCH',
        actionTypes: {
          request:  REQUEST_SEARCH_ARTISTS,
          success:  RECEIVED_SEARCH_ARTISTS,
          fail:     ERROR_SEARCH_ARTISTS
        },
        url,
        method,
        options
      }
    });
  };
}

export function searchIfNeeded(searchText = '', offset = 0) {
  return (dispatch, getState) => {
    if (shouldSearch(getState())) {
      dispatch({ type: SET_NEW_SEARCH_ARTIST, searchText });
      return dispatch(search(searchText, offset));
    }
    return Promise.resolve();
  };
}

function shouldSearch(state) {
  const searchState = state.search;
  if (searchState.isFetching) {
    return false;
  } else {
    return true;
  }
}

export function moveToPage(offset = 0) {
  return (dispatch, getState) => {
    const currentOffset = getState().search.offset;
    const currentSearch = getState().search.lastSearchText;
    if (currentOffset !== offset) {
      dispatch({
        type: MOVE_TO_ARTIST_PAGE,
        offset
      });

      return dispatch(searchIfNeeded(currentSearch, offset));
    }
    return false;
  };
}
