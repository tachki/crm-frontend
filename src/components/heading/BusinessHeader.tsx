'use client'

import Image from 'next/image'
import LOGO_TACHKI from '../../images/logo_tachki.svg'
import { removeFromStorage } from '@/services/auth-token.service'
import { useRouter } from 'next/navigation'

export default function BusinessHeader() {
	const router = useRouter()

	const logout = () => {
		removeFromStorage()
		router.replace('/');
	}

	return (
		<div className='h-20 flex justify-between items-center'>
			<div>
				<Image
					className='m-auto'
					src={LOGO_TACHKI}
					alt="logo"
				/>
			</div>
			<nav className='font-medium'>
				<a href='#'>Атопарк</a>
			</nav>
			<button
				className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl'
				onClick={logout}
			>
				Выйти
			</button>
		</div>
	)
}