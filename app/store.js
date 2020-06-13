import { createStore, applyMiddleware } from 'redux'

import appReducer from './redux'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'  //^ <== must be last middleware

// *** Additional dev libraries to consider
// import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    appReducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger({ collapsed: true })
    )
)

export default store
