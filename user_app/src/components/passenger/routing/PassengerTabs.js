/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import Home from '../../../screens/passenger/Home'
import Services from '../../../screens/passenger/Services'
import MorePage from '../../../screens/shared/MorePage'
import MyRide from '../../../screens/shared/MyRide'

const Tab = createBottomTabNavigator()

const dark = '#1e1b48'
const mid = '#36309d'
const light = '#e1e7fd'

const PassengerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: mid,
        tabBarInactiveTintColor: light,
        tabBarStyle: {
          backgroundColor: dark,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name={'home'} size={25} color={focused ? mid : light} />
          ),
        }}
      />
      <Tab.Screen
        name={'Services'}
        component={Services}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name={'car-alt'}
              size={26}
              color={focused ? mid : light}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'History'}
        component={MyRide}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={'history-edu'}
              size={32}
              color={focused ? mid : light}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'More'}
        component={MorePage}
        options={{
          tabBarIcon: ({ focused }) => (
            // <FontAwesome5
            //   name={'user-alt'}
            //   size={23}
            //   color={focused ? mid : light}
            // />
            <Feather
              name="more-horizontal"
              size={24}
              color={focused ? mid : light}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default PassengerTabs
