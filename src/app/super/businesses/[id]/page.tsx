'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { businessService } from "@/services/business.service";
import { getAccessToken } from "@/services/auth-token.service";
import { IBusiness } from "@/types/business.type";

export default function BusinessPage() {
    const [business, setBusiness] = useState<IBusiness | null>(null);
    const params = useParams();
    const { id } = params as { id: string};

    useEffect(() => {
        const fetchBusinesses = async () => {
            if (getAccessToken()) {
                try {
                  const response = await businessService.getBusiness(id);
                    console.log(response.data);
                    setBusiness(response.data.business);
                } catch (error) {
                    console.log('Error fetching businesses:', error);
                }
            }
        };

        fetchBusinesses(); 
    }, [id]);

    if (!business) {
        return <h1>Business not found or loading...</h1>;
    }
   
    return (
        <div>
            <h1>{business.id}. {business.name}</h1> 
            <div>{business.url}</div>
            <div>{business.telephone_number}</div>
            <div>{business.email}</div>
            <div>{business.description}</div>
            <div>{business.city}</div>
            <div>{business.address}</div>
            <div>{business.rating}</div>
        </div>
    );
}
