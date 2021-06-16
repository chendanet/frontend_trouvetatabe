import { AUTHENTICATE, LOGOUT } from 'store/types'
import Cookies from 'js-cookie'
import config from 'config'

const emptyState = {
    id: null,
    email: '',
    is_manager: false
}

const getUser = () => {
    if (Cookies.get(config.COOKIE_STORAGE_KEY) === undefined) return undefined;
    return JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_KEY));
};

const initialStateUser = getUser() || emptyState;

export const authReducer = (state = initialStateUser, action) => {
    const { type, payload, token } = action

    switch (type) {
        case AUTHENTICATE:
            localStorage.setItem(config.LOCAL_STORAGE_KEY, JSON.stringify(payload))
            Cookies.set(config.COOKIE_STORAGE_KEY, token)
            return {
                ...state,
                ...payload,
            }
        case LOGOUT:
            Cookies.remove(config.COOKIE_STORAGE_KEY)
            localStorage.removeItem(config.LOCAL_STORAGE_KEY)
            return {
                ...emptyState,
            }
        default:
            return state
    }
}


export default authReducer