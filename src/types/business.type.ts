export interface IGetAllBusinessesResponse {
    businesses: Array<IBusiness>;
}

export interface IGetBusinessResponse {
    business: IBusiness;
}

export interface IBusiness {
    id: string;
    name: string;
    email: string;
    description: string;
    url: string;
    telephone_number: string;
    city: string;
    address: string;
    rating: number;
}
