import { StyleSheet } from 'react-native'
import React from 'react'
import { Check } from '@tamagui/lucide-icons'
import { Checkbox, XStack } from 'tamagui'
import { StyledTextD } from '../../components/shared/StyledComponents'

const CheckBox = ({ id, label, checked, onCheckedChange }) => {
  return (
    <XStack alignItems="center" space="$2">
      <Checkbox
        size="$6"
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator>
          <Check />
        </Checkbox.Indicator>
      </Checkbox>
      <StyledTextD style={styles.font}>{label}</StyledTextD>
    </XStack>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
})

export default CheckBox
