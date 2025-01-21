'use client'

import { getUserStorage, removeFromStorage } from '@/services/auth-token.service'
import { useRouter } from 'next/navigation'
import { IUser } from '@/types/auth.type'
import { useEffect, useState } from 'react'

export default function Header() {
	const router = useRouter()

	const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    setUser(getUserStorage());
  }, []);

	const logout = () => {
		removeFromStorage()
		router.replace('/');
	}

	return (
		<header className='h-20 flex justify-between items-center'>
			<div className='w-48'>
				<img
					src="/logo_tachki.svg"
					alt="logo"
				/>
			</div>
			<nav className='font-medium'>
				{user?.user_type === 'admin' || user?.user_type === 'worker' ? (
					<>
						<a href='#'>Компании</a>
						<a href='#'>Клиенты</a>
					</>
				) : user?.user_type === 'customer' ? (
					<a href='#'>Автопарк</a>
				) : (
					null
				)}
			</nav>

			<button
				className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl'
				onClick={logout}
			>
				Выйти
			</button>
		</header>
	)
}