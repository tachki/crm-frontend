import dynamic from 'next/dynamic'

const Verification = dynamic(() => import('./Verification'), {
    loading: () => <p>Загрузка...</p>,
})

export default function VerificationPage() {
    return (
        <div className={`flex justify-center self-center m-auto items-center w-10/12 mb-9`}>
            <Verification/>
        </div>
    )
}
