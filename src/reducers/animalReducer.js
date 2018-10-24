import { GET_ANIMALS } from '../actions/types'

const initialState = {
    animals: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ANIMALS:
        return {
            ...state,
            animals: action.payload
        };
        default:
        return state;
    }
}