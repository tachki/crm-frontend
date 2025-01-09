'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import LOGO from "../../images/logo.svg"
import { IAuthForm } from '@/types/auth.type'
import { Field } from '@/components/fields/Field'
import Image from 'next/image'
import { useAppDispatch } from '@/hooks/redux'
import { setAuth } from '@/store/slice/isAuthSlice'
import { useAuth } from '@/hooks/useAuth'

export default function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(false)

	const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const dispatch = useAppDispatch()

	const { authMutate, isError, errorMessage, reset: resetForm } = useAuth(isLoginForm, setIsLoginForm)

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		reset()

		if (!isLoginForm) {
			authMutate(data)
		}
		else {
			dispatch(setAuth(true))
			authMutate(data)
		}
	}

	const toggleForm = () => {
		setIsLoginForm(prevState => !prevState)
		reset()
		resetForm()
	}

	return (
		<div className="min-h-screen w-1/2 m-auto py-20">
			<div>
				<Image
					className='mb-20'
					src={LOGO}
					alt="logo" />
			</div>

			<div className="w-80 text-center m-auto">
				<h1 className='text-primary uppercase text-xl font-bold mb-10'>
					{isLoginForm ? "Авторизация" : "Регистрация"}
				</h1>

				<form
					className='w-full'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Field
						id='email'
						label=''
						placeholder={isLoginForm ? 'Логин' : 'Электронная почта'}
						type={isLoginForm ? 'text' : 'email'}
						extra=''
						{...register('email', {
							required: 'Необходимо ввести логин'
						})}
					/>

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

					{errors.password && (
						<p
							role='alert'
							className='text-xs text-red-500 font-medium pt-1.5'
						>
							{errors.password.message}</p>
					)}

					{isError && (
						<p
							role="alert"
							className="text-xs text-red-500 font-medium pt-1.5"
						>
							{errorMessage}
						</p>
					)}

					<button
						className='w-full py-5 px-10 bg-primary uppercase text-white text-m rounded-xl my-6'
						type='submit'
					>
						{isLoginForm ? "Войти" : "Зарегестрироваться"}
					</button>
				</form>

				<p
					className='text-m font-light '
				>
					{isLoginForm ? "Или войди через" : "Или зарегестрируйся через"}
				</p>


				<div className='justify-center flex items-center font-light'>
					<p>{isLoginForm ? "Нет аккаунта?" : "Уже есть аккаунт?"}</p>
					<button
						className='text-primary underline pl-2'
						onClick={toggleForm}
					>
						{isLoginForm ? "Зарегестрироваться" : "Войти"}
					</button>
				</div>

			</div>

		</div>
	);
}
