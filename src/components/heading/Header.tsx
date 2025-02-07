'use client'
import { getUserStorage, removeFromStorage } from '@/services/auth-token.service'
import { useRouter } from 'next/navigation'
import { IUser } from '@/types/auth.type'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loader from '../Loader'
import { LogOut } from 'lucide-react'

export default function Header() {
	const router = useRouter()

	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		const userData = getUserStorage()
		setUser(userData)
	}, [])


	const logout = () => {
		removeFromStorage()
		router.replace('/')
	}

	return (
		<div className='h-20 flex justify-between items-center'>

			<div>
				<img
					className='m-auto 2sm-max:w-20'
					src="/logo_tachki.svg"
					alt="logo"
				/>
			</div>


			<nav className='font-medium flex gap-4'>
				{user?.user_type === 'admin' || user?.user_type === 'worker' ? (
					<>
						<Link href={DASHBOARD_PAGES.BUSINESS_CARS}>Автопарк</Link>
						<Link href={DASHBOARD_PAGES.CARS_RESERVATIONS}>Запросы на аренду</Link>
					</>
				) : user?.user_type === 'customer' ? (
					<>

					</>
				) : user?.user_type === 'superuser' ? (
					<>
						<Link href='#'>Компании</Link>
						<Link href='#'>Верификация</Link>
					</>
				) : <Loader />}
			</nav>

			<button
				className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl 2sm-max:hidden'
				onClick={logout}
			>
				Выйти
			</button>

			<div className='2sm-max:block hidden'>
				<LogOut
					className='text-errorRed w-8 h-8 cursor-pointer'
					onClick={logout}
				/>
			</div>
		</div>
	)
}

