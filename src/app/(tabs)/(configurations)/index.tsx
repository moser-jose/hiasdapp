import { defaultStyles } from '@/styles'
import { colors, fontSize } from '@/constants/styles'
import { memo } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import ConfigurationsSVG from '@/components/svg/ConfigurationsSvg'
import { Ionicons } from '@expo/vector-icons'
import Separator from '@/components/util/Separator'
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
          <ConfigurationsSVG color={colors.primary} width={24} height={24} />
        }
        title="Sobre o app"
        description="Versão, termos e privacidade"
        onPress={() => router.push('/(tabs)/(configurations)/about')}
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
          © 2024 SeuApp. Todos os direitos reservados.
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
    fontSize: fontSize.smB,
    color: colors.text,
    fontWeight: '500',
  },
  menuDescription: {
    fontSize: fontSize.xsm,
    color: colors.textMuted,
    marginTop: 2,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
  },
})

export default memo(ConfigurationsScreen)
