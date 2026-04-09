import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
    children: string;
    color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';

    variant? : 'contained' | 'text-only';
    className?: string;
}

const CustomButton = ({children, color='primary', onPress, onLongPress, variant='contained', className}:Props) => {
  const btnColor = {
    primary:'bg-primary',
    secondary: 'bg-secondary',
    tertiary:'bg-tertiary',
    quaternary:'bg-quaternary'
  }[color]

  const txtColor = {
    primary:'text-tertiary',
    secondary: 'text-tertiary',
    tertiary:'text-primary',
    quaternary:'text-quaternary'
  }[color]

  if(variant === 'text-only'){
    return (
      <Pressable
          className={`p-3 active:opacity-90 ${className}`}
          onPress={onPress}
          onLongPress={onLongPress}
      >
          <Text className={`text-center ${txtColor}`}>{children}</Text>
      </Pressable>
    )
  } 

  return (
    <Pressable
        className={`p-3 rounded-xl shadow-md ${btnColor} active:opacity-90 ${className}`}
        onPress={onPress}
        onLongPress={onLongPress}
    >
        <Text className={`text-center ${txtColor}`}>{children}</Text>
    </Pressable>
  )
}

export default CustomButton