'use client'

import { Button } from '@/components/buttons/Button'
import { useBusiness } from '../hooks/useBusiness'
import { useApproveBusiness } from '../hooks/useApproveBusiness'
import { useDeclineBusiness } from '../hooks/useDeclineBusiness'

export default function BusinessesPage() {
	const { data, isLoading } = useBusiness()
	const approveMutation = useApproveBusiness()
	const declineMutation = useDeclineBusiness()

	if (isLoading) return (<div>Загрузка...</div>)

	return (
		<section className="my-20 flex flex-col gap-10 px-4">
			{data && data.map((business) => (
				<div className="p-10 shadow-xl rounded-3xl bg-white" key={business.id}>
					<div className="flex flex-col lg:flex-row justify-between items-start gap-4">
						<h2 className="text-2xl font-semibold mb-4">{business.name}</h2>
					</div>
					<div className="mb-6 font-normal text-base">{business.description}</div>
					<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
						<div className="font-normal text-sm lg:text-base">
							<h5 className="font-semibold mb-2">Контакты</h5>
							<div>{business.city}</div>
							<div>{business.address}</div>
							<div>{business.telephone_number}</div>
							<div>{business.email}</div>
						</div>
						<button
							className="font-medium whitespace-nowrap px-16 py-3 border-2 border-grey rounded-lg white w-full md:w-auto text-sm lg:text-base"
							onClick={() => window.open(business.url || '', '_blank')}
						>
							Перейти на страницу
						</button>
					</div>
					<div className="flex flex-col 2sm:flex-row w-full gap-1 md:gap-6">
						<Button
							className="w-full border-none bg-green-500 text-white hover:bg-green-600 py-3"
							onClick={() => approveMutation.mutate(business.id)}
						>
							Принять
						</Button>
						<Button
							className="w-full border-none bg-errorRed text-white hover:bg-red-700 py-3"
							onClick={() => declineMutation.mutate(business.id)}
						>
							Отклонить
						</Button>
					</div>
				</div>
			))}
		</section>
	)
}