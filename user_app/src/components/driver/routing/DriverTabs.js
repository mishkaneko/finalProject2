/* eslint-disable react/no-unstable-nested-components */
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import Home from '../../../screens/driver/Home'
import Job from '../../../screens/driver/Job'
import History from '../../../screens/driver/History'
import MorePage from '../../../screens/shared/MorePage'
import DriverMyRide from '../../../screens/shared/DriverMyRide'

const Tab = createBottomTabNavigator()

const dark = '#163242'
const mid = '#34728d'
const light = '#d8f9fd'

const DriverTabs = () => {
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
        name={'Job'}
        component={Job}
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
        component={DriverMyRide}
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
        // component={MorePage}
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
      >
        {() => <MorePage time={Date.now()} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

export default DriverTabs
