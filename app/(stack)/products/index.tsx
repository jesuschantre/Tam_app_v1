import React  from 'react'
import { View, Text, FlatList, Image, Pressable } from 'react-native'
import { useLocalSearchParams,useRouter } from 'expo-router'

import Carousel from '../../../components/Carousel'
import SearchBar from '../../../components/SearchBar'

// MOCK DATA (SIMULACIÓN DE PRODUCTOS)

const products = [
  {
    id: 1,
    nombre: 'Nintendo Switch 2 + Mario Kart',
    precio: 2800000,
    subcategoria_id: 1,
    marca: 'nintendo',
    imagen: require('../../../assets/images/ac_switch2_mariokart.jpg')
  },
  {
    id: 2,
    nombre: 'ASUS Vivobook 16',
    precio: 3549900,
    precioAnterior: 5599000,
    descuento: 36.59,
    subcategoria_id: 2,
    marca: 'ASUS',
    imagen: require('../../../assets/images/ap_asusvivobook16.jpg')
  },
  {
    id: 3,
    nombre: 'Insta360 Ace Pro 2',
    precio: 1679726,
    subcategoria_id: 3,
    marca: 'Insta360',
    imagen: require('../../../assets/images/ac_insta360.jpg')
  },
  {
    id: 4,
    nombre: 'Motorola Edge 50 Fusion',
    precio: 999900,
    precioAnterior: 2100000,
    descuento: 52.38,
    subcategoria_id: 4,
    marca: 'Motorola',
    imagen: require('../../../assets/images/am_motorola_edge50fusion.jpg')
  },
  {
    id: 5,
    nombre: 'ASUS Intel Core i9',
    precio: 3469900,
    subcategoria_id: 2,
    marca: 'ASUS',
    imagen: require('../../../assets/images/ap_asus_corei9.jpg')
  },
  {
    id: 6,
    nombre: 'MSI Katana 17.3',
    precio: 9999200,
    precioAnterior: 12499000,
    descuento: 20,
    subcategoria_id: 2,
    marca: 'MSI',
    imagen: require('../../../assets/images/ap_katana17.jpg')
  },
  {
    id: 7,
    nombre: 'Combo Kalley Teclado',
    precio: 199900,
    subcategoria_id: 6,
    marca: 'Kalley',
    imagen: require('../../../assets/images/apg_combo4.jpg')
  },{
    id: 8,
    nombre: 'PS5 Digital 1TB Slim',
    precio: 2599000,
    subcategoria_id: 1,
    marca: 'playstation',
    imagen: require('../../../assets/images/ac_ps5_digital1tb.jpg')
  },
  {
    id: 9,
    nombre: 'Lenovo AIO',
    precio: 3599000,
    subcategoria_id: 7,
    marca: 'Lenovo',
    imagen: require('../../../assets/images/ae_lenovo_aio.jpg')
  }

]

const ProductCard = ({ item,onPress }: any) => {
  const isHighDiscount = item.descuento ? item.descuento >= 50 : false

  return (
    <Pressable
      className="w-[48%] mb-4"
      onPress={onPress} 
    >
      {({ pressed }) => (
        <View
          style={{
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.97 : 1 }]
          }}
          className="bg-white rounded-2xl overflow-hidden h-[230px]"
        >
            {/* IMAGEN */}
            <View className="h-32 items-center justify-center">
              <Image
                source={item.imagen}
                className="w-full h-full"
                resizeMode="contain"
              />
            </View>

          <View style={{ backgroundColor: '#f3f4f6' }} className="p-2 flex-1">
              {/* MARCA */}
              <Text className="text-[10px] text-gray-400 uppercase">
                {item.marca}
              </Text>

              {/* NOMBRE */}
              <Text
                className="text-[13px] font-semibold text-gray-800 mt-1"
                numberOfLines={2}
              >
                {item.nombre}
              </Text>

              {/* PRECIO + DESCUENTO */}
              <View className="flex-row items-center justify-between mt-2">

                <Text className="text-red-500 font-bold text-sm">
                  ${item.precio.toLocaleString()}
                </Text>

                  <View className="w-[45px] h-[18px] items-center justify-center">
                    {item.descuento ? (
                      <View
                        className="px-2 py-[2px] rounded-md"
                        style={{
                          backgroundColor: isHighDiscount ? '#16a34a' : '#dc2626'
                        }}
                      >
                        <Text className="text-tertiary text-[10px] font-semibold">
                          -{item.descuento}%
                        </Text>
                      </View>
                    ) : null}
                  </View>

              </View>

              {/* PRECIO ANTERIOR */}
              
                <Text className="text-gray-400 text-[11px] mt-1">
                  {item.precioAnterior
                    ? `$${item.precioAnterior.toLocaleString()}`
                    : ' '}
                </Text>
              

            </View>
        </View>
      )}
    </Pressable>
  )
}

const ProductScreen = () => {
  const router = useRouter()

  const { subcategoria_id, marca, search } = useLocalSearchParams()

  const filteredProducts = products.filter((item) => {

    const matchSubcategoria = subcategoria_id
      ? item.subcategoria_id === Number(subcategoria_id)
      : true

    const matchMarca = marca
      ? item.marca.toLowerCase() === String(marca).toLowerCase()
      : true

    const matchSearch = search
      ? (
          item.nombre.toLowerCase().includes(String(search).toLowerCase()) ||
          item.marca.toLowerCase().includes(String(search).toLowerCase())
        )
      : true

    return matchSubcategoria && matchMarca && matchSearch
  })

  return (
   <View className="flex-1 bg-white">
     
      <Text className="text-2xl font-bold mb-4">
        {marca}
      </Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        renderItem={({ item }) => (
        <ProductCard
          item={item}
          onPress={() => {
            console.log('Presionando producto id:', item.id);
            router.push(`/products/${item.id}` as any);
          }}
        />
      )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Carousel />
            <Text className="text-2x1 font-bold px-4 mt-4">
              {marca}
            </Text>
          </>
        }
      />

    </View>
  )
}

export default ProductScreen