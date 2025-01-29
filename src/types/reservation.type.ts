export interface Reservation {
    car_id: string;
    created_at: string;
    end_date: string;
    id: string;
    price: number;
    start_date: string;
    status: string;
    updated_at: string;
    user_id: string;
}

export interface ReservationsResponseDto {
    reservations: Reservation[];
}