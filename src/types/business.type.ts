export interface IBusinessResponse {
	businesses: IBusinessesResponse[]
}

interface IBusinessesResponse {
	address: string,
	city: string,
	created_at: string,
	description: string,
	email: string,
	id: string,
	name: string,
	rating: number,
	telephone_number: string,
	updated_at: string,
	url: string
}