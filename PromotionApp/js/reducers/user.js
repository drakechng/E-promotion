import type {Action} from "../actions/types";
import {SET_USER} from "../actions/user";

export type State = {
    name: string,
    password: string
}

const initialState = {
    name: 'zzz',
    password: '11111111'
};

export default function (state: State = initialState, action: Action): State {
    if (action.type === SET_USER) {
        console.log(action.payload)
        return {
            ...state,
            name: action.payload.user,
            password: action.payload.password,
        };
    }
    return state;
}
