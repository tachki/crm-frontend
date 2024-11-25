import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import LOGO from "../../images/logo.svg"
import FACEBOOK from "../../images/social-media/facebook.png"
import GOOGLE from "../../images/social-media/google.png"
import VK from "../../images/social-media/vk.png"
import { IAuthForm } from '@/types/auth.type'
import { Field } from '@/components/fields/Field'
import Image from 'next/image'

export default function Register() {
	const [isLoginForm, setIsLoginForm] = useState(false)

	const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		console.log(data)
		reset()
	}

	const toggleForm = () => {
		setIsLoginForm(prevState => !prevState)
		reset()
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
						placeholder='Логин'
						type='email'
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
								value: 8,
								message: 'Пароль должен содержать не менее 8 символов',
							},
						})}
						aria-invalid={errors.password ? "true" : "false"}
						extra=''
					/>

					{errors.password && (
						<p
							role='alert'
						>
							{errors.password.message}</p>
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

				<div className='flex flex-row w-36 m-auto justify-between my-3 cursor-pointer'>
					<div>
						<Image src={FACEBOOK} alt="facebook icon" />
					</div>
					<div>
						<Image src={GOOGLE} alt="facebook icon" />
					</div>
					<div>
						<Image src={VK} alt="facebook icon" />
					</div>
				</div>

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