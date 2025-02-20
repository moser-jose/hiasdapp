import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { fontSize } from '@/constants/styles'
import React, { FC, ReactNode } from 'react'

interface ContainerProps {
  title: string
  more?: boolean
  children?: ReactNode
}

const Separator: FC<ContainerProps> = ({
  title,
  more,
  children,
}: ContainerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.children}>
        {children}
        <Text style={styles.title}>{title}</Text>
      </View>
      {more && (
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.more}>Ver mais</Text>
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
    marginVertical: 10,
    paddingHorizontal: fontSize.sm,
  },
  more: {
    fontSize: fontSize.sm,
  },
  title: {
    fontSize: fontSize.base,
    fontWeight: '500',
  },
})

export default Separator
