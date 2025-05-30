import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { Text, StyleSheet, ScrollView } from 'react-native'
import { Stack } from 'expo-router'

export default function ThemeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Termos de uso',
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
        accessibilityLabel="Termos de uso"
      >
        <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
        <Text style={styles.paragraph}>
          Ao acessar e utilizar este aplicativo, você concorda em cumprir estes
          Termos de Uso e todas as leis e regulamentos aplicáveis.
        </Text>
        <Text style={styles.sectionTitle}>2. Uso Permitido</Text>
        <Text style={styles.paragraph}>
          Você se compromete a utilizar o aplicativo apenas para fins legais e
          de acordo com estes termos. É proibido utilizar o app para fins
          ilícitos, fraudulentos ou que possam prejudicar terceiros.
        </Text>
        <Text style={styles.sectionTitle}>3. Privacidade</Text>
        <Text style={styles.paragraph}>
          Não coletamos, armazenamos ou compartilhamos nenhum dado pessoal dos
          usuários.
        </Text>
        <Text style={styles.sectionTitle}>4. Propriedade Intelectual</Text>
        <Text style={styles.paragraph}>
          Todo o conteúdo do aplicativo, incluindo textos, imagens, logotipos e
          marcas, é protegido por direitos autorais e não pode ser reproduzido
          sem autorização.
        </Text>
        <Text style={styles.sectionTitle}>
          5. Limitação de Responsabilidade
        </Text>
        <Text style={styles.paragraph}>
          Não nos responsabilizamos por danos diretos ou indiretos decorrentes
          do uso ou da impossibilidade de uso do aplicativo.
        </Text>
        <Text style={styles.sectionTitle}>6. Alterações nos Termos</Text>
        <Text style={styles.paragraph}>
          Reservamo-nos o direito de modificar estes Termos de Uso a qualquer
          momento. As alterações entrarão em vigor após a publicação no
          aplicativo.
        </Text>
        <Text style={styles.sectionTitle}>7. Contato</Text>
        <Text style={styles.paragraph}>
          Em caso de dúvidas, entre em contato conosco pelo e-mail:
          suporteha7d@gmail.com
        </Text>
        <Text style={styles.paragraph}>
          Ao continuar utilizando o aplicativo, você declara estar ciente e de
          acordo com estes Termos de Uso.
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
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: 'bold',
    color: colors.primary,
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
