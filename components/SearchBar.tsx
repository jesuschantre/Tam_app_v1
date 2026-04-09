import React from 'react'
import { View, TextInput } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

interface Props {
  value: string
  onChangeText: (text: string) => void
}

const SearchBar = ({ value, onChangeText }: Props) => {
    return (
        <View className="px-4 mt-4">

            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 shadow-sm">
                <Ionicons name="search" size={20} color="gray" />

                <TextInput
                placeholder="Buscar producto..."
                value={value}
                onChangeText={onChangeText}
                className="ml-2 flex-1"
                onSubmitEditing={() => {
                if (value.trim() !== '') {
                    router.push({
                    pathname: '/(stack)/products',
                    params: { search: value }
                    })
                }
                }}                
                />
            </View>
        </View>
    )
}
export default SearchBar