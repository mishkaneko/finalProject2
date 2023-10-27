import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import RatingCard from '../../components/shared/screen-components/RatingCard'
import { get } from './api'
import { useSelector } from 'react-redux'
import { MaterialIcons } from '@expo/vector-icons'

const MyRating = ({ navigation }) => {
  const role = useSelector((state) => state.auth.role)
  const [ratings, setRatings] = useState([])
  // const ratingScore = 3.3
  const [overallRating, setOverallRating] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  useEffect(() => {
    getRating()
  }, [])

  const getRating = async () => {
    try {
      let json = await get('/user/rating')
      let commentsFromServer = json.individual_comment
      avgScore = json.overallAvg.average_score
      // console.log('getRatingRN', commentsFromServer)
      // console.log('getRatingRN', avgScore)
      setRatings(commentsFromServer)
      setOverallRating(avgScore)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('ratings:', ratings, 'avgScore', overallRating)
  }, [ratings, overallRating])

  return (
    // <SafeAreaView  tw="mt-16 mx-9">
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <TouchableOpacity
        tw="mt-10"
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: 0,
        }}
      >
        <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
      </TouchableOpacity>
      <ScrollView tw="mt-16 mx-9" showsVerticalScrollIndicator={false}>
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-3xl self-center mb-3`}
          style={styles.font}
        >
          My Rating
        </Text>
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-2xl self-center mb-2`}
          style={styles.font}
        >
          Overall Rating
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {ratings.length > 0 ? (
              <>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } self-center text-8xl`}
                  style={styles.font}
                >
                  {overallRating}
                </Text>
                <StarRatingDisplay
                  rating={overallRating}
                  tw="mb-6  self-center"
                />
              </>
            ) : (
              <>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } self-center text-8xl`}
                  style={styles.font}
                >
                  5
                </Text>
                <StarRatingDisplay rating={5} tw="mb-6  self-center" />
                <View tw="bg-gray-100  rounded-lg h-28 px-4 mb-3 shadow-sm justify-center items-center">
                  <Text
                    style={styles.font}
                    tw={`${
                      role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                    } `}
                  >
                    No Rating from others yet.
                  </Text>
                </View>
              </>
            )}

            {/* <RatingCard
          name="James"
          date="15 Oct 2023"
          score="2.5"
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae officiis
          dolorum consequuntur unde, nisi, adipisci accusantium quam ea beatae
          accusamus repellendus. Ea reprehenderit laborum sed rerum corrupti
          voluptatibus, error accusantium. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Quis fugiat a cupiditate cum quod sint nulla ipsum
          tempore, quae, dolores placeat ea ducimus reprehenderit eum, molestiae
          vel. Veritatis"
        /> */}
            {ratings.length > 0 &&
              ratings.map((rating) => (
                <RatingCard
                  key={rating.id}
                  from_name={rating.from_name}
                  score={rating.score}
                  comment={rating.comment}
                />
              ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default MyRating
