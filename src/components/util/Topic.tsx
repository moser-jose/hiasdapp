import { colors } from '@/constants/styles'
import { Text, StyleSheet } from 'react-native'

const Topic = ({ text }: { text: string }) => {
  return <Text style={styles.text}>{text}</Text>
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
