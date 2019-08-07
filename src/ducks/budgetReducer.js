import axios from 'axios'

//initialstate
const initialstate = {
    purchase: [],
    budgetLimit: null,
    loading: false
}

//action types
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
const ADD_PURCHASE = 'ADD_PURCHASE'
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

//action builder or creator
export const requestBudgetData = () => {
    let data = axios.get('api/budget-data')
    .then(res => res.data)
        return {
            type: REQUEST_BUDGET_DATA,
            payload: data
        }
}
export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', { description, price, category })
    .then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}
export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`)
    .then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}
export default function budgetReducer(state = initialstate, action){
    switch(action.type){
        //when using middleware we are adding either _PENDING, _FULFILLED, _REJECTED to our action type.
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, ...action.payload, loading: false}
        case ADD_PURCHASE + '_PENDING':
            return{...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return{...state, purchases: action.payload, loading: false}
        case REMOVE_PURCHASE + '_PENDING':
            return{...state, loading: true}
        case REMOVE_PURCHASE + '_FULFILLED':
            return{...state, purchases: action.payload, loading: false}
        default:
            return state;
    }
    
}

