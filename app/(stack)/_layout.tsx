import React from 'react'
import { Stack } from 'expo-router'

import Header from '../../components/Header'
import BottomTab from '../../components/BottomTab'

const StackLayout = () => {
  return (
    <>
        <Header />

        <Stack 
            screenOptions={{
                headerShown: false,
                contentStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            
            <Stack.Screen
                name='home/index'    
            />

            <Stack.Screen
                name='products/index'
            />

            <Stack.Screen
                name='products/[id]'
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name='profile/index'
            />

            <Stack.Screen
                name='setting/index'            
            />

        </Stack>
        <BottomTab />
    </>
  )
}

export default StackLayout