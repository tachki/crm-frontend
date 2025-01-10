import { axiosWithAuth } from '@/api/interceptors'
import { getRefreshToken, getUserStorage, saveTokenStorage, saveUserStorage } from './auth-token.service'
import { IAuthForm, IAuthLoginResponse, IAuthRefreshResponse, IAuthRegisterResponse } from '@/types/auth.type'

export const authService = {

	async login(data: IAuthForm) {
		const { email: login, password } = data

		const response = await axiosWithAuth.post<IAuthLoginResponse>(
			`/auth/login`, { login, password })

		if (response.data.access_token && response.data.refresh_token) {
			saveTokenStorage(response.data.access_token, response.data.refresh_token)
		}

		if(response.data.user) {
			saveUserStorage(response.data.user)
			console.log(getUserStorage())
		}

		return response
	},

	async registration(data: IAuthForm) {
		const response = await axiosWithAuth.post<IAuthRegisterResponse>(
			`/auth/registration`, data)
		return response
	},

	async checkAuth() {
		const refreshToken = getRefreshToken()

		const response = await axiosWithAuth.post<IAuthRefreshResponse>(`/auth/refresh`, { refresh_token: refreshToken })

		if (response.data.access_token && response.data.refresh_token) {
			saveTokenStorage(response.data.access_token, response.data.refresh_token)
		}
	},

	// async logout() {
	// 	const response = await axiosWithAuth.post<boolean>('/auth/logout')

	// 	if (response.data) removeFromStorage()

	// 	dispatch(setAuth(false))

	// 	return response
	// }
}
