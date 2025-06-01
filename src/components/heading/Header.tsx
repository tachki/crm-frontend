'use client'
import { decodeTokens, removeFromStorage } from '@/services/auth-token.service'
import { usePathname, useRouter } from 'next/navigation'
import { IUser } from '@/types/auth.type'
import { CLIENT_PAGES, DASHBOARD_PAGES } from '@/config/pages-url.config'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Loader from '../Loader'
import { MAIN_PAGES } from '@/config/access-url.config'
import Image from 'next/image'

export default function Header() {
	const router = useRouter()
	const pathname = usePathname()
  
	const [user, setUser] = useState<IUser | null>(null)
  
	useEffect(() => {
	  const userData = decodeTokens()
	  setUser(userData)
	}, [])
  
	const logout = () => {
	  removeFromStorage()
	  window.location.reload()
	}
  
	let links: any[] = []
  
	if (!user) links = []
	else if (user.user_type === 'admin' || user.user_type === 'worker') {
	  links = [
		{ href: DASHBOARD_PAGES.BUSINESS_CARS, label: 'Автопарк' },
		{ href: DASHBOARD_PAGES.RESERVATIONS, label: 'Запросы на аренду' },
	  ]
	} else if (user.user_type === 'customer') {
	  links = [
		{ href: CLIENT_PAGES.RESERVATIONS, label: 'Бронирования' },
	  ]
	} else if (user.user_type === 'superuser') {
	  links = [
		{ href: DASHBOARD_PAGES.SUPER_BUSINESS, label: 'Бизнесы' },
		{ href: DASHBOARD_PAGES.SUPER_KYC, label: 'KYC' },
	  ]
	}
  
	const containerRef = useRef<HTMLDivElement>(null)
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  
	const activeIndex = links.findIndex(link => pathname === link.href)
  
	useEffect(() => {
	  if (!containerRef.current) return
  
	  const container = containerRef.current
	  const linkElements = container.querySelectorAll('a')
  
	  if (activeIndex >= 0 && linkElements[activeIndex]) {
		const activeLink = linkElements[activeIndex] as HTMLElement
		setIndicatorStyle({ left: activeLink.offsetLeft, width: activeLink.offsetWidth })
	  } else {
		setIndicatorStyle({ left: 0, width: 0 })
	  }
	}, [activeIndex, pathname])
  
	return (
	  <div className='h-20 flex justify-between items-center px-4'>
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
  
		<nav ref={containerRef} className='relative font-medium flex gap-6'>
		  {links.length > 0 ? (
			links.map(({ href, label }) => (
			  <Link
				key={href}
				href={href}
				className={`pb-1 ${pathname === href ? 'text-black font-semibold' : 'text-gray-600'}`}
			  >
				{label}
			  </Link>
			))
		  ) : (
			<Loader />
		  )}
  
		  <span
			className='absolute bottom-0 h-[1px] bg-gray-400 transition-all duration-300'
			style={{
			  left: indicatorStyle.left,
			  width: indicatorStyle.width,
			}}
		  />
		</nav>
  
		{user ? (
		  <button
			className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl 2sm-max:hidden'
			onClick={logout}
		  >
			Выйти
		  </button>
		) : (
		  <button
			className='w-48 h-12 bg-errorRed text-white font-medium text-base rounded-xl 2sm-max:hidden'
			onClick={() => router.push(DASHBOARD_PAGES.AUTH)}
		  >
			Войти
		  </button>
		)}
	  </div>
	)
  }

