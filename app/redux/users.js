import axios from 'axios'

// *** ACTION TYPES
const GOT_USERS = 'GOT_USERS'

// *** ACTION CREATORS
export const gotUsers = (users) => ({
    type: GOT_USERS,
    users
})

// *** THUNK CREATORS
export const getUsers = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/api/users')
            dispatch(gotUsers(data))
        } catch (error) {
            console.error('Whoops, trouble getting users!')
        }
    }
}

// *** INITIAL STATE
const initialState = {
    all: [],
    loading: true
}

// *** REDUCER
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_USERS:
            return {...state, all: action.users, loading: false}
        default:
            return state
    }
}

export default usersReducer
