import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { StarRatingDisplay } from 'react-native-star-rating-widget'
import { useSelector } from 'react-redux'

// const RatingCard = (props) => {
//   const { from_name, score, comment } = props.props
const RatingCard = ({ from_name, score, comment }) => {
  const role = useSelector((state) => state.auth.role)
  // useEffect(() => {
  //   console.log('props: ', props.props)
  // }, [])
  console.log(from_name, score, comment)
  return (
    <>
      <View tw="bg-gray-100  rounded-lg px-4 mb-3 pb-4 shadow-sm">
        <View tw="mt-2 mb-1">
          <Text style={styles.font}>{from_name}</Text>
          {/* <Text style={styles.font}>{date}</Text> */}
        </View>

        <View tw="opacity-50">
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
        </View>
        <View>
          <Text style={styles.font}>
            {comment}
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae officiis
        dolorum consequuntur unde, nisi, adipisci accusantium quam ea beatae
        accusamus repellendus. Ea reprehenderit laborum sed rerum corrupti
        voluptatibus, error accusantium. Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quis fugiat a cupiditate cum quod sint nulla ipsum
        tempore, quae, dolores placeat ea ducimus reprehenderit eum, molestiae
        vel. Veritatis */}
          </Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default RatingCard
