import Header from '@/components/heading/Header'
import { PropsWithChildren } from "react";

export default function Layout({children} : PropsWithChildren<unknown>){
  return (
    <div className='container'>
      <Header />
      {children}
    </div>
  )
} 
