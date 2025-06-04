export interface IBusinessesResponse {
	businesses: IBusiness[]
}

interface IBusiness {
	id: string
	name: string
	address: string
	city: string
	description: string
	email: string
	telephone_number: string
	url: string
    rating: number
    tariff_id: number
	created_at: string
	updated_at: string
}
