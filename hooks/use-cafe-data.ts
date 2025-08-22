"use client"

import { useState, useEffect } from "react"
import { type CafeData, getCafeData, setCafeData, defaultCafeData } from "@/lib/cafe-data"

export const useCafeData = () => {
  const [data, setData] = useState<CafeData>(defaultCafeData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = () => {
      const cafeData = getCafeData()
      setData(cafeData)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const updateData = (newData: CafeData) => {
    setData(newData)
    setCafeData(newData)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "cafe-data.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const importData = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string)
        updateData(importedData)
      } catch (error) {
        console.error("Error importing data:", error)
      }
    }
    reader.readAsText(file)
  }

  return {
    data,
    updateData,
    exportData,
    importData,
    isLoading,
  }
}
