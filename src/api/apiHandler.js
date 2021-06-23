const DEV_URL = 'http://localhost:3000';
const PROD_URL = 'https://trouvetatableapi.herokuapp.com';

//USERS
const DEV_SIGNUP = `${DEV_URL}/api/signup`;
const PROD_SIGNUP = `${PROD_URL}/api/signup`;
const DEV_SIGNIN = `${DEV_URL}/api/login`;
const PROD_SIGNIN = `${PROD_URL}/api/login`;
const DEV_PROFILE = `${DEV_URL}/api/users`;
const PROD_PROFILE = `${PROD_URL}/api/users`;

// VENUES
const DEV_CREATE_VENUE = `${DEV_URL}/api/venues`;
const PROD_CREATE_VENUE = `${PROD_URL}/api/venues`;
const DEV_EDIT_VENUE = `${DEV_URL}/api/venues`;
const PROD_EDIT_VENUE = `${PROD_URL}/api/venues`;

// BOOKINGS
const DEV_BOOKINGS = `${DEV_URL}/api/bookings`;
const PROD_BOOKINGS = `${PROD_URL}/api/bookings`;

export {
    DEV_SIGNUP,
    DEV_SIGNIN,
    DEV_PROFILE,
    DEV_CREATE_VENUE,
    DEV_EDIT_VENUE,
    PROD_SIGNUP,
    PROD_SIGNIN,
    PROD_PROFILE,
    PROD_CREATE_VENUE,
    PROD_EDIT_VENUE,
    DEV_BOOKINGS,
    PROD_BOOKINGS,
};