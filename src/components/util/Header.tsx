import { colors, fontFamily, fontSize } from '@/constants/styles'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ChangeHymnsSVG from '../svg/ChangeHymnsSVG'
import LogoSVG from '../svg/LogoSVG'
import Topic from './Topic'
import { useStateStore } from '@/store/modal'
import { useShallow } from 'zustand/react/shallow'

const Header = ({
  title,
  text,
  year,
}: {
  title: string
  text: string
  year: string
}) => {
  const { setChangeHymns } = useStateStore(
    useShallow(state => ({
      setChangeHymns: state.setChangeHymns,
    }))
  )
  return (
    <View style={styles.container}>
      <LogoSVG color="#29C17E" />
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.view}>
          <Text style={styles.text}>{text}</Text>
          <Topic text={year} style={{ fontSize: fontSize.xs }} />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setChangeHymns(true)
        }}
      >
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    color: '#61788A',
    fontFamily: fontFamily.birthstoneBounce.medium,
    fontSize: fontSize.lg,
  },
  title: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.smB,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

export default Header
