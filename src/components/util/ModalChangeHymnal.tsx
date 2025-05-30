import React from 'react'
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native'
import { colors, fontFamily, fontSize } from '@/constants/styles'
import ChangeHymnsSVG from '@/components/svg/ChangeHymnsSVG'

interface ModalChangeHymnalProps {
  visible: boolean
  onClose: () => void
  onSelect: (hymnal: { id: string; name: string }) => void
  currentHymnal?: string
  nextHymnal?: string
}

export function ModalChangeHymnal({
  visible,
  onClose,
  onSelect,
  currentHymnal,
  nextHymnal,
}: ModalChangeHymnalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar modal"
      />
      <View style={styles.centered}>
        <View style={styles.modalBody}>
          <View style={styles.iconContainer}>
            <ChangeHymnsSVG color={colors.primary} height={48} width={48} />
          </View>
          <Text style={styles.currentText}>
            Está a usar o hinário de{' '}
            <Text style={styles.currentTextBold}>1996</Text>.
          </Text>
          <Text style={styles.nextText}>
            Deseja usar o hinário de{' '}
            <Text style={styles.nextTextBold}>2022</Text>?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              accessibilityRole="button"
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => onSelect({ id: '1', name: 'Hinário 1' })}
              accessibilityRole="button"
            >
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.74)',
    zIndex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  modalBody: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    width: '85%',
    maxWidth: 350,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    alignItems: 'center',
  },
  currentTextBold: {
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  nextTextBold: {
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  iconContainer: {
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentText: {
    fontFamily: fontFamily.plusJakarta.regular,
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  nextText: {
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.base,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    gap: 12,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.third,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cancelText: {
    color: colors.textMuted,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: colors.green,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: colors.white,
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.sm,
  },
})
