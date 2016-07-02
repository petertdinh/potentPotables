import { CREATE_GAME} from '../actions/index';

export default function( state = {
  categories: null,
  clues: null,
}, action) {
  switch(action.type){
    case CREATE_GAME:
    	return {...state, clues: action.payload.clues, categories: action.payload.categories};
    default:
      return state;
  }
}