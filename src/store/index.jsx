import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import authReducer from 'store/reducers'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    authReducer
})


const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware))
)



export default store