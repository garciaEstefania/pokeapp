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
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import TeamScreen from "./app/teams"
 import HomeScreen from "./app/home"
 
 const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();
 export default class App extends Component {
 
     constructor(props){
         super(props);
     }
 
     render() {
         return (
            <NavigationContainer>
              <Tab.Navigator
              /*screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
                } else if (route.name === 'Settings') {
                  iconName = focused
                  ? 'ios-list-box'
                  : 'ios-list';
                }
          
          return <Ionicons name={iconName} size={size} color={color}     />;
             },
          })}*/
          tabBarOptions={{
          activeTintColor: '#8B0000',
          inactiveTintColor: '#808080',
          labelStyle:{fontSize: 16},
          }}
          >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="My Teams" component={TeamScreen} />
              </Tab.Navigator>
            </NavigationContainer>            
            
         )
     }
 }