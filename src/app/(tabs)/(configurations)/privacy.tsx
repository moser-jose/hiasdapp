import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

export default function ThemeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Política de privacidade',
          headerBackTitle: 'Voltar',
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontSize: fontSize.base,
            fontWeight: 'bold',
            color: colors.text,
          },
          headerStyle: {
            backgroundColor: colors.third,
          },
        }}
      />
      <View style={defaultStyles.container}>
        <Text style={styles.title}>Política de privacidade</Text>
        <Text style={styles.subtitle}>Política de privacidade do app.</Text>
        {/* Adicione opções de seleção de tema aqui */}
      </View>
    </>
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
