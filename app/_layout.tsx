// rnfe snippe
import React, { useEffect } from 'react'
import { useFonts } from 'expo-font';
import { Slot, SplashScreen } from 'expo-router';
import "./global.css";
import { CompareProvider } from '../context/CompareContext'
import { AuthProvider } from '../context/AuthContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync(); //Prevenir que el splash screen se quite automaticamente.

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf')
  }); 
    

  useEffect(() => {
    if (error) return
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded) return null // Si hay error no deberia retornar el Slot.
  
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CompareProvider> 
          <Slot /> 
        </CompareProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default RootLayout