import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createAppContainer } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen';
import ReloadScreen from '../screens/ReloadScreen';
import DonateScreen from '../screens/DonateScreen';
import SettingsScreen from '../screens/SettingsScreen';

////////////////////////

const LoginStack = createStackNavigator({
  Login : LoginScreen,
  //Home: LinksScreen
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      //name={Platform.OS === 'ios'? `ios-information-circle${focused ? '' : '-outline'}`: 'md-information-circle'}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
}; 


//////////////////////
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  //Home: LinksScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Main Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      //name={Platform.OS === 'ios'? `ios-information-circle${focused ? '' : '-outline'}`: 'md-information-circle'}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const ReloadStack = createStackNavigator({
  Reload: ReloadScreen,
});

ReloadStack.navigationOptions = {
  tabBarLabel: 'Reload',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};


const DonateStack = createStackNavigator({
  Donate: DonateScreen,
});

DonateStack.navigationOptions = {
  tabBarLabel: 'Donate',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      //name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

//export default createAppContainer({
export default createBottomTabNavigator({
  LoginStack,
  HomeStack,
  ReloadStack,
  DonateStack,
  SettingsStack,
});