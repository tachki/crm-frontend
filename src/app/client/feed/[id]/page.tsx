import dynamic from 'next/dynamic'

const Car = dynamic(() => import('./Car'), {
  loading: () => <p>Загрузка...</p>,
})

export default function CarPage() {
  return (
    <div className='max-w-[1200px] mx-auto my-4'>
      <Car />
    </div>
  )
}
