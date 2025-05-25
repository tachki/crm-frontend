'use client'
import { decodeTokens, removeFromStorage } from '@/services/auth-token.service'
import { useRouter } from 'next/navigation'
import { IUser } from '@/types/auth.type'
import { CLIENT_PAGES, DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loader from '../Loader'
import { MAIN_PAGES } from '@/config/access-url.config'
import Image from 'next/image'

export default function Header() {
	const router = useRouter()

	const [user, setUser] = useState<IUser | null>(null)

	useEffect(() => {
		const userData = decodeTokens()
		console.log("USER: ", userData)
		setUser(userData)
	}, [])


	const logout = () => {
		removeFromStorage()
		window.location.reload()
	}

	return (
		<div className='h-20 flex justify-between items-center'>

			<Link href={user ? MAIN_PAGES[user.user_type] : '/'} passHref>
				<div style={{ cursor: 'pointer' }}>
					<Image
						className='m-auto 2sm-max:w-20'
						src="/logo_tachki.svg"
						alt="logo"
						width={150}
						height={150}
					/>
				</div>
			</Link>

			<nav className='font-medium flex gap-4'>
				{user?.user_type === 'admin' || user?.user_type === 'worker' ? (
					<>
						<Link href={DASHBOARD_PAGES.BUSINESS_CARS}>Автопарк</Link>
						<Link href={DASHBOARD_PAGES.RESERVATIONS}>Запросы на аренду</Link>
					</>
				) : user?.user_type === 'customer' ? (
					<>
						<Link href={CLIENT_PAGES.RESERVATIONS}>Бронирования</Link>
					</>
				) : user?.user_type === 'superuser' ? (
					<>
						<Link href='#'>Бизнесы</Link>
						<Link href='#'>Kyc</Link>
					</>
				) : <Loader />}
			</nav>

			{user ?
				<button
					className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl 2sm-max:hidden'
					onClick={logout}
				>
					Выйти
				</button>
				:
				<button
					className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl 2sm-max:hidden'
					onClick={() => router.push(DASHBOARD_PAGES.AUTH)}
				>
					Войти
				</button>
			}
		</div>
	)
}

