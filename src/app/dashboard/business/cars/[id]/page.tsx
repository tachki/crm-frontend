import dynamic from 'next/dynamic'

const Car = dynamic(() => import('./Car'), {
	loading: () => <p>Загрузка...</p>,
})

export default function CarPage() {
	return (
		<Car />
	)
}
