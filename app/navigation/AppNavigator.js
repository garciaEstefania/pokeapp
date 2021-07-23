import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screens/Home"
import TeamScreen from "../screens/Teams"
import AddTeam from "../screens/AddTeam"

const HomeStack = createStackNavigator();
const MyTeamStack = createStackNavigator();
const Tab = createBottomTabNavigator();

 function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
     <HomeStack.Screen name="Home" component={HomeScreen} />
     <HomeStack.Screen name="Add New Team" component={AddTeam} />
    </HomeStack.Navigator>
   );
 }

 function TeamStackScreen() {
   return (
     <MyTeamStack.Navigator>
       <MyTeamStack.Screen name="My Teams" component={TeamScreen} />
     </MyTeamStack.Navigator>
   );
 }

 export default class AppNavigator extends Component {
 
    constructor(props){
        super(props);
    }

    render() {
        return (
           <NavigationContainer>
             <Tab.Navigator
               tabBarOptions={{
               activeTintColor: '#8B0000',
               inactiveTintColor: '#808080',
               labelStyle:{fontSize: 16},
               }}
             >
               <Tab.Screen name="Home" component={HomeStackScreen} 
               options={{
                 tabBarIcon: ({focused}) =>
                   focused ? (
                     <Icon name='home' size={25} color="#8B0000"/>
                   ) : (
                     <Icon  name='home-outline' size={25} color="#808080"/>
                   ),
               }}/>
               <Tab.Screen name="My Teams" component={TeamStackScreen} 
               options={{
                 tabBarIcon: ({focused}) =>
                   focused ? (
                     <Icon name='shapes-sharp' size={25} color="#8B0000"/>
                   ) : (
                     <Icon  name='shapes-outline' size={25} color="#808080"/>
                   ),
               }}
               />
             </Tab.Navigator>
           </NavigationContainer>            
           
        )
    }
}