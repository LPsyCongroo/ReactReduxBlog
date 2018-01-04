import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state ={}, action) {
  switch(action.type) {

    case FETCH_POST:
      // Add a new key-value pair to the state for the individual post
      return { ...state, [action.payload.data.id]: action.payload.data};

    case FETCH_POSTS:
      // _.mapKeys takes an array of objects and, using a key from each, maps it to a new object
      return _.mapKeys(action.payload.data, 'id');
    
    case DELETE_POST:
      // While the list of posts is refreshed after FETCH_POSTS,    
      // If there is any single posts in the state from FETCH_POST
      // it's good practice to update state to make UI more snappy.      
      // _.omit looks for the key and returns an object without it.
      return _.omit(state, action.payload);

    default:
      return state;
  }
}