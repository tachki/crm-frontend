'use client'
import { getUserStorage, removeFromStorage } from '@/services/auth-token.service'
import { useRouter } from 'next/navigation'
import { IUser } from '@/types/auth.type'
import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'


export default function Header() {
	const router = useRouter()

	const user: IUser | null = getUserStorage()


	const logout = () => {
		removeFromStorage()
		router.replace('/');
	}

	return (
		<div className='h-20 flex justify-between items-center'>
		
		  <div>
			<img
			  className='m-auto'
			  src="/logo_tachki.svg"
			  alt="logo"
			/>
		  </div>
	

		  <nav className='font-medium flex gap-4'>
			{user?.user_type === 'admin' || user?.user_type === 'worker' ? (
			  <>
				<a href={DASHBOARD_PAGES.BUSINESS_CARS}>Автопарк</a>
				<a href='#'>Запросы на аренду</a>
			  </>
			) : user?.user_type === 'customer' ? (
			  <>
			
			  </>
			) : (
			  <>
				<a href='#'>Компании</a>
				<a href='#'>Верификация</a>
			  </>
			)}
		  </nav>
	
		  <button
			className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl'
			onClick={logout}
		  >
			Выйти
		  </button>
		</div>
	  );
}

