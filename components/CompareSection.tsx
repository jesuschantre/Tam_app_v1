import React from 'react'
import { View, Text } from 'react-native'
import CustomButton from './buttons/CustomButton'
import { router } from 'expo-router'

const CompareSection = () => {
    return(
        <View className="mt-6 px-4 items-center">

            {/* Título */}
            <Text className="text-lg font-poppins-semibold">
                ¡Compara productos!
            </Text>

            {/* Subtítulo UX */}
            <Text className="text-sm text-gray-500 mt-1">
                Encuentra el dispositivo ideal
            </Text>

            {/* Comparación visual */}
            <View className="flex-row items-center justify-between w-full my-6">

                <View className="w-24 h-24 bg-gray-200 rounded-full" />

                <Text className="text-2xl font-bold mx-4">
                VS
                </Text>

                <View className="w-24 h-24 bg-gray-200 rounded-full" />

            </View>

            {/* Botón */}
            <CustomButton
                className="mt-2"
                onPress={() => router.push('/compare')}
            >
                Comparar productos
            </CustomButton>  

        </View>
    )
}
export default CompareSection