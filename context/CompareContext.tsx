import React, { createContext, useContext, useState } from 'react'
import { Product } from '../types/product'

interface CompareContextType {
  selected: Product[]
  addProduct: (product: Product) => void
  removeProduct: (index: number) => void
}


const CompareContext = createContext<CompareContextType | undefined>(undefined)

export const CompareProvider = ({ children }: any) => {
  const [selected, setSelected] = useState<Product[]>([])

  const addProduct = (product: Product) => {
    if (selected.length >= 2) return
    setSelected([...selected, product])
  }

  const removeProduct = (index: number) => {
    const newList = [...selected]
    newList.splice(index, 1)
    setSelected(newList)
  }

  return (
    <CompareContext.Provider value={{ selected, addProduct, removeProduct }}>
      {children}
    </CompareContext.Provider>
  )
}

export const useCompare = () => {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare debe usarse dentro de CompareProvider')
  }
  return context
}