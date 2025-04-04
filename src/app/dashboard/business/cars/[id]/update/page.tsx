import dynamic from 'next/dynamic'

const Update = dynamic(() => import('./Update'), {
  loading: () => <p>Загрузка...</p>,
})

export default function UpdatePage() {
  return (
    <Update />
  )
}
