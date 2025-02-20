import { colors, fontSize } from '@/constants/styles'

import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  text: {
    color: colors.text,
    fontSize: fontSize.base,
  },
})

export const utilsStyles = StyleSheet.create({
  centeredRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emptyContentImage: {
    alignSelf: 'center',
    height: 200,
    marginTop: 40,
    opacity: 0.3,
    width: 200,
  },
  emptyContentText: {
    ...defaultStyles.text,
    color: colors.textMuted,
    marginTop: 20,
    textAlign: 'center',
  },
  itemSeparator: {
    borderColor: colors.textMuted,
    borderWidth: StyleSheet.hairlineWidth,
    opacity: 0.3,
  },
  slider: {
    borderRadius: 16,
    height: 7,
  },
})
export const scrollViewHorizontal = StyleSheet.create({
  horizontal: {
    flex: 1,
  },
})
export const hymnsCard = StyleSheet.create({
  ViewCard: {
    flex: 1,
  },
  author: {
    color: colors.textMuted,
    fontSize: fontSize.xss,
  },
  baseTitle: {
    color: colors.textMuted,
    fontSize: fontSize.xss,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    position: 'relative',
  },
  cardTittle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.greenRGBA,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
    marginRight: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
    position: 'relative',
    width: 290,
  },
  number: {
    color: colors.text,
    fontSize: fontSize.base,
    fontWeight: 'bold',
  },
  play: {
    bottom: -20,
    position: 'absolute',
    right: -8,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.base,
  },
  viewTittle: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
})
