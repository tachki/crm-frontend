import dynamic from 'next/dynamic'

const Reservation = dynamic(() => import('./Reservation'), {
    loading: () => <p>Загрузка...</p>,
})

export default function ReservationPage() {
    return (
        <div className={`flex justify-center self-center m-auto items-center w-10/12 mb-9`}>
            <Reservation />
        </div>
    )
}
