'use client'

import { useEffect, useState } from "react";
import { businessService } from "@/services/business.service";
import { getAccessToken } from "@/services/auth-token.service";
import { IBusiness } from "@/types/business.type";

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Array<IBusiness>>([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      if (getAccessToken()) {
        try {
          const response = await businessService.getAllBusinesses();
            console.log(response.data);
            setBusinesses(Array.isArray(response.data.businesses) ? response.data.businesses : []);
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
          {businesses.length === 0 ? 
            <h1>В системе нет автопарков</h1>
            // сделать карточки автопарков 
            : businesses.map((business) => (
            <div key={business.id}>
              <div>{business.name}</div>
            </div>
          ))}
      </>
  );
}
