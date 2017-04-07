import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';

// /////////////////////
// constants
// /////////////////////
const ENTER_HOME_VIEW   = 'ENTER_HOME_VIEW';
const LEAVE_HOME_VIEW   = 'LEAVE_HOME_VIEW';
const ENTER_ARTIST_VIEW = 'ENTER_ARTIST_VIEW';
const LEAVE_ARTIST_VIEW = 'LEAVE_ARTIST_VIEW';
const ENTER_ALBUM_VIEW  = 'ENTER_ALBUM_VIEW';
const LEAVE_ALBUM_VIEW  = 'LEAVE_ALBUM_VIEW';


// /////////////////////
// reducer
// /////////////////////
const initialState = {
  currentView:  'not set',
  enterTime:    null,
  leaveTime:    null,
  breadcrumb:   []
};

export default function (state = initialState, action) {
  switch (action.type) {

  case ENTER_HOME_VIEW:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime,
        breadcrumb:   ['Recherche']
      };
    }
    return state;

  case ENTER_ARTIST_VIEW:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime,
        breadcrumb:   ['Recherche', 'Artist']
      };
    }
    return state;

  case ENTER_ALBUM_VIEW:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime,
        breadcrumb:   ['Recherche', 'Artist', 'Album']
      };
    }
    return state;

  case LEAVE_HOME_VIEW:
  case LEAVE_ARTIST_VIEW:
  case LEAVE_ALBUM_VIEW:
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;

  default:
    return state;
  }
}


// /////////////////////
// action creators
// /////////////////////
export function enterHome(time = moment().format(dateFormat)) {
  return {
    type:         ENTER_HOME_VIEW,
    currentView:  'home',
    enterTime:    time,
    leaveTime:    null
  };
}
export function leaveHome(time = moment().format(dateFormat)) {
  return {
    type:         LEAVE_HOME_VIEW,
    currentView:  'home',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterArtist(time = moment().format(dateFormat)) {
  return {
    type:         ENTER_ARTIST_VIEW,
    currentView:  'artist',
    enterTime:    time,
    leaveTime:    null
  };
}
export function leaveArtist(time = moment().format(dateFormat)) {
  return {
    type:         LEAVE_ARTIST_VIEW,
    currentView:  'artist',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterAlbum(time = moment().format(dateFormat)) {
  return {
    type:         ENTER_ALBUM_VIEW,
    currentView:  'album',
    enterTime:    time,
    leaveTime:    null
  };
}
export function leaveAlbum(time = moment().format(dateFormat)) {
  return {
    type:         LEAVE_ALBUM_VIEW,
    currentView:  'album',
    enterTime:    null,
    leaveTime:    time
  };
}
