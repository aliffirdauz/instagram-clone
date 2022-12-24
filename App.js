import { Text, View, Button } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDf1R2wlWXk98dWGLm9_Bvz3V3MTjzeNjk",
  authDomain: "instagram-clone-2c29e.firebaseapp.com",
  projectId: "instagram-clone-2c29e",
  storageBucket: "instagram-clone-2c29e.appspot.com",
  messagingSenderId: "926369863213",
  appId: "1:926369863213:web:ec98adb43821b26815caa4",
  measurementId: "G-HLQ8E45BK2"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from './components/auth/Landing';
import LoginScreen from './components/auth/Login';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';

const Stack = createNativeStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Add' component={AddScreen} navigation={this.props.navigation} />
            <Stack.Screen name='Save' component={SaveScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App