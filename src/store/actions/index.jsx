import {
    AUTHENTICATE,
    LOGOUT
} from 'store/types'


const authenticate = (user, token) => {
    const {
        id,
        email,
        is_manager,
        first_name,
        last_name,
        password,
    } = user;
    return {
        type: AUTHENTICATE,
        payload: {
            id: id,
            email: email,
            is_manager: is_manager,
            first_name: first_name,
            last_name: last_name,
            password: password,
        },
        token: token
    }
}


const logout = () => ({
    type: LOGOUT
})


export { authenticate, logout }