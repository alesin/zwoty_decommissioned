import React from 'react'
import {connect} from 'react-redux'
import {login} from '../redux/singleUser'
import LocalLoginForm from './LocalLoginForm'
import OAuthLoginForm from './OAuthLoginForm'

const Login = (props) => {
    const {handleSubmit} = props

    return (
        <div>
            <h1>Login</h1>
            <div>
                <LocalLoginForm handleSubmit={handleSubmit} />
                <OAuthLoginForm />
            </div>
        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        async handleSubmit (event) {
            event.preventDefault()
            const userCreds = {
                email: event.target.email.value,
                password: event.target.password.value
            }
            await dispatch(login(userCreds))
        }
    }
}

export default connect(null, mapDispatch)(Login)
