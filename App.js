/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, { Component } from 'react'
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import TeamScreen from "./app/teams"
 import HomeScreen from "./app/home"
 
 const Stack = createStackNavigator();

 export default class App extends Component {
 
     constructor(props){
         super(props);
     }
 
     render() {
         return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Team" component={TeamScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            
         )
     }
 }