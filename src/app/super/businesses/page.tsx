'use client'

import { useEffect, useState } from "react";
import { businessService } from "@/services/business.service";
import { getAccessToken } from "@/services/auth-token.service";
import { IBusiness } from "@/types/business.type";
import Link from "next/link";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Array<IBusiness>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (getAccessToken()) {
        try {
          const response = await businessService.getAllBusinesses();
            console.log(response.data);
            setBusinesses(Array.isArray(response.data.businesses) ? response.data.businesses : []);
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching businesses:', error);
            setBusinesses([]);
        }
      }
    };

    fetchBusinesses();
  }, []);

  return (
      <>
          <div>Businesses Page</div>
          {isLoading && <div>загрузка</div>} 
          {businesses.length === 0 ? 
            <h1>В системе нет автопарков</h1>
            // сделать карточки автопарков 
            : businesses.map((business) => (
            <div key={business.id} className="border border-black border-solid">
                <h2>{business.name}</h2>
                <p>{business.description}</p>
                <Link className="text-blue-600" href={`/super/businesses/${business.id}`}>
                    перейти &rarr;
                </Link>
            </div>
          ))}
      </>
  );
}
