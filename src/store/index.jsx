import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import authReducer from 'store/reducers'
import thunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    authReducer
})


const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)



export default store