import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fontFamily, fontSize } from '@/constants/styles'
import React, { ReactNode } from 'react'
import { Ionicons } from '@expo/vector-icons'
interface ContainerProps {
  title: string
  more?: boolean
  children?: ReactNode
}

const Separator = ({ title, more, children }: ContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.children}>
        {children}
        <Text style={styles.title}>{title}</Text>
      </View>
      {more && (
        <TouchableOpacity style={styles.more} activeOpacity={0.8}>
          <Text style={styles.more}>Ver mais</Text>
          <Ionicons name="chevron-forward-outline" size={16} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  children: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: fontSize.sm,
  },
  more: {
    alignItems: 'center',
    flexDirection: 'row',
    fontFamily: fontFamily.plusJakarta.medium,
    fontSize: fontSize.sm,
    gap: 4,
  },
  title: {
    fontFamily: fontFamily.plusJakarta.bold,
    fontSize: fontSize.lg,
  },
})

export default Separator
