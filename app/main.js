import '../public/style.css'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
//! ROUTES to React components GO HERE!
import Routes from './components/Routes'

render(
    <Provider store={store}>
        {/* Rest of the app (or routes for components) goes here! */}
        <Routes />
    </Provider>,
    document.getElementById('app')
)
