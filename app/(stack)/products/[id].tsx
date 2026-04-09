import { mockProducts } from '@/constants/mockProducts';
import { Product } from '@/types/product';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const formatPrice = (price: number) => `$${price.toLocaleString('es-CO')}`;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // ── Cuando exista la API, reemplaza esto por:
    // const data = await getProductById(Number(id));
    // setProduct(data);
    const found = mockProducts.find(p => p.id === Number(id));
    setProduct(found ?? null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1B3A8C" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#666' }}>Producto no encontrado.</Text>
      </View>
    );
  }

  const especificacionesBasicas = product.caracteristicas_basicas.split('\n').filter(Boolean);
  const especificacionesTecnicas = product.caracteristicas_tecnicas.split('\n').filter(Boolean);
  const precioOriginal = Math.round(product.precio * 1.23);
  const descuento = 23;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* Imagen principal */}
      <View style={{ backgroundColor: '#f5f5f5', alignItems: 'center', padding: 20 }}>
        <Image
          source={product.imagen ? { uri: product.imagen } : (product as any).imagenLocal}
          style={{ width: '100%', height: 220, resizeMode: 'contain' }}
        />
      </View>

      <View style={{ padding: 16 }}>

        {/* Marca */}
        {product.marca && (
          <Text style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>
            {product.marca.toUpperCase()}
          </Text>
        )}

        {/* Nombre */}
        <Text style={{ fontSize: 15, fontWeight: '600', color: '#111', marginBottom: 12 }}>
          {product.nombre}
        </Text>

        {/* Precios */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#E8000D' }}>
            {formatPrice(product.precio)}
          </Text>
          <View style={{ backgroundColor: '#E8000D', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 }}>
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>-{descuento}%</Text>
          </View>
        </View>
        <Text style={{ fontSize: 13, color: '#999', textDecorationLine: 'line-through', marginBottom: 16 }}>
          {formatPrice(precioOriginal)}
        </Text>

        {/* Botones */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <TouchableOpacity style={{ backgroundColor: '#1B3A8C', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}>comparar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#1B3A8C', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 20 }}>
            <Text style={{ color: '#fff', fontSize: 18 }}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <Text style={{ fontSize: 26 }}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        {/* Especificaciones */}
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#111', marginBottom: 8 }}>
          Especificaciones
        </Text>

        {especificacionesBasicas.map((item, index) => {
          const [label, ...rest] = item.split(':');
          return (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ fontSize: 13, color: '#111' }}>{'• '}</Text>
              <Text style={{ fontSize: 13, color: '#111', flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{label}:</Text>
                {rest.join(':')}
              </Text>
            </View>
          );
        })}

        {especificacionesTecnicas.map((item, index) => {
          const [label, ...rest] = item.split(':');
          return (
            <View key={`tec-${index}`} style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={{ fontSize: 13, color: '#111' }}>{'• '}</Text>
              <Text style={{ fontSize: 13, color: '#111', flex: 1 }}>
                <Text style={{ fontWeight: 'bold' }}>{label}:</Text>
                {rest.join(':')}
              </Text>
            </View>
          );
        })}

        {/* Stock */}
        <Text style={{ fontSize: 13, color: product.stock > 0 ? 'green' : 'red', marginTop: 12 }}>
          {product.stock > 0 ? `✓ Disponible (${product.stock} en stock)` : '✗ Sin stock'}
        </Text>

      </View>
    </ScrollView>
  );
}