import cn from 'clsx'
import Image from 'next/image';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type TypeButton = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  className,
  icon,
  ...rest
}: PropsWithChildren<TypeButton> & { icon?: string }) {
  return (
    <button
      className={cn(
        'border-2 border-primary rounded-lg py-4 px-20 text-base font-medium text-black transition active:bg-brand-700 cursor-pointer',
        className
      )}
      {...rest}
    >
      {icon && <Image src={icon} alt="icon" className="mr-2 inline-block w-7 h-7" />}
      {children}
    </button>
  )
}
