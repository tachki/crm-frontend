import React from 'react'
import dynamic from 'next/dynamic'

const CarsFeed = dynamic(() => import('./CarsFeed'), {
  loading: () => <p>Загрузка...</p>,
})

export default function CarsFeedPage() {
  return (
    <CarsFeed />
  )
}
