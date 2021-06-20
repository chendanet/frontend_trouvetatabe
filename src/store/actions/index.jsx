import {
    AUTHENTICATE,
    LOGOUT
} from 'store/types'


const authenticate = (user, token) => {
    const {
        id,
        email,
        is_manager
    } = user;
    return {
        type: AUTHENTICATE,
        payload: {
            id: id,
            email: email,
            is_manager: is_manager
        },
        token: token
    }
}


const logout = () => ({
    type: LOGOUT
})


export { authenticate, logout }