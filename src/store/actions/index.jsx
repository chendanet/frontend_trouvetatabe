import {
    AUTHENTICATE,
    LOGOUT
} from 'store/types'


const authenticate = (user, token) => {
    const {
        id,
        email,
    } = user;
    return {
        type: AUTHENTICATE,
        payload: {
            id: id,
            email: email
        },
        token: token
    }
}


const logout = () => ({
    type: LOGOUT
})


export { authenticate, logout }