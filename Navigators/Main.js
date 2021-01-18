import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

import HomeNavigator from './HomeNavigators';
import CartNavigator from "./CartNavigator";
import UserNavigator from './UserNavigator';
import CartIcon from './../Shared/CartIcon';

const Tab = createBottomTabNavigator();

export const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        keyBoardHidesTabBar: true,
        // showLabel: false,
        activeTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name={'home'}
              style={{ position: 'relative' }}
              color={color}
              size={30}
            />
          )
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon
                name={'shopping-cart'}
                color={color}
                size={30}
              />
              <CartIcon />
            </View>
          )
        }}
      />

      <Tab.Screen
        name='Admin'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name={'cog'}
              color={color}
              size={30}
            />
          )
        }}
      />

      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name={'user'}
              style={{ position: 'relative' }}
              color={color}
              size={30}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}