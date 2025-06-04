export interface IBusinessResponse {
	applications: IBusinessesResponse[]
}

interface IBusinessesResponse {
	address: string
	checked: boolean
	city: string
	created_at: string
	description: string
	email: string
	id: string
	name: string
	successful: boolean
	telephone_number: string
	updated_at: string
	url: string
}