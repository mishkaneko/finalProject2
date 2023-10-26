import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native'
import { api_origin, get, post } from './api'
import StarRating from 'react-native-star-rating-widget'
import { Feather } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const IndividualComment = (props) => {
  const { route } = props
  const { id } = route.params
  const [individualComment, setIndividualComment] = useState({})
  const [individualCommentText, setIndividualCommentText] = useState(
    individualComment.comment,
  )
  const [rating, setRating] = useState(individualComment.score)
  const role = useSelector((state) => state.auth.role)
  const navigation = useNavigation()

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  const getIndComment = async () => {
    try {
      console.log('React getIndComment')
      let json = await get('/user/commentpublished/' + id)
      console.log('getIndComment', json)
      setIndividualComment(json)
      setRating(json.score)
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  async function submit() {
    try {
      console.log('sumbit', id, rating, individualCommentText)
      const res = await fetch(api_origin + '/user/commentpublished/' + id, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: JSON.stringify({
          commentId: id,
          score: rating,
          comment: individualCommentText,
        }),
      })
      let json = await res.json()
      console.log('submit', json)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getIndComment()
  }, [])

  return (
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <View tw="mt-3">
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
      <View tw="mx-6">
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-base self-center text-3xl mt-8 mb-4`}
          style={styles.font}
        >
          Edit My Comment
        </Text>
        <Text
          style={styles.font}
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-lg`}
        >
          To {individualComment.name}
        </Text>
        <StarRating rating={rating} onChange={setRating} />
        <View>
          <TextInput
            tw="h-56 text-lg"
            style={styles.font}
            multiline={true}
            numberOfLines={10}
            onChangeText={(text) => setIndividualCommentText(text)}
            defaultValue={individualComment.comment}
            value={individualCommentText}
          />
        </View>
        <TouchableOpacity
          onPress={submit}
          tw="bg-gray-200 shadow-md flex-row mx-14 rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out"
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default IndividualComment
