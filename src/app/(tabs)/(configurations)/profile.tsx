import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet } from 'react-native'

export default function ProfileScreen() {
  return (
    <View style={defaultStyles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>
        Gerencie suas informações de perfil aqui.
      </Text>
      {/* Adicione campos e ações do perfil aqui */}
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
