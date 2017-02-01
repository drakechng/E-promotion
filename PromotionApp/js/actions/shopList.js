
import type { Action } from './types';

export const SET_INDEX = 'SET_INDEX';

export function setIndex(index:number):Action {
  return {
    type: SET_INDEX,
    payload: index,
  };
}

export function setShop(shop:Array) {
   return{
     type: SET_SHOP,
       payload: shop,
   }

}