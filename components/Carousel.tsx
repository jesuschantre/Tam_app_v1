import React from 'react'
import { View, Image, ScrollView, Dimensions } from 'react-native'
import { useEffect, useRef, useState } from 'react'

const { width } = Dimensions.get('window')
const images = [
    require('../assets/images/bnnr0_iphone17promax.jpg'),
    require('../assets/images/bnnr1_pgamer.jpeg'),
    require('../assets/images/bnnr2_cgamer.jpg'),
    require('../assets/images/bnnr3_audgamer.jpg'),
]

const Carousel = () => {
    const scrollRef = useRef<ScrollView>(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
        const nextIndex = (index + 1) % images.length
        scrollRef.current?.scrollTo({
            x: nextIndex * width,
            animated: true
        })
        setIndex(nextIndex)
        }, 5000)  // Se cambia de imagen cada 3 segundos.

        return () => clearInterval(interval)
    }, [index])


    return (
        <View className="mt-5">
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
            >

                {images.map((img, i) => (
                    <Image
                        key={i}
                        source={img}
                        style={{ width, height: 200 }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
        </View>
    )
}
export default Carousel