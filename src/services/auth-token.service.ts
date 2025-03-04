import { IUser } from '@/types/auth.type'
import Cookies from 'js-cookie'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const getRefreshToken = () => {
	const refreshToken = Cookies.get(EnumTokens.REFRESH_TOKEN)
	console.log('Retrieved refresh token:', refreshToken);
	return refreshToken || null
}

export const saveTokenStorage = (accessToken: string, refreshToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		expires: 1
	})

	Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
		domain: 'localhost',
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}

export const decodeTokens = (token?: string) => {
  token = token ?? getAccessToken() ?? undefined;

  if (!token) {
    console.log("Ошибка с access токеном");
    return null;
  }

  const arrayToken = token.split('.');

  try {
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    return tokenPayload;
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
};