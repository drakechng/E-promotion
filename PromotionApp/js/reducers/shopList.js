import type {Action} from "../actions/types";
import {SET_TAP, SET_SHOP} from "../actions/shopList";

export type State = {
    activeShopId: string
}

const initialState = {
    activeShopId: "",
    activeTap:"vouchers"
};

export default function (state: State = initialState, action: Action): State {

    if (action.type === SET_SHOP) {
        return {
            ...state,
            activeShopId: action.payload,
        };
    }
    if (action.type === SET_TAP) {
        return {
            ...state,
            activeTap: action.payload,
        };
    }
    return state;
}
