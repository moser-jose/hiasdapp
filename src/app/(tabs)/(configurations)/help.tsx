import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet } from 'react-native'

export default function HelpScreen() {
  return (
    <View style={defaultStyles.container}>
      <Text style={styles.title}>Ajuda e Suporte</Text>
      <Text style={styles.subtitle}>
        Encontre respostas para dúvidas frequentes ou entre em contato conosco.
      </Text>
      {/* Adicione perguntas frequentes e informações de contato aqui */}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    marginTop: 16,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: 24,
  },
})
