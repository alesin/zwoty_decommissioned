import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser, logout} from '../redux/singleUser'
import Login from './Login'
import UserPage from './UserPage'

class unconnectedHome extends Component {
    componentDidMount() {
        console.log(this.props)
        this.props.getUser()
    }

    render() {
        let theUser = this.props.selectedUser
        if (theUser.loading) return <div>loading...</div>
        if (theUser.id) return <UserPage user={theUser} onClick={() => this.props.logout()} />

        return <Login />
    }
}

const mapState = (state) => {
    console.log(state)
    return {
        selectedUser: state.selectedUser
    };
  };

const mapDispatch = (dispatch) => {
    console.log('Mapping dispatch to props')
    return {
        getUser: () => dispatch(getUser()),
        logout: () => dispatch(logout())
    }
}

const Home =  connect(mapState, mapDispatch)(unconnectedHome)

export default Home
