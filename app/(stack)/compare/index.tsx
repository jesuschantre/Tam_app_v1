import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { MockProduct, mockProducts } from '../../../constants/mockProducts'

const CompareScreen = () => {

  const [search1, setSearch1] = useState('')
  const [search2, setSearch2] = useState('')
  const [product1, setProduct1] = useState<MockProduct | null>(null)
  const [product2, setProduct2] = useState<MockProduct | null>(null)
  const [showSuggestions1, setShowSuggestions1] = useState(false)
  const [showSuggestions2, setShowSuggestions2] = useState(false)
  const [compared, setCompared] = useState(false)

  const filtered1 = mockProducts.filter(p =>
    p.nombre.toLowerCase().includes(search1.toLowerCase()) && search1.length > 0
  )

  const filtered2 = mockProducts.filter(p =>
    p.nombre.toLowerCase().includes(search2.toLowerCase()) && search2.length > 0
  )

  const handleComparar = () => {
    if (product1 && product2) setCompared(true)
  }

  const ganador = compared && product1 && product2
    ? product1.precio < product2.precio ? product1 : product2
    : null

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* HEADER */}
      <LinearGradient
        colors={['#003780', '#1e90ff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ paddingTop: 16, paddingBottom: 64, paddingHorizontal: 16 }}
      >

        {/* INPUT 1 */}
        <View style={{ backgroundColor: '#f0f0f0', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 12 }}>
          <TextInput
            placeholder="Buscar producto para comparar..."
            value={search1}
            onChangeText={(t) => { setSearch1(t); setShowSuggestions1(true); setCompared(false) }}
          />
        </View>

        {/* SUGERENCIAS 1 */}
        {showSuggestions1 && filtered1.length > 0 && (
          <View style={{ backgroundColor: '#fff', borderRadius: 8, marginTop: 4, maxHeight: 150 }}>
            {filtered1.map(p => (
              <Pressable
                key={p.id}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                onPress={() => { setProduct1(p); setSearch1(p.nombre); setShowSuggestions1(false) }}
              >
                <Text style={{ fontSize: 13 }}>{p.nombre}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* VS */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
          <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.4)' }} />
          <Text style={{ marginHorizontal: 12, color: '#fff', fontWeight: '600' }}>VS</Text>
          <View style={{ flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.4)' }} />
        </View>

        {/* INPUT 2 */}
        <View style={{ backgroundColor: '#fff', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 12 }}>
          <TextInput
            placeholder="Buscar producto para comparar..."
            value={search2}
            onChangeText={(t) => { setSearch2(t); setShowSuggestions2(true); setCompared(false) }}
          />
        </View>

        {/* SUGERENCIAS 2 */}
        {showSuggestions2 && filtered2.length > 0 && (
          <View style={{ backgroundColor: '#fff', borderRadius: 8, marginTop: 4, maxHeight: 150 }}>
            {filtered2.map(p => (
              <Pressable
                key={p.id}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' }}
                onPress={() => { setProduct2(p); setSearch2(p.nombre); setShowSuggestions2(false) }}
              >
                <Text style={{ fontSize: 13 }}>{p.nombre}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* BOTÓN */}
        <View style={{ alignItems: 'center', marginTop: 24 }}>
          <Pressable onPress={handleComparar}>
            <LinearGradient
              colors={['#F4CE14', '#EC4AAE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ paddingHorizontal: 32, paddingVertical: 10, borderRadius: 50 }}
            >
              <Text style={{ color: '#fff', fontWeight: '600' }}>Comparar</Text>
            </LinearGradient>
          </Pressable>
        </View>

      </LinearGradient>

      {/* 🔥 RESULTADO CON SCROLL */}
      <ScrollView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>

        <View style={{ padding: 16 }}>

          <View style={{ flexDirection: 'row' }}>

            {/* PRODUCTO 1 */}
            <View style={{ flex: 1, paddingRight: 8 }}>

              {product1 && (
                <>
                  <Image source={product1.imagenLocal} style={{ width: 100, height: 100, alignSelf: 'center' }} />

                  <Text style={{ textAlign: 'center', fontWeight: '600', marginTop: 8 }}>
                    {product1.nombre}
                  </Text>

                  <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 10 }}>

                    {[
                      ...(product1.caracteristicas_basicas?.split('\n') || []),
                      ...(product1.caracteristicas_tecnicas?.split('\n') || [])
                    ].map((item, index) => (
                      <Text key={index} style={{ fontSize: 12, marginBottom: 6 }}>
                        {item}
                      </Text>
                    ))}

                    <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#16a34a' }}>
                      ${product1.precio.toLocaleString('es-CO')}
                    </Text>

                  </View>
                </>
              )}

            </View>

            {/* PRODUCTO 2 */}
            <View style={{ flex: 1, paddingLeft: 8 }}>

              {product2 && (
                <>
                  <Image source={product2.imagenLocal} style={{ width: 100, height: 100, alignSelf: 'center' }} />

                  <Text style={{ textAlign: 'center', fontWeight: '600', marginTop: 8 }}>
                    {product2.nombre}
                  </Text>

                  <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 10 }}>

                    {[
                      ...(product2.caracteristicas_basicas?.split('\n') || []),
                      ...(product2.caracteristicas_tecnicas?.split('\n') || [])
                    ].map((item, index) => (
                      <Text key={index} style={{ fontSize: 12, marginBottom: 6 }}>
                        {item}
                      </Text>
                    ))}

                    <Text style={{ marginTop: 10, fontWeight: 'bold', color: '#16a34a', textAlign: 'right' }}>
                      ${product2.precio.toLocaleString('es-CO')}
                    </Text>

                  </View>
                </>
              )}

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
              borderColor: '#F4CE14'
            }}>
              <Text style={{ fontWeight: 'bold' }}>Ganador de la comparación:</Text>
              <Text style={{ color: '#1B3A8C', fontWeight: 'bold' }}>{ganador.marca}</Text>
              <Text>{ganador.nombre}</Text>
            </View>
          )}

        </View>

      </ScrollView>

    </View>
  )
}

export default CompareScreen