'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm } from '@/types/auth.type'
import { Field } from '@/components/fields/Field'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/buttons/Button'
import Image from 'next/image'

interface IFormErrors {
	email: string
	password: string
	auth: string
}

export default function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(true)
	const [formErrors, setFormErrors] = useState<IFormErrors>({
		email: '',
		password: '',
		auth: '',
	})

	const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { authMutate, errorMessage } = useAuth(isLoginForm)

	useEffect(() => {
		setFormErrors(prev => ({
			...prev,
			email: errors.email?.message || '',
			password: errors.password?.message || '',
			auth: errorMessage || ''
		}))
	}, [errors, errorMessage])
	

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		reset()
		authMutate(data)
		setFormErrors({ email: '', password: '', auth: '' })
	}

	const toggleForm = () => {
		console.log(formErrors)
		setIsLoginForm(prevState => !prevState)
		setFormErrors({ email: '', password: '', auth: '' })
	}

	return (
		<div className="align-center w-96 m-auto flex flex-col justify-center items-center h-screen space-y-12">
			<div>
				<Image
					className='m-auto'
					width={150}
					height={150}
					src="logo_tachki.svg"
					alt="logo"
				/>
			</div>

			<div className="w-full text-center m-auto">
				<h1 className='text-black text-3xl font-bold mb-8'>
					{isLoginForm ? "Авторизация" : "Регистрация"}
				</h1>

				<form
					key={isLoginForm ? 'login' : 'register'}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Field
						id='email'
						label=''
						placeholder='Логин'
						type='text'
						extra=''
						{...register('email', {
							required: 'Необходимо ввести логин'
						})}
					/>
					{formErrors.email && (
						<p role='alert' className='text-xs text-red-500 font-medium pt-1.5'>
							{formErrors.email}
						</p>
					)}

					<Field
						id='password'
						label=''
						placeholder='Пароль'
						type='password'
						{...register('password', {
							required: 'Необходимо ввести пароль',
							minLength: {
								value: 4,
								message: 'Пароль должен содержать не менее 4 символов',
							},
						})}
						extra=''
					/>
					{formErrors.password && (
						<p role='alert' className='text-xs text-red-500 font-medium pt-1.5'>
							{formErrors.password}
						</p>
					)}

					{formErrors.auth && (
						<p
							role="alert"
							className="text-xs text-red-500 font-medium pt-1.5"
						>
							{errorMessage}
						</p>
					)}

					<Button className='mt-6 mb-8 w-full bg-primary text-white'>
						{isLoginForm ? "Войти" : "Зарегистрироваться"}
					</Button>

					<div className='justify-center flex items-center font-medium'>
						<p>{isLoginForm ? "Нет аккаунта?" : "Уже есть аккаунт?"}</p>
						<button
							className='text-primary underline pl-2'
							onClick={toggleForm}
						>
							{isLoginForm ? "Зарегистрироваться" : "Войти"}
						</button>
					</div>
				</form>

			</div>

		</div>
	)
}
