
import type { Action } from '../actions/types';
import { SET_INDEX } from '../actions/shopList';

export type State = {
    list: string
}

const initialState = {
  list: [
    'Default Shop',
  ],
  selectedIndex: undefined,
};

export default function (state:State = initialState, action:Action): State {
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload,
    };
  }
  if(action.type === SET_SHOP){
    return{
        ...state,
        list: action.payload,
    };
  }
  return state;
}
