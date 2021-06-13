import { enableES5 } from 'immer'
import { types } from '@types/types'

enableES5();

const initialState = () => ({
    messages: []
})

export const chatReducer = (state = initialState(), action) => {
    switch (action.type) {
        case types.setMessages:
            return {
                ...state,
                messages: [...state.messages, action.payload],
            }

        case types.removeMessages: 
            return {
                messages: []
            }    
        default:
            return state
    }
}
