import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Pressable, Animated, Dimensions, Image } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const SCREEN_WIDTH = Dimensions.get('window').width

interface Props {
  visible: boolean
  onClose: () => void
}


const DrawerMenu = ({ visible, onClose }: Props) => {
    // Estado para controlar la ANIMACIÓN y VISIBILIDAD del drawer
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current
    const [show, setShow] = React.useState(visible)
    // Estados para controlar la PERTURA de submenús
    const [openComputadores, setOpenComputadores] = useState(false)
    const [openMoviles, setOpenMoviles] = useState(false)
    const [openAccesorios, setOpenAccesorios] = useState(false)
    const [openConsolas, setOpenConsolas] = useState(false)
    const [openCamaras, setOpenCamaras] = useState(false)

    useEffect(() => {
        if (visible) {
    setShow(true)
        Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }).start()
    } else {
        Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH,
        duration: 300,
        useNativeDriver: true,
        }).start(() => setShow(false))
    }
    }, [visible])

    if (!show) return null

    return (
        <View className="absolute top-0 left-0 w-full h-full z-50" style={{ elevation: 50 }}>
            
            {/* OVERLAY */}
            <Pressable 
                className="absolute w-full h-full bg-black/50"
                onPress={onClose}
            />

            {/* DRAWER ANIMADO */}
            <Animated.View
                style={{
                transform: [{ translateX }],
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0
                }}
                className="w-64 bg-primary h-full p-4"
            >

                {/* HEADER */}
                <View className="bg-primary py-6 items-center rounded-lg mb-4">
                    <Image source={require('../assets/images/logotamblanco_ft.png')} className='w-20 h-8' resizeMode="contain" />
                </View>

                {/* HOME */}
                <Pressable 
                onPress={() => {
                    router.push('/')
                    onClose()
                }}
                >
                    {({ pressed }) => (
                        <View
                            className="flex-row items-center py-3"
                            style={{ opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }] 
                            }}
                            >
                            <Ionicons name="home-outline" size={20} color="white" />
                            <Text className="ml-3 text-tertiary text-[18px]">
                                Inicio
                            </Text>
                        </View>
                    )}
                </Pressable>

                {/* LOGIN */}
                <Pressable
                onPress={() => {
                    router.push('/(auth)/login')
                    onClose()
                }}>
                    {({ pressed }) => (
                        <View
                            className="flex-row items-center py-3"
                            style={{ opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }] 
                            }}
                            >
                            <Ionicons name="person-outline" size={20} color="white" />
                            <Text className="ml-3 text-tertiary text-[18px]">Iniciar sesión</Text>
                        </View>
                    )}
                    
                </Pressable>

                {/* LINEA DIVISORA */}
                <View style={{ borderTopWidth: 1, borderTopColor: 'white', marginVertical: 16 }} />  
                {/* <View className="border-t color-tertiary my-4" /> /> */}

                {/* CATEGORÍAS */}
                <Text className="text-tertiary text-[18px] font-semibold mb-4">Categorías</Text>

                {/* COMPUTADORES */}
                <Pressable 
                onPress={() => {
                    setOpenComputadores(!openComputadores) 
                    setOpenMoviles(false) 
                    setOpenAccesorios(false) 
                    setOpenConsolas(false) 
                    setOpenCamaras(false)
                }}
                >
                    {({ pressed }) => (
                        <View
                        className="flex-row justify-between items-center py-3"
                        style={{
                            opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }]
                        }}
                        >
                        <Text className="text-tertiary text-[18px]">
                            Computadores
                        </Text>

                        <Ionicons 
                            name={openComputadores ? "chevron-up" : "chevron-down"} 
                            size={20} 
                            color="white" 
                        />
                        </View>
                    )}
                </Pressable>
                    
                {/* SUBMENÚ COMPUTADORES */}
                {openComputadores && (
                    <View className="ml-4 mt-1">
                        <Pressable 
                            onPress={() => {
                                router.push({
                                pathname: '/(stack)/products',
                                params: { subcategoria_id: 7 }
                                })
                                onClose()
                            }}    
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px]">
                                    PC Escritorio
                                </Text>
                                </View>
                            )}
                        </Pressable>
                        <Pressable 
                        onPress={() => {
                            router.push({
                            pathname: '/(stack)/products',
                            params: { subcategoria_id: 2 }
                            })
                            onClose()
                        }} 
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px]">
                                    Pórtatil
                                </Text>
                                </View>
                            )}
                        </Pressable>
                        <Pressable
                        onPress={() => {
                            router.push({
                            pathname: '/(stack)/products',
                            params: { type: 'cpu' }
                            })
                            onClose()
                        }} 
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px]">
                                    CPU
                                </Text>
                                </View>
                            )}
                        </Pressable>
                        <Pressable
                        onPress={() => {
                            router.push({
                            pathname: '/(stack)/products',
                            params: { subcategoria_id: 6 }
                            })
                            onClose()
                        }} 
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px]">
                                    Accesorio
                                </Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                )}

                {/* MÓVILES */}
                <Pressable 
                onPress={() => {
                    
                    setOpenMoviles(!openMoviles)
                    setOpenComputadores(false)
                    setOpenAccesorios(false) 
                    setOpenConsolas(false) 
                    setOpenCamaras(false)
                }}
                >
                    {({ pressed }) => (
                        <View
                        className="flex-row justify-between items-center py-3"
                        style={{
                            opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }]
                        }}
                        >
                        <Text className="text-tertiary text-[18px]">Móviles</Text>
                        <Ionicons 
                            name={openMoviles ? "chevron-up" : "chevron-down"} 
                            size={18} 
                            color="white" 
                        />
                        </View>
                    )}
                    
                </Pressable>
                {/* SUBMENÚ MÓVILES */}
                {openMoviles && (
                    <View className="ml-4 mt-1">
                        <Pressable 
                        onPress={() => {
                            router.push({
                            pathname: '/(stack)/products',
                            params: { subcategoria_id: 4 }
                            })
                            onClose()
                        }}
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px] py-1">Celulares</Text>
                                </View>
                            )}
                        </Pressable>
                        <Pressable
                        onPress={() => {
                            router.push({
                            pathname: '/(stack)/products',
                            params: { type: 'tablet' }
                            })
                            onClose()
                        }}   
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px] py-1">Tabletas</Text>
                                </View>
                            )}
                        </Pressable>
                        <Pressable
                        onPress={() => {
                            router.push({
                            pathname: '/(stack)/products',
                            params: { type: 'accesorios' }
                            })
                            onClose()
                        }}      
                        >
                            {({ pressed }) => (
                                <View
                                className="py-2"
                                style={{
                                    opacity: pressed ? 0.5 : 1,
                                    transform: [{ scale: pressed ? 0.97 : 1 }]
                                }}
                                >
                                <Text className="text-tertiary text-[16px] py-1">Accesorios</Text>
                                </View>
                            )}
                        
                        </Pressable>
                    </View>
                )}

                {/* ACCESORIOS */}
                <Pressable
                onPress={() => {
                    setOpenAccesorios(!openAccesorios)
                    setOpenComputadores(false)
                    setOpenMoviles(false) 
                    setOpenConsolas(false) 
                    setOpenCamaras(false)
                }}
                >
                    {({ pressed }) => (
                        <View
                        className="flex-row justify-between items-center py-3"
                        style={{
                            opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }]
                        }}
                        >
                        <Text className="text-tertiary text-[18px]">Accesorios</Text>
                        <Ionicons 
                            name={openAccesorios ? "chevron-up" : "chevron-down"} 
                            size={18} 
                            color="white" 
                        />
                        </View>
                    )}
                    
                </Pressable>
                {/* SUBMENÚ ACCESORIOS */}
                {openAccesorios && (
                <View className="ml-4 mt-1">
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'audifonos' }
                        })
                        onClose()
                    }} >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Audifonos</Text>
                            </View>
                        )}
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { subcategoria_id: 6 }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Teclado</Text>
                            </View>
                        )}
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { subcategoria_id: 6 }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Mouse</Text>    
                            </View>
                        )}              
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'usb' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">USB</Text>
                            </View>
                        )}
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'videojuegos' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">VideoJuegos</Text>  
                            </View>
                        )} 
                    
                    </Pressable>
                </View>
                )}

                {/* CONSOLAS */}
                <Pressable
                onPress={() => {
                    setOpenConsolas(!openConsolas)
                    setOpenComputadores(false)
                    setOpenMoviles(false) 
                    setOpenAccesorios(false) 
                    setOpenCamaras(false)
                }}
                >
                    {({ pressed }) => (
                        <View
                        className="flex-row justify-between items-center py-3"
                        style={{
                            opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }]
                        }}
                        >
                        <Text className="text-tertiary text-[18px]">Consolas</Text>
                        <Ionicons 
                            name={openConsolas ? "chevron-up" : "chevron-down"} 
                            size={18} 
                            color="white" 
                        />  
                        </View>
                    )}
                    
                </Pressable>
                {/* SUBMENÚ CONSOLAS */}
                {openConsolas && (
                <View className="ml-4 mt-1">
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { subcategoria_id: 1, marca: 'xbox' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">XBOX</Text>
                            </View>
                        )} 
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { subcategoria_id: 1, marca: 'playstation' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Playstation</Text>
                            </View>
                        )} 
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { subcategoria_id: 1, marca: 'nintendo' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Nintendo</Text>
                            </View>
                        )} 
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'accesorios' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Accesorios</Text>
                            </View>
                        )} 
                    </Pressable>
                </View>
                )}

                {/* CÁMARAS*/}
                <Pressable
                onPress={() => {
                    setOpenCamaras(!openCamaras)
                    setOpenComputadores(false)
                    setOpenMoviles(false) 
                    setOpenAccesorios(false) 
                    setOpenConsolas(false)
                }}
                >
                    {({ pressed }) => (
                        <View
                        className="flex-row justify-between items-center py-3"
                        style={{
                            opacity: pressed ? 0.5 : 1,
                            transform: [{ scale: pressed ? 0.97 : 1 }]
                        }}
                        >
                        <Text className="text-tertiary text-[18px]">
                            Cámaras
                        </Text>

                        <Ionicons 
                            name={openComputadores ? "chevron-up" : "chevron-down"} 
                            size={20} 
                            color="white" 
                        />
                        </View>
                    )}
                </Pressable>
                {/* SUBMENÚ CÁMARAS */}
                {openCamaras && (
                <View className="ml-4 mt-1">
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'sony' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Sony</Text>
                            </View>
                        )} 
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'canon' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Canon</Text>
                            </View>
                        )} 
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'nikon' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Nikon</Text>
                            </View>
                        )} 
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { subcategoria_id: 3 }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Insta360</Text>
                            </View>
                        )}
                    </Pressable>
                    <Pressable
                    onPress={() => {
                        router.push({
                        pathname: '/(stack)/products',
                        params: { type: 'accesorios' }
                        })
                        onClose()
                    }} 
                    >
                        {({ pressed }) => (
                            <View
                            className="py-2"
                            style={{
                                opacity: pressed ? 0.5 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }]
                            }}
                            >
                            <Text className="text-tertiary text-[16px] py-1">Accesorios</Text>
                            </View>
                        )}
                    </Pressable>
                </View>
                )}

            </Animated.View>
        </View>
    )
}

export default DrawerMenu