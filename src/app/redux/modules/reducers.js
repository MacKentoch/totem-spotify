import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';
import views  from './views';
import search from './search';
import artist from './artist';
import album  from './album';

export const reducers = {
  views,
  search,
  artist,
  album
};


export default combineReducers({
  ...reducers,
  routing: routerReducer
});
