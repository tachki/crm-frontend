export interface IApplicationsResponse {
	applications: IApplication[]
}

interface IApplication {
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
