'use client'

import { store } from '@/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren, useState } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)

	return (
		<QueryClientProvider client={client}>
			<ReduxProvider store={store}>
				{children}
				{process.env.NODE_ENV === 'production' && <ReactQueryDevtools />}
				{/* <ReactQueryDevtools initialIsOpen={true} buttonPosition="top-right" /> */}
			</ReduxProvider>
		</QueryClientProvider>
	)
}
