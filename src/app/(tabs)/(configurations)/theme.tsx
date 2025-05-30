import { defaultStyles } from '@/styles'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function ThemeScreen() {
  const [selectedTheme, setSelectedTheme] = useState<
    'light' | 'dark' | 'system'
  >('system')

  function getCheckIcon(option: 'light' | 'dark' | 'system') {
    return selectedTheme === option ? (
      <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
    ) : (
      <Ionicons name="ellipse-outline" size={24} color={colors.textMuted} />
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Tema',
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
      <ScrollView
        style={[defaultStyles.container, { padding: 16 }]}
        accessible
        accessibilityLabel="Tema"
      >
        <View>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: selectedTheme === 'light' }}
            style={styles.option}
            onPress={() => setSelectedTheme('light')}
          >
            {getCheckIcon('light')}
            <Text style={styles.optionText}>Claro</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: selectedTheme === 'dark' }}
            style={styles.option}
            onPress={() => setSelectedTheme('dark')}
          >
            {getCheckIcon('dark')}
            <Text style={styles.optionText}>Escuro</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: selectedTheme === 'system' }}
            style={styles.option}
            onPress={() => setSelectedTheme('system')}
          >
            {getCheckIcon('system')}
            <Text style={styles.optionText}>Usar tema do sistema</Text>
          </Pressable>
        </View>
        <Text style={styles.subtitle}>
          Escolha o tema do app. O tema do sistema será usado caso não seja
          selecionado nenhum tema.
        </Text>
      </ScrollView>
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
    fontFamily: fontFamily.plusJakarta.medium,
  },
  subtitle: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: 24,
    fontFamily: fontFamily.plusJakarta.medium,
    textAlign: 'center',
    marginTop: 18,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(65, 68, 71, 0.16)',
  },
  optionText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
  },
})
