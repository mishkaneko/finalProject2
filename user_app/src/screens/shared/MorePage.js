import React, { useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native'
import Animated, { FadeInRight } from 'react-native-reanimated'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../utils/guard/authSlice'
import { FontAwesome5 } from '@expo/vector-icons'

const MorePage = ({ time }) => {
  const [key, setKey] = useState(0)
  const role = useSelector((state) => state.auth.role)
  const navigation = useNavigation()
  const getBackgroundColor = () => {
    if (role === 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }
  const navigateToProfile = () => {
    navigation.navigate('AccountDetails')
  }

  const navigateToEditProfile = () => {
    navigation.navigate('AccountDetailsEdit')
  }

  const navigateToPasswordUpdate = () => {
    navigation.navigate('UpdatePassword')
  }

  const navigateToUserRating = () => {
    navigation.navigate('UserRating')
  }
  const navigateToCommentSent = () => {
    navigation.navigate('CommentSent')
  }

  const navigateToDriverEarning = () => {
    navigation.navigate('Earnings')
  }

  const dispatch = useDispatch()
  async function onLogout() {
    // dispatch(logout())
    await logout(dispatch)
    navigation.navigate('Login')
  }

  const passengerItems = [
    {
      icon: 'person-outline',
      text: 'Profile',
      action: navigateToProfile,
    },
    {
      icon: 'edit',
      text: 'Edit Profile',
      action: navigateToEditProfile,
    },
    {
      icon: 'security',
      text: 'Update Password',
      action: navigateToPasswordUpdate,
    },
    {
      icon: 'comment',
      text: 'My Rating',
      action: navigateToUserRating,
    },
    {
      icon: 'add-comment',
      text: 'Rating Published',
      action: navigateToCommentSent,
    },
    {
      icon: 'logout',
      text: 'Logout',
      action: () => onLogout(),
    },
  ]

  const driverItems = [
    {
      icon: 'person-outline',
      text: 'Profile',
      action: navigateToProfile,
    },
    {
      icon: 'edit',
      text: 'Edit Profile',
      action: navigateToEditProfile,
    },
    {
      icon: 'security',
      text: 'Update Password',
      action: navigateToPasswordUpdate,
    },
    {
      icon: 'comment',
      text: 'My Rating',
      action: navigateToUserRating,
    },
    {
      icon: 'add-comment',
      text: 'Rating Published',
      action: navigateToCommentSent,
    },
    {
      icon: 'attach-money',
      text: 'Earnings',
      action: navigateToDriverEarning,
    },
    {
      icon: 'logout',
      text: 'Logout',
      action: () => onLogout(),
    },
  ]

  const iconColor = role === 'passenger' ? '#1a237e' : '#042f2e' // Set the color based on the role

  const renderMorePageItem = ({ icon, text, action }) => (
    <Animated.View entering={FadeInRight}>
      <TouchableOpacity onPress={action} tw=" flex-row items-center pl-4 py-3">
        <MaterialIcons name={icon} size={24} color={iconColor} />
        <Text
          style={{
            marginLeft: 36,
            fontWeight: 600,
            fontSize: 16,
          }}
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-base`}
        >
          {text}{' '}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )

  const [animateMode, setAnimateMode] = useState('hide')

  useLayoutEffect(() => {
    setAnimateMode('hide')
  }, [time])

  useLayoutEffect(() => {
    if (animateMode === 'hide') {
      setAnimateMode('show')
    }
  }, [animateMode])

  return (
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <View tw="mx-2 flex-row justify-center items-center mt-4 mb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ marginHorizational: 12 }}>
        <View tw="px-4">
          <Image
            tw="w-80 h-20 self-center mt-6"
            source={
              role === 'passenger'
                ? require('../../../assets/logo/RideLinker-Passenger.png')
                : require('../../../assets/logo/RideLinker-Driver.png')
            }
          />
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-lg mt-10`}
            style={styles.font}
          >
            Account
          </Text>
          {animateMode === 'show' ? (
            <Animated.View entering={FadeInRight}>
              <View>
                {role === 'passenger'
                  ? passengerItems.map((item, index) => (
                      <React.Fragment key={index}>
                        {renderMorePageItem(item)}
                      </React.Fragment>
                    ))
                  : driverItems.map((item, index) => (
                      <React.Fragment key={index}>
                        {renderMorePageItem(item)}
                      </React.Fragment>
                    ))}
              </View>
            </Animated.View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default MorePage
