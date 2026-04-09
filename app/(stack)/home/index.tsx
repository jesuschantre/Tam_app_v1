import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'

// Diseños de components
import Header from '../../../components/Header'
import Carousel from '../../../components/Carousel'
import SearchBar from '../../../components/SearchBar'
import CompareSection from '../../../components/CompareSection'
import BottomTab from '../../../components/BottomTab'

const HomeScreen = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <View className="flex-1 bg-white">

      <ScrollView>

        <Carousel />
         <SearchBar value={searchText} onChangeText={setSearchText} />
        <CompareSection />

      </ScrollView>

    </View>
  )
}

export default HomeScreen