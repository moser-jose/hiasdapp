import { colors } from '@/constants/styles'
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native'

const Topic = ({
  text,
  style,
}: {
  text: string
  style?: StyleProp<TextStyle>
}) => {
  return <Text style={[{ ...styles.text }, style]}>{text}</Text>
}

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    backgroundColor: colors.greenRGBA,
    borderRadius: 10,
    color: colors.text,
    fontSize: 10,
    justifyContent: 'center',
    marginLeft: 4,
    padding: 4,
  },
})

export default Topic
