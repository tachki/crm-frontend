export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = localStorage.getItem(EnumTokens.ACCESS_TOKEN)
	console.log(accessToken);
	return accessToken || null
}

export const getRefreshToken = () => {
	const refreshToken = localStorage.getItem(EnumTokens.REFRESH_TOKEN)
	return refreshToken || null
}

export const saveTokenStorage = (accessToken: string, refreshToken: string) => {
	localStorage.setItem(EnumTokens.ACCESS_TOKEN, accessToken)
	localStorage.setItem(EnumTokens.REFRESH_TOKEN, refreshToken)
}

export const removeFromStorage = () => {
	localStorage.removeItem(EnumTokens.ACCESS_TOKEN)
	localStorage.removeItem(EnumTokens.REFRESH_TOKEN)
}