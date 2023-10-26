import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { get } from './api'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { Feather } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'

const Item = ({ comment, score, toName, id }) => {
  const role = useSelector((state) => state.auth.role)
  const navigation = useNavigation()

  const iconColor = role === 'passenger' ? '#1a237e' : '#042f2e' // Set the color based on the role

  return (
    <View tw="bg-gray-100 rounded-lg h-28 px-4 mb-3 shadow-sm mx-8">
      <View tw="flex-row justify-between">
        <Text
          style={styles.font}
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-base mt-2`}
        >
          To {toName}
        </Text>
        <Feather
          name="edit"
          size={24}
          color={iconColor}
          style={{ marginTop: 3 }}
          onPress={() => navigation.navigate('IndividualComment', { id })}
          // onPress={() => console.log('RATING')}
        />
      </View>

      {role == 'passenger' ? (
        <StarRatingDisplay
          rating={score}
          starSize={15}
          color="#a934b2"
          emptyColor="gray"
          tw="mb-2"
        />
      ) : (
        <StarRatingDisplay
          rating={score}
          starSize={15}
          color="#115E8D"
          emptyColor="gray"
          tw="mb-2"
        />
      )}
      <ScrollView>
        <Text style={styles.font}>{comment}</Text>
      </ScrollView>
    </View>
  )
}

const CommentSent = () => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const role = useSelector((state) => state.auth.role)
  const navigation = useNavigation()

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  const getComment = async () => {
    let result = await get('/user/commentpublished')
    console.log(result)
    setComment(result)
  }
  useEffect(() => {
    getComment()
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: getBackgroundColor() }} tw="h-full">
      <View tw="mt-1">
        <TouchableOpacity
          tw="ml-2"
          onPress={() => {
            navigation.goBack()
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-base text-3xl mt-6 mb-4 text-center`}
          style={styles.font}
        >
          My Published Comments
        </Text>

        {comment.length > 0 ? (
          <FlatList
            data={comment}
            renderItem={({ item }) => (
              <>
                <Item
                  comment={item.comment}
                  score={item.score}
                  toName={item.to_name}
                  id={item.id}
                />
              </>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View tw="bg-gray-100 rounded-lg h-48 px-4 mb-3 shadow-sm mt-2 mb-1 mx-4 justify-center items-center">
            <Text
              style={styles.font}
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              } text-base font-semibold text-base text-center`}
            >
              You haven't published rating for others yet.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default CommentSent
