import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet } from 'react-native'

export default function NotificationsScreen() {
  return (
    <View style={defaultStyles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.subtitle}>
        Gerencie suas preferências de notificação.
      </Text>
      {/* Adicione opções de notificação aqui */}
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
