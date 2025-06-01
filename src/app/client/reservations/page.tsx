import dynamic from 'next/dynamic'

const Reservation = dynamic(() => import('./Reservation'), {
    loading: () => (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600 font-medium">Загрузка бронирований...</p>
        </div>
    ),
})

export default function ReservationPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 w-full">
            <Reservation />
        </div>
    )
}
