import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import { MockProduct, mockProducts } from '../../../constants/mockProducts'

const CompareScreen = () => {
  const [search, setSearch] = useState('')
  const [product1, setProduct1] = useState<MockProduct | null>(null)
  const [product2, setProduct2] = useState<MockProduct | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [compared, setCompared] = useState(false)

  const filtered = mockProducts.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) &&
    search.length > 0 &&
    p.id !== product1?.id &&
    p.id !== product2?.id
  )

  const handleSelect = (product: MockProduct) => {
    if (!product1) {
      setProduct1(product)
    } else if (!product2) {
      setProduct2(product)
    }
    setSearch('')
    setShowSuggestions(false)
    setCompared(false)
  }

  const handleComparar = () => {
    if (product1 && product2) setCompared(true)
  }

  const ganador = compared && product1 && product2
    ? product1.precio < product2.precio ? product1 : product2
    : null

  const resetSlot = (slot: 1 | 2) => {
    if (slot === 1) setProduct1(null)
    else setProduct2(null)
    setCompared(false)
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
          {/* BARRA DE BÚSQUEDA */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            borderRadius: 50,
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}>
            <TextInput
              placeholder="Buscar producto para comparar..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={(t) => { setSearch(t); setShowSuggestions(true) }}
              style={{ flex: 1, fontSize: 14, color: '#333' }}
            />
            <Ionicons name="search" size={20} color="#555" />
          </View>

          {/* SUGERENCIAS */}
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
                  style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' }}
                >
                  <Text style={{ fontSize: 13, color: '#333' }}>{p.nombre}</Text>
                  <Text style={{ fontSize: 11, color: '#999' }}>{p.marca}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* BOTÓN COMPARAR */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Pressable onPress={handleComparar} disabled={!product1 || !product2}>
              <LinearGradient
                colors={product1 && product2 ? ['#F4CE14', '#EC4AAE'] : ['#888', '#666']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ paddingHorizontal: 40, paddingVertical: 10, borderRadius: 50 }}
              >
                <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Comparar</Text>
              </LinearGradient>
            </Pressable>
          </View>

        </LinearGradient>

        {/* OLA */}
        <View style={{
          backgroundColor: '#1e6fc5',
          height: 40,
        }}>
          <View style={{
            backgroundColor: '#fff',
            height: 40,
            borderTopLeftRadius: 999,
            borderTopRightRadius: 999,
          }} />
        </View>
      </View>

      {/* CUERPO */}
      <ScrollView style={{ flex: 1 }}>
        <ImageBackground
          source={require('../../../assets/images/vs.jpeg')}
          style={{ flex: 1, minHeight: 400 }}
          imageStyle={{ opacity: 0.07 }}
          resizeMode="cover"
        >

          {/* SECCIÓN VS — solo aparece si hay al menos un producto seleccionado */}
          {product1 && (
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingVertical: 30,
              paddingHorizontal: 16,
            }}>

              {/* SLOT 1 */}
              <Pressable onPress={() => resetSlot(1)} style={{ alignItems: 'center', width: 120 }}>
                <View style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#ccc',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  overflow: 'hidden',
                }}>
                  <Image source={product1.imagenLocal} style={{ width: 90, height: 90 }} resizeMode="contain" />
                </View>
                <Text style={{ fontSize: 12, fontWeight: '600', marginTop: 8, textAlign: 'center', color: '#333' }}>
                  Dispositivo No.1
                </Text>
                <Text style={{ fontSize: 11, color: '#999', textAlign: 'center' }}>{product1.nombre}</Text>
              </Pressable>

              {/* VS */}
              <View style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#fff',
                borderWidth: 2,
                borderColor: '#EC4AAE',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 3,
              }}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#EC4AAE' }}>VS</Text>
              </View>

              {/* SLOT 2 */}
              <Pressable onPress={() => resetSlot(2)} style={{ alignItems: 'center', width: 120 }}>
                <View style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#ccc',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  overflow: 'hidden',
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

          {/* RESULTADO COMPARACIÓN */}
          {compared && product1 && product2 && (
            <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>

              <View style={{ flexDirection: 'row' }}>

                {/* PRODUCTO 1 */}
                <View style={{ flex: 1, paddingRight: 6 }}>
                  <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 12,
                    elevation: 2,
                    borderWidth: ganador?.id === product1.id ? 2 : 0,
                    borderColor: '#F4CE14',
                  }}>
                    {ganador?.id === product1.id && (
                      <Text style={{ fontSize: 11, color: '#F4CE14', fontWeight: '700', marginBottom: 4 }}>⭐ Mejor precio</Text>
                    )}
                    {[
                      ...(product1.caracteristicas_basicas?.split('\n') || []),
                      ...(product1.caracteristicas_tecnicas?.split('\n') || [])
                    ].map((item, i) => (
                      <Text key={i} style={{ fontSize: 11, marginBottom: 4, color: '#444' }}>{item}</Text>
                    ))}
                    <Text style={{ marginTop: 8, fontWeight: 'bold', color: '#16a34a' }}>
                      ${product1.precio.toLocaleString('es-CO')}
                    </Text>
                  </View>
                </View>

                {/* PRODUCTO 2 */}
                <View style={{ flex: 1, paddingLeft: 6 }}>
                  <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 12,
                    padding: 12,
                    elevation: 2,
                    borderWidth: ganador?.id === product2.id ? 2 : 0,
                    borderColor: '#F4CE14',
                  }}>
                    {ganador?.id === product2.id && (
                      <Text style={{ fontSize: 11, color: '#F4CE14', fontWeight: '700', marginBottom: 4 }}>⭐ Mejor precio</Text>
                    )}
                    {[
                      ...(product2.caracteristicas_basicas?.split('\n') || []),
                      ...(product2.caracteristicas_tecnicas?.split('\n') || [])
                    ].map((item, i) => (
                      <Text key={i} style={{ fontSize: 11, marginBottom: 4, color: '#444' }}>{item}</Text>
                    ))}
                    <Text style={{ marginTop: 8, fontWeight: 'bold', color: '#16a34a', textAlign: 'right' }}>
                      ${product2.precio.toLocaleString('es-CO')}
                    </Text>
                  </View>
                </View>

              </View>

              {/* GANADOR */}
              {ganador && (
                <View style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 16,
                  borderWidth: 2,
                  borderColor: '#F4CE14',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontWeight: '700', fontSize: 14, color: '#333' }}>🏆 Ganador por precio</Text>
                  <Text style={{ color: '#1B3A8C', fontWeight: '700', marginTop: 4 }}>{ganador.marca}</Text>
                  <Text style={{ color: '#555', marginTop: 2 }}>{ganador.nombre}</Text>
                  <Text style={{ color: '#16a34a', fontWeight: '700', marginTop: 4 }}>
                    ${ganador.precio.toLocaleString('es-CO')}
                  </Text>
                </View>
              )}

            </View>
          )}

        </ImageBackground>
      </ScrollView>

    </View>
  ) 
}

export default CompareScreen




