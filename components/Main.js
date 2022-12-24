import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { connect, Connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }
    render() {
        const { currentUser } = this.props
        console.log(currentUser)
        if (currentUser == undefined) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>{currentUser.name} is logged in</Text>
                <Button
                    title="Sign Out"
                    onPress={() => firebase.auth().signOut()}
                />
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)