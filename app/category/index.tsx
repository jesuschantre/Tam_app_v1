import React from 'react'
import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'

const CategoryScreen = () => {
  const { type } = useLocalSearchParams()

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">
        Categoría: {type}
      </Text>
    </View>
  )
}

export default CategoryScreen