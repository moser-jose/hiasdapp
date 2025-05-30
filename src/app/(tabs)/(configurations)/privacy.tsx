import { defaultStyles } from '@/styles'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
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
      <ScrollView
        style={[defaultStyles.container, { padding: 16 }]}
        accessible
        accessibilityLabel="Política de Privacidade"
      >
        <Text style={styles.paragraph}>
          Sua privacidade é importante para nós. Este aplicativo não coleta,
          armazena ou compartilha nenhum dado pessoal dos usuários.
        </Text>
        <Text style={styles.sectionTitle}>1. Segurança</Text>
        <Text style={styles.paragraph}>
          Mesmo não coletando dados, adotamos as melhores práticas de segurança
          para garantir a integridade e o bom funcionamento do aplicativo.
        </Text>
        <Text style={styles.sectionTitle}>2. Alterações nesta Política</Text>
        <Text style={styles.paragraph}>
          Podemos atualizar esta Política de Privacidade periodicamente.
          Notificaremos sobre alterações significativas por meio do aplicativo
          ou outros meios.
        </Text>
        <Text style={styles.sectionTitle}>3. Contato</Text>
        <Text style={styles.paragraph}>
          Em caso de dúvidas sobre esta Política de Privacidade, entre em
          contato pelo e-mail: suporteha7d@gmail.com
        </Text>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    color: colors.primary,
    marginBottom: 12,
    marginTop: 16,
    fontFamily: fontFamily.plusJakarta.regular,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: 12,
    lineHeight: 20,
  },
})
