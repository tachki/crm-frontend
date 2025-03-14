'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthForm } from '@/types/auth.type'
import { Field } from '@/components/fields/Field'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/buttons/Button'


export default function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(true)

  const { register, handleSubmit, reset, formState: { errors }, clearErrors } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const { authMutate, isError, errorMessage } = useAuth(isLoginForm);

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		reset()
		authMutate(data)
	}

	const toggleForm = () => {
		setIsLoginForm(prevState => !prevState)
		reset()
    clearErrors()
	}

	return (
		<div className="align-center w-96 m-auto flex flex-col justify-center items-center h-screen space-y-12">
			<div>
				<img
					className='m-auto'
					src="logo_tachki.svg"
					alt="logo"
				/>
			</div>

			<div className="w-full text-center m-auto">
				<h1 className='text-black text-3xl font-bold mb-8'>
					{isLoginForm ? "Авторизация" : "Регистрация"}
				</h1>

				<form
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
					{errors.email?.message && (
						<p
							role='alert'
							className='text-xs text-red-500 font-medium pt-1.5'
						>
							{errors.email.message}
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
					{errors.password?.message && (
						<p
							role='alert'
							className='text-xs text-red-500 font-medium pt-1.5'
						>
							{errors.password.message}
						</p>
					)}

					{isError && (
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
	);
}
