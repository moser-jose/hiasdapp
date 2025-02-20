import { colors, fontSize } from '@/constants/styles'
import { truncateText } from '@/helpers/textsWords'
import { Author } from '@/types/hymnsTypes'
import shortName from '@mosmmy/shortname-js'
import { Text, View, StyleSheet, StyleProp, TextStyle } from 'react-native'

const Authors = ({
  authors,
  style,
  card,
}: {
  authors: Author[] | null
  card: boolean
  style?: StyleProp<TextStyle>
}) => {
  return (
    <View style={styles.container}>
      {authors === null || authors?.length === 0 ? (
        <Text style={style ? style : styles.hymnTitleBase}>Desconhecido</Text>
      ) : (
        authors.map((item: Author, index: number) => {
          const isLastItem = index === authors.length - 1

          const name =
            item.name == null
              ? 'Desconhecido'
              : shortName(item.name) === undefined
                ? 'Desconhecido'
                : (shortName(item.name) as string)
          const separator = !isLastItem ? ', ' : ''

          return (
            <Text key={index} style={style ? style : styles.hymnTitleBase}>
              {card
                ? authors.length === 1
                  ? name + '' + separator
                  : authors.length >= 2 &&
                    truncateText(name, 14) + '' + separator
                : name + '' + separator}
            </Text>
          )
        })
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  hymnTitleBase: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    width: 'auto',
  },
})

export default Authors
