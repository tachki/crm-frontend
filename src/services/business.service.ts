import { axiosWithAuth } from "@/api/interceptors"
import { IGetAllBusinessesResponse, IGetBusinessResponse } from "@/types/business.type"

export const businessService = {
    async getAllBusinesses() {
        return await axiosWithAuth.get<IGetAllBusinessesResponse>('/v1/businesses/')
    },

    async getBusiness(id: string) {
        return await axiosWithAuth.get<IGetBusinessResponse>(`/v1/businesses/${id}`)
    },
}
