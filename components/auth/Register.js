import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: ''
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    const { email, password, name } = this.state
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <View>
        <TextInput style={styles.input}
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput style={styles.input}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => this.onSignUp()}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});