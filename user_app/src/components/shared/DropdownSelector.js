import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'

const DropdownSelector = (props) => {
  const {
    dropDownData,
    iconName,
    iconPosition,
    width,
    dropDownValue,
    onValueChange,
  } = props
  const [isFocus, setIsFocus] = useState(false)

  const iconRenderer = () => (
    <AntDesign
      style={styles.icon}
      color={isFocus ? '#4e46dc' : '#36309d'}
      name={iconName}
      size={20}
    />
  )

  return (
    <View>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: 'indigo' },
          { width: width },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={dropDownData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="..."
        value={dropDownValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onValueChange(item.value)
          setIsFocus(false)
        }}
        renderLeftIcon={iconPosition === 'left' ? iconRenderer : null}
        renderRightIcon={iconPosition === 'right' ? iconRenderer : null}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

export default DropdownSelector
