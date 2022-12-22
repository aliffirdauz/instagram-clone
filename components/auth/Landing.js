import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}