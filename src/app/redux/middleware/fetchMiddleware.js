import axios from 'axios';

export const FETCH_MOCK = 'FETCH_MOCK';
export const FETCH      = 'FETCH';
// //////////////////////////////////////////////////////////////
//          fetch middleware:
// //////////////////////////////////////////////////////////////
// - no more use redux thunk in your actions creators = less code
// - returns promises
// //////////////////////////////////////////////////////////////

// Usage: FETCH mode
// in any action just add fetch object like:
// {
//  fetch: {
//    type: 'FETCH',
//    actionTypes: {
//      request: 'TYPE_FOR_REQUEST',
//      success: 'TYPE_FOR_RECEIVED',
//      fail: 'TYPE_FOR_ERROR',
//    },
//    url: 'an url',
//    method: 'get', // lower case, one of 'get', 'post'...
//    options: {} // OPTIONAL
//  }
// }
//

const fetchMiddleware = store => next => action => {
  if (!action.fetch) {
    return next(action);
  }

  if (!action.fetch.type ||
      !action.fetch.type === FETCH) {
    return next(action);
  }

  if (!action.fetch.actionTypes) {
    return next(action);
  }

  if (action.fetch.type === FETCH) {
    const {
      actionTypes: {request, success, fail},
      url,
      method,
      options
    } = action.fetch;

    // request
    store.dispatch({ type: request });

    // fetch server (success or fail)
    // returns a Promise
    return axios.request({
      method,
      url,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Acces-Control-Allow-Origin': '*'
      },
      ...options
    })
      .then(data => store.dispatch({type: success, payload: data.data}))
      .catch(
        err => {
          store.dispatch({type: fail, error: err});
          return Promise.reject(err);
        }
      );
  }
  return next(action);
};

export default fetchMiddleware;
