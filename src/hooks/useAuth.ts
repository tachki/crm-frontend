import { IAuthForm, IAuthLoginResponse, IAuthRegisterResponse } from "@/types/auth.type"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { authService } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function useAuth(
  isLoginForm: boolean,
) {
  type AuthResponse = IAuthLoginResponse | IAuthRegisterResponse

  const { push } = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    onSuccess: () => {
      push('/') 
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
