import cn from 'clsx'
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
	children,
	className,
	...rest
}: PropsWithChildren<TypeButton>) {
	return (
		<button
			className={cn(
				'w-full rounded-lg bg-primary border-none py-4 px-28 text-base font-medium text-white transition hover:bg-primary active:bg-brand-700 cursor-pointer',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
