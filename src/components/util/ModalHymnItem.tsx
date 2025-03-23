import { colors, fontFamily, fontSize } from '@/constants/styles'
import { Hymn } from '@/types/hymnsTypes'
import { Ionicons } from '@expo/vector-icons'
import { useRef } from 'react'
import { useState } from 'react'
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Share,
  Alert,
} from 'react-native'

interface ModalHymnItemProps {
  modalPosition?: { top: number; right: number }
  modalVisible?: boolean
  setModalVisible: (visible: boolean) => void
  hymn?: number
  title?: string
  number?: number
  lyrics?: string
}

export const ModalHymnItem = ({
  modalPosition,
  modalVisible,
  setModalVisible,
  hymn,
  title,
  number,
  lyrics,
}: ModalHymnItemProps) => {
  const handleDownload = () => {
    // Implementar lógica de download
    setModalVisible(false)
  }

  const handleShare = async () => {
    try {
      const content = `${title} (Hino ${number})\n\n${lyrics}`
      await Share.share({
        message: content,
        title: `${title} - Hino ${number}`,
      })
      setModalVisible(false)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar a letra')
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.modalContainer,
            {
              position: 'absolute',
              top: modalPosition?.top,
              right: modalPosition?.right,
            },
          ]}
        >
          <TouchableOpacity style={styles.modalOption} onPress={handleDownload}>
            <View style={styles.modalOptionContent}>
              <Ionicons
                name="download-outline"
                size={18}
                color={colors.primary}
              />
              <Text style={styles.modalOptionText}>
                Baixar o hino {hymn ? `nº ${hymn}` : ''}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.modalDivider} />

          <TouchableOpacity style={styles.modalOption} onPress={handleShare}>
            <View style={styles.modalOptionContent}>
              <Ionicons name="share-outline" size={18} color={colors.primary} />
              <Text style={styles.modalOptionText}>Partilhar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 4,
    padding: 5,
    /* width: '40%', */
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  modalOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalOptionText: {
    color: colors.text,
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
  },
  modalDivider: {
    height: 0.3,
    backgroundColor: colors.textMuted,
    marginHorizontal: 0,
  },
})
