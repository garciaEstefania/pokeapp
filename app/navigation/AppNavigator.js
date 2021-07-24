import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home';
import TeamScreen from '../screens/Teams';
import AddTeam from '../screens/AddTeam';
import ViewTeam from '../screens/ViewTeam';

const HomeStack = createStackNavigator();
const MyTeamStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="AddNewTeam" component={AddTeam} options={{title: "Add New Team"}}/>
    </HomeStack.Navigator>
  );
}

function TeamStackScreen() {
  return (
    <MyTeamStack.Navigator backBehavior="initialRoute">
      <MyTeamStack.Screen name="MyTeams" component={TeamScreen} options={{title: "My Teams"}}/>
      <MyTeamStack.Screen name="ViewTeam" component={ViewTeam} />
    </MyTeamStack.Navigator>
  );
}

export default class AppNavigator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          backBehavior="initialRoute"
          tabBarOptions={{
            activeTintColor: '#8B0000',
            inactiveTintColor: '#808080',
            labelStyle: {fontSize: 16},
            keyboardHidesTabBar: true,
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Icon name="home" size={25} color="#8B0000" />
                ) : (
                  <Icon name="home-outline" size={25} color="#808080" />
                ),
            }}
          />
          <Tab.Screen
            name="My Teams"
            component={TeamStackScreen}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Icon name="shapes-sharp" size={25} color="#8B0000" />
                ) : (
                  <Icon name="shapes-outline" size={25} color="#808080" />
                ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
