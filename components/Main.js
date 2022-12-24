import { Button, Text, View } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect, Connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser()
    }
    render() {
        // const { currentUser } = this.props
        // console.log(currentUser)
        // if (currentUser == undefined) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center' }}>
        //             <Text>Loading</Text>
        //             <Button
        //                 title="Sign Out"
        //                 onPress={() => firebase.auth().signOut()}
        //             />
        //         </View> 
        //     )
        // }
        return (
            <Tab.Navigator initialRouteName='Feed' labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}/>
                <Tab.Screen name="AddContainer" component={EmptyScreen} 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),
                    }}/>
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }}/>
            </Tab.Navigator>
            // <View style={{ flex: 1, justifyContent: 'center' }}>
            //     <Text>{currentUser.name} is logged in</Text>
            //     <Button
            //         title="Sign Out"
            //         onPress={() => firebase.auth().signOut()}
            //     />
            // </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)