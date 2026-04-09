import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerMenu from './DrawerMenu';

const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false)

return (
    <>
      {/* SAFE AREA (SOLUCIÓN AL PROBLEMA) */}
      <SafeAreaView className="bg-primary">

        <View className="px-4 py-3 flex-row items-center justify-between">

          {/* MENÚ */}
          <TouchableOpacity onPress={() => setOpenDrawer(true)}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>

          {/* LOGO */}
          <Image
            source={require('../assets/images/logotamblanco_ft.png')}
            className="w-20 h-8"
            resizeMode="contain"
          />

          {/* CARRITO */}
          <TouchableOpacity onPress={() => router.push('/')}>
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>

        </View>

      </SafeAreaView>

      {/* DRAWER (NO SE TOCA) */}
      <DrawerMenu
        visible={openDrawer}
        onClose={() => setOpenDrawer(false)}
      />
    </>
  )
}
    
export default Header