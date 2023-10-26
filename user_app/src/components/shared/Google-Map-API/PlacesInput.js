import { View, Text, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { ScrollView } from 'react-native-virtualized-view'

const PlacesInput = ({ onCoordChange }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        listViewDisplayed={true}
        autoFillOnNotFound={true}
        onPress={(data, details = null) => {
          onCoordChange?.(
            details?.geometry?.location,
            details.formatted_address,
          )
          // console.log('test:', details.formatted_address)
        }}
        query={{
          key: 'AIzaSyBtIbI143Q26nRoBlljF96q_DWQ_dg31Vc',
          language: 'en',
          components: 'country:hk',
        }}
        onFail={(error) => console.error(error)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default memo(PlacesInput)
