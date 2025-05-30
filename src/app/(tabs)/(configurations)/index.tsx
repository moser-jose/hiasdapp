import { defaultStyles } from '@/styles'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import { memo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

interface MenuItemProps {
  icon: React.ReactNode
  title: string
  description?: string
  onPress?: () => void
}

function MenuItem({ icon, title, description, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.icon}>{icon}</View>
      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {description && (
          <Text style={styles.menuDescription}>{description}</Text>
        )}
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={20}
        color={colors.textMuted}
      />
    </TouchableOpacity>
  )
}

const ConfigurationsScreen = () => {
  const router = useRouter()
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={[defaultStyles.container, { paddingRight: 16 }]}
    >
      {/* <Text style={styles.header}>Configurações</Text> */}

      <MenuItem
        icon={<Ionicons name="moon-outline" size={24} color={colors.primary} />}
        title="Tema"
        description="Claro / Escuro"
        onPress={() => router.push('/(tabs)/(configurations)/theme')}
      />
      <MenuItem
        icon={
          <Ionicons name="share-outline" size={24} color={colors.primary} />
        }
        title="Compartilhar"
        description="Compartilhe o app com seus amigos"
        onPress={() => router.push('/(tabs)/(configurations)/share')}
      />
      <MenuItem
        icon={
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.primary}
          />
        }
        title="Sobre o app"
        description="Versão, termos e privacidade"
        onPress={() => router.push('/(tabs)/(configurations)/about')}
      />
      <MenuItem
        icon={
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={colors.primary}
          />
        }
        title="Política de privacidade"
        description="Política de privacidade"
        onPress={() => router.push('/(tabs)/(configurations)/privacy')}
      />
      <MenuItem
        icon={
          <Ionicons
            name="document-text-outline"
            size={24}
            color={colors.primary}
          />
        }
        title="Termos de uso"
        description="Termos de uso"
        onPress={() => router.push('/(tabs)/(configurations)/terms')}
      />
      <MenuItem
        icon={
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={colors.primary}
          />
        }
        title="Ajuda e suporte"
        description="Perguntas frequentes e contato"
        onPress={() => router.push('/(tabs)/(configurations)/help')}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © {new Date().getFullYear()} HIA7D. Todos os direitos reservados.
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
    paddingTop: 0,
  },
  header: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  icon: {
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
  },
  menuDescription: {
    fontSize: fontSize.xsm,
    color: 'rgba(65, 68, 71, 0.64)',
    marginTop: 2,
    fontFamily: fontFamily.plusJakarta.regular,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    fontFamily: fontFamily.plusJakarta.medium,
  },
})

export default memo(ConfigurationsScreen)
