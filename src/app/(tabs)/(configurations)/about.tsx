import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet } from 'react-native'

export default function AboutScreen() {
  return (
    <View style={defaultStyles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.subtitle}>Versão 1.0.0</Text>
      <Text style={styles.legal}>
        Termos de uso e política de privacidade disponíveis no site.
      </Text>
      {/* Adicione mais informações sobre o app aqui */}
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
    marginBottom: 12,
  },
  legal: {
    fontSize: fontSize.xsm,
    color: colors.textMuted,
    marginBottom: 24,
  },
})
