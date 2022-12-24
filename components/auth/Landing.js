import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Landing({ navigation }) {
    return (
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>
            INSTAGRAM CLONE APP
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
    );
}

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
      marginTop: 10,
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
      flex: 1,
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
    title: {
      fontSize: 20,
      marginBottom: 20,
      textAlign: 'center',  
    },
  });