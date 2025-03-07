import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import LogoSVG from '../svg/LogoSVG'
import ChangeHymnsSVG from '../svg/ChangeHymnsSVG'
import Topic from './Topic'
import { colors, fontFamily, fontSize } from '@/constants/styles'

const Header = ({
  title,
  text,
  year,
}: {
  title: string
  text: string
  year: string
}) => {
  return (
    <View style={styles.container}>
      <LogoSVG color="#29C17E" />
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.view}>
          <Text style={styles.text}>{text}</Text>
          <Topic text={year} style={{ fontSize: fontSize.sm }} />
        </View>
      </View>
      <TouchableOpacity>
        <ChangeHymnsSVG color={colors.primary} />
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
    fontFamily: fontFamily.birthstoneBounce.medium,
    fontSize: fontSize.lg,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.base,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default Header
