import type {Action} from "../actions/types";
import {SET_INDEX, SET_SHOP} from "../actions/shopList";

export type State = {
    list: string
}

const initialState = {
    list: [
        {id: null, company_name: "default"}
    ],
    selectedIndex: undefined,
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === SET_INDEX) {
        return {
            ...state,
            selectedIndex: action.payload,
        };
    }
    if (action.type === SET_SHOP) {
        return {
            ...state,
            list: action.payload,
        };
    }
    return state;
}
