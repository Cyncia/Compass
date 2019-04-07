import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/SearchScreen';

const fade = (props) => {
    const {position, scene} = props
    const index = scene.index
    const translateX = 0
    const translateY = 0
    const opacity = position.interpolate({
        inputRange: [index - 0.7, index, index + 0.7],
        outputRange: [0.3, 1, 0.3]
    })

    return {
        opacity,
        transform: [{translateX}, {translateY}]
    }
}

const HomeStack = createStackNavigator(
  {
    Search: { screen: SearchScreen },
    Home: { screen: HomeScreen },
    Links: { screen: SettingsScreen },
  },
  {
    transitionConfig: () => ({
        screenInterpolator: (props) => {
            return fade(props)
        }
    })
  },
);

{/*
const HomeStack = FluidNavigator({
  Search: { screen: SearchScreen },
  Home: { screen: HomeScreen }
});*/}

HomeStack.navigationOptions = {
  tabBarLabel: 'Search',
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen
});

LinksStack.navigationOptions = {
  tabBarLabel: 'User',
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
  tabBarLabel: 'My Itineraries',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack

  /*
  {
  tabBarOptions: {
  showIcon: true,
  showLabel: true,
  lazyLoad: true,
  style: {
    backgroundColor: 'rgba(0,0,0,.2)',
    marginTop: 20,
    borderTopWidth: 0,
    position: 'absolute',
    left: 50,
    right: 50,
    bottom: 20,
    height: 100
  }}*/
});
