import { enableES5 } from 'immer'
import { types } from '@types/types'

enableES5()

const initialState = () => ({
    authenticate: false,
    user: null
});

export const authReducer = (state = initialState(), action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                authenticate: true,
                user: {
                    ...action.payload,
                },
            }
        case types.logout:
            return initialState

        default:
            return state
    }
}
