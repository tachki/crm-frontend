import { IAuthForm, IAuthLoginResponse, IAuthRegisterResponse } from "@/types/auth.type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { authService } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {CLIENT_PAGES, DASHBOARD_PAGES} from "@/config/pages-url.config"
import { useAppDispatch } from './redux'
import { setAuth } from '@/store/slice/isAuthSlice'
import { setUser } from '@/store/slice/userSlice'

export function useAuth(
  isLoginForm: boolean,
) {
  type AuthResponse = IAuthLoginResponse | IAuthRegisterResponse

  const { push } = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch()

  const { mutate: authMutate, isError, reset } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError<unknown>,
    IAuthForm
  >({
    mutationKey: ['auth'],
    mutationFn: (data)
      : Promise<AxiosResponse<AuthResponse>> => {
      return isLoginForm
        ? authService.login(data)
        : authService.registration(data);
    },
    onSuccess: (data) => {
      if ('user' in data.data) { 
        const userData = data.data.user
        dispatch(setUser(userData))
    
        if (isLoginForm) {
          dispatch(setAuth(true))
    
          if (userData?.user_type === 'admin' || userData?.user_type === 'worker') {
            push(DASHBOARD_PAGES.BUSINESS_CARS)
          } else if (userData?.user_type === 'customer') {
            push(CLIENT_PAGES.FEED)
          }
        }  
      }
    },    
    onError: (error) => {
      console.log('error: ', error)
      const message =
        error.status === 400
          ? "Неверный пароль"
          : error.status === 404
            ? "Пользователь не найден"
            : error.status === 409
              ? "Пользователь с таким email уже существует"
              : "Произошла ошибка. Попробуйте позже."

      setErrorMessage(message);
    }
  })

  return { authMutate, isError, errorMessage, reset }
}
