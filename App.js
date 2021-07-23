/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import React, { Component } from 'react'
 import AppNavigator from "./app/navigation/AppNavigator"

 export default class App extends Component {
 
     constructor(props){
         super(props);
     }
 
     render() {
         return (
            <AppNavigator/>
         ) 
     }
 }