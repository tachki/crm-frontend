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

export const saveUserStorage = (user: IUser) => {
	const userJson = JSON.stringify(user);

	Cookies.set('userData', userJson, {
		domain: 'localhost',
		expires: 1
	})
}

export const getUserStorage = (): IUser | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  const userJson = Cookies.get('userData');
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Ошибка при парсинге куки: ', error);
    }
  }
  return null;
	// return {
	// 	business_id: '1',
	// 	created_at: '2023-01-01T00:00:00Z',
	// 	id: '123',
	// 	is_verified: true,
	// 	login: 'adminUser',
	// 	updated_at: '2023-01-02T00:00:00Z',
	// 	user_type: 'admin'
	// };
};


export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
	Cookies.remove('userData')
}