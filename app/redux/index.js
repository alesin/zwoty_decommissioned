import { combineReducers } from 'redux'
import usersReducer from './users'

//! EXTRA REDUCERS (imports) GO HERE !
import singleUserReducer from './singleUser'

const appReducer = combineReducers({
    users: usersReducer,
    //! EXTRA REDUCERS GO HERE !
    selectedUser: singleUserReducer
})

export default appReducer
