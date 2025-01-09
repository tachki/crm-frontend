import { axiosWithAuth } from "@/api/interceptors"
import { IGetAllBusinessesResponse } from "@/types/business.type"

export const businessService = {
    async getAllBusinesses() {
        return await axiosWithAuth.get<IGetAllBusinessesResponse>('/v1/businesses/')
    }
}
