import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import budgetReducer from './ducks/budgetReducer'
import userReducer from './ducks/userReducer'

const rootReducer = combineReducers({
    //renaming and combining our reducers to export
    budget: budgetReducer,
    user: userReducer
})
const enhancers = compose(applyMiddleware(promiseMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

//export the created store using createStore. This first arg to createStore should be rootReducer. The second arg is applyMiddleware(promiseMiddlware)
export default createStore(rootReducer, enhancers)