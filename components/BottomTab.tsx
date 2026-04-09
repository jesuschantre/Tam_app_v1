import React from 'react'
import { View, Pressable, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useAuth } from '@/context/AuthContext'

const BottomTab = () => {
  const { user } = useAuth()
  return (
    <View className="bg-primary py-7 flex-row justify-around rounded-t-lg">

      <Pressable onPress={() => router.push('/compare')}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Ionicons name="git-compare-outline" size={22} color="white" />
          </View>
        )}
      </Pressable>

      <Pressable onPress={() => router.push('/favorites')}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Ionicons name="heart-outline" size={22} color="white" />
          </View>
        )}
      </Pressable>

      <Pressable onPress={() => router.push('/home')}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Ionicons name="home" size={22} color="white" />
          </View>
        )}
      </Pressable>

      <Pressable onPress={() => router.push('/notification')}>
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Ionicons name="notifications-outline" size={22} color="white" />
          </View>
        )}
      </Pressable>

      <Pressable 
      onPress={() => {
        if (user) {
          router.push('/profile')
        } else {
          router.push('/login')
        }
      }}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            {user ? (
              <Image
                source={user.imagen}
                style={{ width: 24, height: 24, borderRadius: 12 }}
              />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
            )}
          </View>
        )}
      </Pressable>

    </View>
  )
}

export default BottomTab