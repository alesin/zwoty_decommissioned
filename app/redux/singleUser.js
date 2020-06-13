import axios from 'axios'

// *** ACTION TYPES
const GOT_USER = 'GOT_USER'
const SET_LOADING_STATUS = 'SET_LOADING_STATUS'

// *** ACTION CREATORS
export const gotUser = (selectedUser) => ({
    type: GOT_USER,
    selectedUser
})
export const setLoadingStatus = (loading)  => ({
    type: SET_LOADING_STATUS,
    loading
})

// *** THUNK CREATORS
export const getUser = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/api/auth/me')
            if (data) {
                dispatch(gotUser(data))
            }
            console.log("The TRY bit of data: ", data)
        } catch (error) {
            // dispatch(gotUser({}))
            console.error('Whoops, trouble getting user!', error)
        } finally {
            dispatch(setLoadingStatus(false))
          }
    }
}
export const login = (userCreds) => {
    return async dispatch => {
        try {
            const {data} = await axios.put('/api/auth/login', userCreds)
            dispatch(gotUser(data))
        } catch (error) {
            console.error(error)
        }
    }
}
export const logout = () => {
    return async dispatch => {
        try {
            await axios.delete('/api/auth/logout')
            dispatch(gotUser({id: null}))
        } catch (error) {
            console.error(error)
        }
    }
}

// *** INITIAL STATE
const initialState = {
    loading: true
}

// *** REDUCER
const singleUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_USER:
            return {...state, ...action.selectedUser, loading: false}
        case SET_LOADING_STATUS:
            return {...state, loading: action.loading}
        default:
            return state
    }
}

export default singleUserReducer
