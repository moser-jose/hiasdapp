import {colors, fontSize} from '@/constants/styles'

import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.base,
		color: colors.text,
	},
})

export const utilsStyles = StyleSheet.create({
	centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	slider: {
		height: 7,
		borderRadius: 16,
	},
	itemSeparator: {
		borderColor: colors.textMuted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.3,
	},
	emptyContentText: {
		...defaultStyles.text,
		color: colors.textMuted,
		textAlign: 'center',
		marginTop: 20,
	},
	emptyContentImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 40,
		opacity: 0.3,
	},
})
export const scrollViewHorizontal= StyleSheet.create({
	horizontal: {
		flex:1
	},
})
export const hymnsCard=StyleSheet.create({
	container: {
		width: 290,
		backgroundColor: colors.favoritesRGBA,
		borderRadius:8,
		position:'relative',
		justifyContent: 'space-between',
		flexDirection:'row',
		alignItems: 'center',
		paddingVertical:15,
		paddingHorizontal:10,
		marginBottom:20,
		marginHorizontal:16,
		marginRight:16,
	},
	number:{
		fontSize:fontSize.base,
		fontWeight:'bold',
		color:colors.text
	},
	card: {
		position:'relative',
		flexDirection: 'row',
		alignItems: 'center',
		gap:6,
	},
	ViewCard:{
		flex:1
	},
	cardTittle:{
		position:'relative',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewTittle:{
		flexDirection: 'row',
		alignItems: 'center',
		gap:6,
	},
	title:{
		fontSize:fontSize.base,
		color:colors.text
	},
	baseTitle:{
		fontSize:fontSize.xss,
		color:colors.textMuted
	},
	play:{
		position: 'absolute',
		right: -8,
		bottom: -20
	}
});