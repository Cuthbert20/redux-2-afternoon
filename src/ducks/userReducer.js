import axios from 'axios'

//set up initialstate
const initialState = {
    email: null, 
    firstName: null, 
    lastName: null
}

//action types
const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

//action builder or creator
export const requestUserData = () => {
    let data = axios.get('/auth/user-data')
    .then(res => res.data)
        return {
            type: REQUEST_USER_DATA,
            payload: data
        }
}

export default function userReducer(state = initialState, action){
    switch(action.type){
        //when using middleware we are adding either _PENDING, _FULFILLED, _REJECTED to our action type.
        case REQUEST_USER_DATA +'_FULFILLED':
            const { email, firstName, lastName } = action.payload.user
            return {...state, email, firstName, lastName}
        default:
            return state
}
}