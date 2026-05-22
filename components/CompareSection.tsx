import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const CompareSection = () => {
    return(
        <View className="mt-6 px-4 items-center">

            {/* Título */}
            <Text className="text-lg font-poppins-semibold text-center w-11/12">
                ¡Compara los productos por sus categorías!
            </Text>

            {/* Subtítulo UX */}
            <Text className="text-sm text-gray-500 mt-1 text-center w-10/12">
                Elige una categoría y compara las mejores opciones
            </Text>           

            <View style={{ alignItems: 'center', marginTop: 24, width: '100%' }}>

              {/* CELULARES */}
              <Pressable onPress={() => router.push({ pathname: '/compare/celular', params: { category: 'celulares' } })}>
                {({ pressed }) => (
                  <LinearGradient
                    colors={['#1E3A8A', '#3B82F6']}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 20, 
                      borderRadius: 50,
                      marginBottom: 12,

                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent: 'center', 

                      opacity: pressed ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }]
                    }}
                  >
                    <Ionicons 
                      name="phone-portrait-outline" 
                      size={18} 
                      color="white" 
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
                      Comparar celulares
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>

              {/* PORTÁTILES */}
              <Pressable onPress={() => router.push({ pathname: '/compare/computador', params: { category: 'portatiles' } })}>
                {({ pressed }) => (
                  <LinearGradient
                    colors={['#1E3A8A', '#3B82F6']}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 20, 
                      borderRadius: 50,
                      marginBottom: 12,

                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent: 'center', 

                      opacity: pressed ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }]
                    }}
                  >
                    <Ionicons 
                      name="laptop-outline" 
                      size={18} 
                      color="white" 
                      style={{ marginRight: 8 }}
                    />

                    <Text style={{ color: '#fff', fontWeight: '600' }}>
                      Comparar portátiles
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>

              {/* CONSOLAS */}
              <Pressable onPress={() => router.push({ pathname: '/compare/consola', params: { category: 'consolas' } })}>
                {({ pressed }) => (
                  <LinearGradient
                    colors={['#1E3A8A', '#3B82F6']}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 20, 
                      borderRadius: 50,
                      marginBottom: 12,

                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent: 'center', 

                      opacity: pressed ? 0.7 : 1,
                      transform: [{ scale: pressed ? 0.97 : 1 }]
                    }}
                  >
                    <Ionicons 
                      name="game-controller-outline" 
                      size={18} 
                      color="white" 
                      style={{ marginRight: 8 }}
                    />

                    <Text style={{ color: '#fff', fontWeight: '600' }}>
                      Comparar consolas
                    </Text>
                  </LinearGradient>
                )}
              </Pressable>

            </View>
            </View>        
    )
}
export default CompareSection