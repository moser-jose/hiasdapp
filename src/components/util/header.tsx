import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import LogoSVG from '../svg/LogoSVG'
import ChangeHymnsSVG from '../svg/ChangeHymnsSVG'
import Topic from './Topic'
import { colors } from '@/constants/styles'

const Header = ({ title, text, year }: { title: string; text: string; year: string }) => {
  return (
    <View style={styles.container}>
      <LogoSVG color="#29C17E" />
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.view}>
          <Text style={styles.text}>{text}</Text>
          <Topic text={year} />
        </View>
      </View>
      <TouchableOpacity>
        <ChangeHymnsSVG color="#1C274C" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    color: '#61788A',
    fontFamily: 'BirthstoneBounce_500Medium',
    fontSize: 20,
  },
  title: {
    color: colors.text,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 18,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default Header
