import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { MockProduct } from '../../../constants/mockProducts'
import { getComputadores } from '../../../services/productService'

// Criterios de rendimiento para computadores
const puntajeComputador = (p: MockProduct): number => {
  let puntos = 0
  const basicas = p.caracteristicas_basicas?.toLowerCase() || ''
  const tecnicas = p.caracteristicas_tecnicas?.toLowerCase() || ''
  const todo = basicas + tecnicas

  if (todo.includes('intel core i9')) puntos += 50
  else if (todo.includes('intel core i7')) puntos += 35
  else if (todo.includes('intel core i5')) puntos += 20
  else if (todo.includes('intel core i3')) puntos += 10

  if (todo.includes('32gb')) puntos += 40
  else if (todo.includes('16gb')) puntos += 25
  else if (todo.includes('8gb')) puntos += 12

  if (todo.includes('1tb')) puntos += 20
  else if (todo.includes('512gb')) puntos += 12
  else if (todo.includes('256gb')) puntos += 8

  if (todo.includes('rtx 4070')) puntos += 18
  else if (todo.includes('rtx 4060')) puntos += 12
  else if (todo.includes('rtx 3060')) puntos += 10

  if (todo.includes('144hz')) puntos += 10
  else if (todo.includes('120hz')) puntos += 7
  else if (todo.includes('90hz')) puntos += 5

  return puntos
}

const parsearCaracteristicas = (texto: string): Record<string, string> => {
  if (!texto) return {}
  const obj: Record<string, string> = {}
  texto.split('\n').forEach(linea => {
    const partes = linea.split(':')
    if (partes.length >= 2) {
      const key = partes[0].trim()
      const value = partes.slice(1).join(':').trim()
      if (key && value) obj[key] = value
    }
  })
  return obj
}

const esMejor = (titulo: string, valor1: string, valor2: string): 1 | 2 | 0 => {
  if (valor1 === '-' || valor2 === '-') return 0

  if (titulo.toLowerCase().includes('procesador') || titulo.toLowerCase().includes('core')) {
    const orden = ['i3', 'i5', 'i7', 'i9']
    const idx1 = orden.findIndex(p => valor1.toLowerCase().includes(p))
    const idx2 = orden.findIndex(p => valor2.toLowerCase().includes(p))
    if (idx1 > idx2) return 1
    if (idx2 > idx1) return 2
  }

  if (titulo.toLowerCase().includes('ram') || titulo.toLowerCase().includes('memoria')) {
    const num1 = parseInt(valor1)
    const num2 = parseInt(valor2)
    if (!isNaN(num1) && !isNaN(num2)) {
      if (num1 > num2) return 1
      if (num2 > num1) return 2
    }
  }

  if (titulo.toLowerCase().includes('almacenamiento') || titulo.toLowerCase().includes('ssd')) {
    const extractSize = (val: string) => {
      if (val.toLowerCase().includes('1tb')) return 1024
      if (val.toLowerCase().includes('512gb')) return 512
      if (val.toLowerCase().includes('256gb')) return 256
      return 0
    }
    const size1 = extractSize(valor1)
    const size2 = extractSize(valor2)
    if (size1 > size2) return 1
    if (size2 > size1) return 2
  }

  if (titulo.toLowerCase().includes('tarjeta gráfica') || titulo.toLowerCase().includes('rtx')) {
    const orden = ['3060', '3070', '4060', '4070', '4080', '4090']
    const idx1 = orden.findIndex(p => valor1.toLowerCase().includes(p))
    const idx2 = orden.findIndex(p => valor2.toLowerCase().includes(p))
    if (idx1 !== -1 && idx2 !== -1) {
      if (idx1 > idx2) return 1
      if (idx2 > idx1) return 2
    }
  }

  if (titulo.toLowerCase().includes('hz') || titulo.toLowerCase().includes('pantalla')) {
    const num1 = parseInt(valor1)
    const num2 = parseInt(valor2)
    if (!isNaN(num1) && !isNaN(num2)) {
      if (num1 > num2) return 1
      if (num2 > num1) return 2
    }
  }

  return 0
}

const ComputadorCompareScreen = () => {
  const [computadores, setComputadores] = useState<MockProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [product1, setProduct1] = useState<MockProduct | null>(null)
  const [product2, setProduct2] = useState<MockProduct | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [compared, setCompared] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalSlot, setModalSlot] = useState<1 | 2>(1)
  const [pressedItemId, setPressedItemId] = useState<number | null>(null)
  const [comparePressed, setComparePressed] = useState(false)
  const [resetPressed, setResetPressed] = useState(false) // ✅ Nuevo estado para el botón reset

  useEffect(() => {
    const fetchComputadores = async () => {
      const datos = await getComputadores()
      setComputadores(datos)
      setLoading(false)
    }
    fetchComputadores()
  }, [])

  const handleScroll = (event: any) => {
    setLastScrollY(event.nativeEvent.contentOffset.y)
  }

  const filtered = computadores.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) &&
    search.length > 0 &&
    p.id !== product1?.id &&
    p.id !== product2?.id
  )

  const handleSelect = (product: MockProduct) => {
    if (!product1) setProduct1(product)
    else if (!product2) setProduct2(product)
    setSearch('')
    setShowSuggestions(false)
  }

  const handleSelectFromModal = (product: MockProduct) => {
    if (modalSlot === 1) setProduct1(product)
    else setProduct2(product)
    setModalVisible(false)
  }

  const handleComparar = () => {
    if (product1 && product2) setCompared(true)
  }

  const handleReset = () => {
    setProduct1(null)
    setProduct2(null)
    setSearch('')
    setShowSuggestions(false)
    setCompared(false)
  }

  const openModal = (slot: 1 | 2) => {
    setModalSlot(slot)
    setModalVisible(true)
  }

  const puntos1 = product1 ? puntajeComputador(product1) : 0
  const puntos2 = product2 ? puntajeComputador(product2) : 0
  const ganador = compared && product1 && product2
    ? puntos1 >= puntos2 ? product1 : product2
    : null

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#003780" />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* HEADER - SOLO VISIBLE SI NO HA COMPARADO */}
      {!compared && (
        <View>
          <LinearGradient
            colors={['#003780', '#1e6fc5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ paddingTop: 20, paddingHorizontal: 16, paddingBottom: 50 }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: 50,
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}>
              <TextInput
                placeholder="Buscar computador para comparar..."
                placeholderTextColor="#999"
                value={search}
                onChangeText={(t) => { setSearch(t); setShowSuggestions(true) }}
                style={{ flex: 1, fontSize: 14, color: '#333' }}
              />
              <Ionicons name="search" size={20} color="#555" />
            </View>

            {/* LISTA DESPLEGABLE CON EFECTO PRESSED */}
            {showSuggestions && filtered.length > 0 && (
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                marginTop: 6,
                maxHeight: 180,
                overflow: 'hidden',
                elevation: 4,
              }}>
                {filtered.map(p => (
                  <Pressable
                    key={p.id}
                    onPress={() => handleSelect(p)}
                    onPressIn={() => setPressedItemId(p.id)}
                    onPressOut={() => setPressedItemId(null)}
                    style={{ 
                      padding: 12, 
                      borderBottomWidth: 1, 
                      borderBottomColor: '#f0f0f0',
                      backgroundColor: pressedItemId === p.id ? '#C5D8EB' : '#fff',
                    }}
                  >
                    <Text style={{ 
                      fontSize: 13, 
                      color: '#333',
                      fontWeight: pressedItemId === p.id ? '700' : '400'
                    }}>
                      {p.nombre}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#999' }}>{p.marca}</Text>
                  </Pressable>
                ))}
              </View>
            )}

            {/* BOTÓN COMPARAR CON EFECTO PRESSED */}
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Pressable 
                onPress={handleComparar} 
                disabled={!product1 || !product2}
                onPressIn={() => setComparePressed(true)}
                onPressOut={() => setComparePressed(false)}
                style={{
                  opacity: comparePressed ? 0.8 : 1,
                  transform: [{ scale: comparePressed ? 0.96 : 1 }],
                }}
              >
                <LinearGradient
                  colors={product1 && product2 ? ['#00D4FF', '#0088FF'] : ['#888', '#666']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ 
                    paddingHorizontal: 40, 
                    paddingVertical: 10, 
                    borderRadius: 50,
                    opacity: comparePressed ? 0.85 : 1,
                  }}
                >
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Comparar</Text>
                </LinearGradient>
              </Pressable>
            </View>
          </LinearGradient>

          <View style={{ backgroundColor: '#1e6fc5', height: 40 }}>
            <View style={{
              backgroundColor: '#fff',
              height: 40,
              borderTopLeftRadius: 999,
              borderTopRightRadius: 999,
            }} />
          </View>
        </View>
      )}

      {/* SCROLLVIEW PRINCIPAL */}
      <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={16}>
        <ImageBackground
          source={require('../../../assets/images/vs.jpeg')}
          style={{ flex: 1, minHeight: 400 }}
          imageStyle={{ opacity: 0.07 }}
          resizeMode="cover"
        >

          {product1 && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: 30,
              paddingHorizontal: 16,
            }}>
              <Pressable onPress={() => openModal(1)} style={{ alignItems: 'center', width: 120 }}>
                <View style={{
                  width: 100, height: 100, borderRadius: 50,
                  borderWidth: 2, borderColor: '#ccc',
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#f5f5f5', overflow: 'hidden',
                }}>
                  {product1.imagen ? (
                    <Image 
                      source={{ uri: product1.imagen }} 
                      style={{ width: 90, height: 90 }} 
                      resizeMode="contain" 
                    />
                  ) : (
                    <View style={{ width: 90, height: 90, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="image-outline" size={40} color="#999" />
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 8, textAlign: 'center', color: '#333' }}>
                  Dispositivo No.1
                </Text>
                <Text style={{ fontSize: 11, color: '#999', textAlign: 'center' }}>{product1.nombre}</Text>
              </Pressable>

              <View style={{
                width: 44, height: 44, borderRadius: 22,
                backgroundColor: '#fff', borderWidth: 2, borderColor: '#EC4AAE',
                alignItems: 'center', justifyContent: 'center', elevation: 3,
              }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#EC4AAE' }}>VS</Text>
              </View>

              <Pressable onPress={() => openModal(2)} style={{ alignItems: 'center', width: 120 }}>
                <View style={{
                  width: 100, height: 100, borderRadius: 50,
                  borderWidth: 2, borderColor: '#ccc',
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#f5f5f5', overflow: 'hidden',
                }}>
                  {product2 ? (
                    product2.imagen ? (
                      <Image 
                        source={{ uri: product2.imagen }} 
                        style={{ width: 90, height: 90 }} 
                        resizeMode="contain" 
                      />
                    ) : (
                      <View style={{ width: 90, height: 90, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="image-outline" size={40} color="#999" />
                      </View>
                    )
                  ) : (
                    <Text style={{ fontSize: 32, color: '#aaa' }}>+</Text>
                  )}
                </View>
                <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 8, textAlign: 'center', color: '#333' }}>
                  Dispositivo No.2
                </Text>
                <Text style={{ fontSize: 11, color: '#999', textAlign: 'center' }}>
                  {product2 ? product2.nombre : 'Ingresa un dispositivo'}
                </Text>
              </Pressable>
            </View>
          )}

          {compared && product1 && product2 && (
            <View style={{ paddingHorizontal: 16, paddingBottom: 100 }}>

              {(() => {
                const basicas1 = parsearCaracteristicas(product1.caracteristicas_basicas || '')
                const tecnicas1 = parsearCaracteristicas(product1.caracteristicas_tecnicas || '')
                const basicas2 = parsearCaracteristicas(product2.caracteristicas_basicas || '')
                const tecnicas2 = parsearCaracteristicas(product2.caracteristicas_tecnicas || '')

                const specs1: Record<string, string> = { 
                  ...basicas1, 
                  ...tecnicas1, 
                  Precio: `$${product1.precio.toLocaleString('es-CO')}` 
                }
                const specs2: Record<string, string> = { 
                  ...basicas2, 
                  ...tecnicas2, 
                  Precio: `$${product2.precio.toLocaleString('es-CO')}` 
                }

                const todasLasKeys = Array.from(new Set([...Object.keys(specs1), ...Object.keys(specs2)]))

                const ordenPreferido = [
                  'sistema operativo', 'procesador', 'core', 'ram', 'memoria', 
                  'almacenamiento', 'ssd', 'pantalla', 'tarjeta gráfica', 'rtx', 
                  'batería', 'bateria', 'conectividad', 'bluetooth', 'wifi', 'precio'
                ]
                
                todasLasKeys.sort((a, b) => {
                  const lowerA = a.toLowerCase()
                  const lowerB = b.toLowerCase()
                  const idxA = ordenPreferido.findIndex(k => lowerA.includes(k))
                  const idxB = ordenPreferido.findIndex(k => lowerB.includes(k))
                  
                  if (idxA === -1 && idxB === -1) return a.localeCompare(b)
                  if (idxA === -1) return 1
                  if (idxB === -1) return -1
                  return idxA - idxB
                })

                return todasLasKeys.map((titulo) => {
                  const valor1 = specs1[titulo] || '-'
                  const valor2 = specs2[titulo] || '-'

                  if (valor1 === '-' && valor2 === '-') return null

                  const mejor = esMejor(titulo, valor1, valor2)
                  const es1Mejor = mejor === 1
                  const es2Mejor = mejor === 2

                  return (
                    <View key={titulo} style={{ marginBottom: 10 }}>
                      <View style={{
                        backgroundColor: '#1B3A8C',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        paddingVertical: 6,
                        alignItems: 'center',
                      }}>
                        <Text style={{ 
                          color: '#fff', 
                          fontWeight: '700', 
                          fontSize: 13, 
                          textTransform: 'capitalize' 
                        }}>
                          {titulo}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{
                          flex: 1,
                          backgroundColor: es1Mejor ? '#e8f5e9' : '#fff',
                          borderBottomLeftRadius: 8,
                          borderWidth: 1,
                          borderColor: es1Mejor ? '#4caf50' : '#e0e0e0',
                          padding: 10,
                          alignItems: 'center',
                          borderLeftWidth: es1Mejor ? 3 : 1,
                          borderLeftColor: es1Mejor ? '#4caf50' : '#e0e0e0',
                        }}>
                          <Text style={{ 
                            fontSize: 13, 
                            color: '#333', 
                            fontWeight: es1Mejor ? '700' : '400',
                            textAlign: 'center'
                          }}>
                            {valor1}
                          </Text>
                        </View>
                        <View style={{
                          flex: 1,
                          backgroundColor: es2Mejor ? '#e8f5e9' : '#fff',
                          borderBottomRightRadius: 8,
                          borderWidth: 1,
                          borderLeftWidth: 0,
                          borderColor: es2Mejor ? '#4caf50' : '#e0e0e0',
                          padding: 10,
                          alignItems: 'center',
                          borderRightWidth: es2Mejor ? 3 : 1,
                          borderRightColor: es2Mejor ? '#4caf50' : '#e0e0e0',
                        }}>
                          <Text style={{ 
                            fontSize: 13, 
                            color: '#333', 
                            fontWeight: es2Mejor ? '700' : '400',
                            textAlign: 'center'
                          }}>
                            {valor2}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
                }).filter(Boolean)
              })()}

              {ganador && (
                <View style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 8,
                  borderWidth: 2,
                  borderColor: '#F4CE14',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontWeight: '700', fontSize: 14, color: '#333' }}>🏆 Mejor rendimiento</Text>
                  <Text style={{ color: '#1B3A8C', fontWeight: '700', marginTop: 4 }}>{ganador.marca}</Text>
                  <Text style={{ color: '#555', marginTop: 2 }}>{ganador.nombre}</Text>
                  <Text style={{ color: '#888', fontSize: 11, marginTop: 4 }}>
                    Puntuación: {ganador.id === product1.id ? puntos1 : puntos2} pts
                  </Text>
                </View>
              )}

            </View>
          )}

        </ImageBackground>
      </ScrollView>

      {/* MODAL DE DISPOSITIVOS */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '80%' }}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#333' }}>Selecciona un dispositivo</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </Pressable>
            </View>
            <FlatList
              data={computadores.filter(p => p.id !== product1?.id && p.id !== product2?.id)}
              keyExtractor={p => p.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleSelectFromModal(item)}
                  onPressIn={() => setPressedItemId(item.id)}
                  onPressOut={() => setPressedItemId(null)}
                  style={{
                    padding: 16, 
                    borderBottomWidth: 1, 
                    borderBottomColor: '#f0f0f0',
                    backgroundColor: pressedItemId === item.id ? '#C5D8EB' : '#fff'
                  }}
                >
                  <Text style={{ 
                    fontSize: 14, 
                    fontWeight: pressedItemId === item.id ? '700' : '600', 
                    color: '#333' 
                  }}>
                    {item.nombre}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                    {item.marca}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* ✅ BOTÓN FLOTANTE DE RESET - CON EFECTO PRESSED VISIBLE */}
      {compared && (
        <View style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          zIndex: 1000,
        }}>
          <Pressable
            onPress={handleReset}
            onPressIn={() => setResetPressed(true)}
            onPressOut={() => setResetPressed(false)}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 8,
              transform: [{ scale: resetPressed ? 0.9 : 1 }], // ✅ Se encoge al presionar
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
            }}
          >
            <LinearGradient
              colors={resetPressed ? ['#001f4d', '#145299'] : ['#003780', '#1e6fc5']} // ✅ Cambia a azul oscuro al presionar
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="refresh" size={28} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>
      )}

    </View>
  )
}

export default ComputadorCompareScreen