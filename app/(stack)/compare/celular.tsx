import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { MockProduct } from '../../../constants/mockProducts'
import { getCelulares } from '../../../services/productService'

// Criterios de rendimiento para celulares
const puntajeCelular = (p: MockProduct): number => {
  let puntos = 0
  const basicas = p.caracteristicas_basicas?.toLowerCase() || ''
  const tecnicas = p.caracteristicas_tecnicas?.toLowerCase() || ''
  const todo = basicas + tecnicas

  // Procesador (PRIORIDAD ALTA)
  if (todo.includes('snapdragon 8')) puntos += 45
  else if (todo.includes('snapdragon 7')) puntos += 30
  else if (todo.includes('snapdragon 6')) puntos += 15

  // RAM (PRIORIDAD ALTA)
  if (todo.includes('12gb')) puntos += 35
  else if (todo.includes('8gb')) puntos += 22
  else if (todo.includes('6gb')) puntos += 12

  // Almacenamiento
  if (todo.includes('512gb')) puntos += 20
  else if (todo.includes('256gb')) puntos += 12
  else if (todo.includes('128gb')) puntos += 8

  // Pantalla (Hz - rendimiento visual)
  if (todo.includes('144hz')) puntos += 18
  else if (todo.includes('120hz')) puntos += 12
  else if (todo.includes('90hz')) puntos += 8

  // Batería
  if (todo.includes('5000')) puntos += 15
  else if (todo.includes('4500')) puntos += 10
  else if (todo.includes('4000')) puntos += 7

  return puntos
}

const CelularCompareScreen = () => {
  const [celulares, setCelulares] = useState<MockProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [product1, setProduct1] = useState<MockProduct | null>(null)
  const [product2, setProduct2] = useState<MockProduct | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [compared, setCompared] = useState(false)
  const [pressedItemId, setPressedItemId] = useState<number | null>(null)
  const [comparePressed, setComparePressed] = useState(false)
  const [resetPressed, setResetPressed] = useState(false)

  useEffect(() => {
    const fetchCelulares = async () => {
      const datos = await getCelulares()
      setCelulares(datos)
      setLoading(false)
    }
    fetchCelulares()
  }, [])

  const filtered = celulares.filter(p =>
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
    setCompared(false)
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

  const resetSlot = (slot: 1 | 2) => {
    if (slot === 1) setProduct1(null)
    else setProduct2(null)
    setCompared(false)
  }

  const puntos1 = product1 ? puntajeCelular(product1) : 0
  const puntos2 = product2 ? puntajeCelular(product2) : 0
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

      {/* HEADER CON OLA */}
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
              placeholder="Buscar celular para comparar..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={(t) => { setSearch(t); setShowSuggestions(true) }}
              style={{ flex: 1, fontSize: 14, color: '#333' }}
            />
            <Ionicons name="search" size={20} color="#555" />
          </View>

          {/* ✅ LISTA DESPLEGABLE CON EFECTO PRESSED */}
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

          {/* ✅ BOTÓN COMPARAR CON EFECTO PRESSED */}
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

      <ScrollView style={{ flex: 1 }}>
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
              <Pressable onPress={() => resetSlot(1)} style={{ alignItems: 'center', width: 120 }}>
                <View style={{
                  width: 100, height: 100, borderRadius: 50,
                  borderWidth: 2, borderColor: '#ccc',
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#f5f5f5', overflow: 'hidden',
                }}>
                  <Image source={product1.imagenLocal} style={{ width: 90, height: 90 }} resizeMode="contain" />
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

              <Pressable onPress={() => resetSlot(2)} style={{ alignItems: 'center', width: 120 }}>
                <View style={{
                  width: 100, height: 100, borderRadius: 50,
                  borderWidth: 2, borderColor: '#ccc',
                  alignItems: 'center', justifyContent: 'center',
                  backgroundColor: '#f5f5f5', overflow: 'hidden',
                }}>
                  {product2
                    ? <Image source={product2.imagenLocal} style={{ width: 90, height: 90 }} resizeMode="contain" />
                    : <Text style={{ fontSize: 32, color: '#aaa' }}>+</Text>
                  }
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

              {/* TABLITAS */}
                {(() => {
                  const lineas1 = [
                    ...(product1.caracteristicas_basicas?.split('\n') || []),
                    ...(product1.caracteristicas_tecnicas?.split('\n') || []),
                    `Precio: $${product1.precio.toLocaleString('es-CO')}`,
                  ]
                  const lineas2 = [
                    ...(product2.caracteristicas_basicas?.split('\n') || []),
                    ...(product2.caracteristicas_tecnicas?.split('\n') || []),
                    `Precio: $${product2.precio.toLocaleString('es-CO')}`,
                  ]

                  const esMejor = (titulo: string, valor1: string, valor2: string): 1 | 2 | 0 => {
                    if (titulo.toLowerCase().includes('procesador')) {
                      const orden = ['snapdragon 6', 'snapdragon 7', 'snapdragon 8']
                      const idx1 = orden.findIndex(p => valor1.toLowerCase().includes(p))
                      const idx2 = orden.findIndex(p => valor2.toLowerCase().includes(p))
                      if (idx1 > idx2 && idx1 !== -1) return 1
                      if (idx2 > idx1 && idx2 !== -1) return 2
                    }

                    if (titulo.toLowerCase().includes('ram') || titulo.toLowerCase().includes('memoria')) {
                      const num1 = parseInt(valor1)
                      const num2 = parseInt(valor2)
                      if (num1 > num2) return 1
                      if (num2 > num1) return 2
                    }

                    if (titulo.toLowerCase().includes('almacenamiento')) {
                      const extractSize = (val: string) => {
                        if (val.includes('512gb')) return 512
                        if (val.includes('256gb')) return 256
                        if (val.includes('128gb')) return 128
                        return 0
                      }
                      const size1 = extractSize(valor1)
                      const size2 = extractSize(valor2)
                      if (size1 > size2) return 1
                      if (size2 > size1) return 2
                    }

                    if (titulo.toLowerCase().includes('hz') || titulo.toLowerCase().includes('pantalla')) {
                      const num1 = parseInt(valor1)
                      const num2 = parseInt(valor2)
                      if (num1 > num2) return 1
                      if (num2 > num1) return 2
                    }

                    if (titulo.toLowerCase().includes('batería')) {
                      const num1 = parseInt(valor1)
                      const num2 = parseInt(valor2)
                      if (num1 > num2) return 1
                      if (num2 > num1) return 2
                    }

                    return 0
                  }

                  return lineas1.map((linea, i) => {
                    const partes = linea.split(':')
                    const titulo = partes[0].trim()
                    const valor1 = partes.slice(1).join(':').trim()
                    const valor2 = lineas2[i]?.split(':').slice(1).join(':').trim() ?? '-'

                    const mejor = esMejor(titulo, valor1, valor2)
                    const es1Mejor = mejor === 1
                    const es2Mejor = mejor === 2

                    return (
                      <View key={i} style={{ marginBottom: 10 }}>
                        <View style={{
                          backgroundColor: '#1B3A8C',
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          paddingVertical: 6,
                          alignItems: 'center',
                        }}>
                          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>{titulo}</Text>
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
                              {valor1 || '-'}
                              {es1Mejor ? ' ⭐' : ''}
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
                              {valor2 || '-'}
                              {es2Mejor ? ' ⭐' : ''}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )
                  })
                })()}

              {/* GANADOR */}
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

      {/* ✅ BOTÓN FLOTANTE DE RESET - CON EFECTO PRESSED */}
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
              transform: [{ scale: resetPressed ? 0.9 : 1 }],
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 5,
            }}
          >
            <LinearGradient
              colors={resetPressed ? ['#001f4d', '#145299'] : ['#003780', '#1e6fc5']}
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

export default CelularCompareScreen