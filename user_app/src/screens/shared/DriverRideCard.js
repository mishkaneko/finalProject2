// import React from 'react'
// import { Text, View, StyleSheet, ScrollView } from 'react-native'
// import { FontAwesome5 } from '@expo/vector-icons'

// const DriverRideCard = ({
//   status,
//   fromName,
//   fromTime,
//   fromDate,
//   waypoint1Name,
//   waypoint2Name,
//   toName,
//   toTime,
//   toDate,
// }) => {
//   return (
//     <ScrollView tw=" rounded-lg h-44 px-2 mb-2 py-2 bg-white rounded-lg shadow-md">
//       <View tw="flex-row mb-2 pl-3 border">
//         <FontAwesome5
//           name="map-marker-alt"
//           size={18}
//           color="#CD7F32"
//           style={{ marginTop: 2 }}
//         />
//         <View>
//           <View tw="w-36 break-words pl-2 text-teal-950 border">
//             <Text style={styles.font} tw="text-teal-950">
//               Route
//             </Text>
//             <Text style={styles.font} tw="text-teal-950">
//               {`\u2022`} {fromName}
//             </Text>
//             <Text style={styles.font} tw="text-teal-950">
//               {`\u2022`} {waypoint1Name}
//             </Text>
//             {waypoint2Name == '' ? (
//               <Text style={styles.font} tw="text-teal-950">
//                 {waypoint2Name}
//               </Text>
//             ) : (
//               <Text style={styles.font} tw="text-teal-950">
//                 {`\u2022`} {waypoint2Name}
//               </Text>
//             )}
//             {toName == '' ? (
//               <Text style={styles.font} tw="text-teal-950">
//                 {toName}
//               </Text>
//             ) : (
//               <Text style={styles.font} tw="text-teal-950">
//                 {`\u2022`} {toName}
//               </Text>
//             )}
//           </View>
//         </View>
//         <View tw="mt-5">
//           <Text style={styles.font} tw="pl-8 text-teal-950">
//             {fromDate}
//           </Text>
//           <Text style={styles.font} tw="pl-8 mb-4 text-teal-950">
//             {fromTime}
//           </Text>
//           <Text style={styles.font} tw="pl-8 text-teal-950">
//             {toDate}
//           </Text>
//           <Text style={styles.font} tw="pl-8 text-teal-950">
//             {toTime}
//           </Text>
//         </View>
//       </View>
//       {status == 'CONFIRMED' ? (
//         <View tw="bg-green-200 mr-40">
//           <Text tw="pl-6 text-xl text-teal-950" style={styles.font}>
//             {status}
//           </Text>
//         </View>
//       ) : status == 'CANCELED' ? (
//         <View tw="bg-red-200 mr-40">
//           <Text tw="pl-6 text-xl text-teal-950" style={styles.font}>
//             {status}
//           </Text>
//         </View>
//       ) : (
//         <View tw="bg-blue-200 mr-40">
//           <Text tw="pl-6 text-xl text-teal-950" style={styles.font}>
//             {status}
//           </Text>
//         </View>
//       )}
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   font: { fontFamily: 'font' },
// })

// export default DriverRideCard

import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const DriverRideCard = ({
  status,
  fromName,
  fromTime,
  fromDate,
  waypoint1Name,
  waypoint2Name,
  toName,
  toTime,
  toDate,
}) => {
  const [contentHeight, setContentHeight] = useState(0)
  const data = [fromName, waypoint1Name, waypoint2Name, toName]
  return (
    <View
      tw="rounded-lg px-2 mb-2 py-2 bg-white rounded-lg shadow-md"
      style={({ height: contentHeight }, styles.cardContainer)}
      onLayout={(event) => {
        setContentHeight(event.nativeEvent.layout.height)
      }}
    >
      <View tw="flex-row mb-2 pl-3">
        <FontAwesome5
          name="map-marker-alt"
          size={18}
          color="#CD7F32"
          style={{ marginTop: 2 }}
        />

        <View>
          <View tw="w-36 break-words pl-2 text-teal-950">
            <View>
              <Text style={styles.font} tw="text-teal-950">
                Route
              </Text>
            </View>
            <View>
              {data.map((item, index) => (
                <View key={index} tw="flex-row">
                  <View>
                    <Text>{`\u2022`}</Text>
                  </View>
                  <View>
                    <Text style={styles.font} tw="text-teal-950 ml-2">
                      {item}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View tw="ml-4">
          <View tw="flex-row">
            <Ionicons name="ios-time-sharp" size={20} color="#E1C16E" />
            <View>
              <Text style={styles.font} tw="pl-2 text-teal-950">
                Time
              </Text>
            </View>
          </View>
          <Text style={styles.font} tw="pl-8 text-teal-950">
            {fromDate}
          </Text>
          <Text style={styles.font} tw="pl-8 mb-4 text-teal-950">
            {fromTime.slice(0, -3)}
          </Text>
          <Text style={styles.font} tw="pl-8 text-teal-950">
            {toDate}
          </Text>
          <Text style={styles.font} tw="pl-8 text-teal-950">
            {toTime.slice(0, -3)}
          </Text>
        </View>
      </View>
      {status == 'CONFIRMED' ? (
        <View tw="bg-green-200 mr-40">
          <Text tw="pl-6 text-xl text-teal-950" style={styles.font}>
            {status}
          </Text>
        </View>
      ) : status == 'CANCELED' ? (
        <View tw="bg-red-200 mr-40">
          <Text tw="pl-6 text-xl text-teal-950" style={styles.font}>
            {status}
          </Text>
        </View>
      ) : (
        <View tw="bg-blue-200 mr-40">
          <Text tw="pl-6 text-xl text-teal-950" style={styles.font}>
            {status}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
  cardContainer: {
    marginBottom: 10, // Adjust the margin as needed
    padding: 10, // Adjust the padding as needed
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
})

export default DriverRideCard
