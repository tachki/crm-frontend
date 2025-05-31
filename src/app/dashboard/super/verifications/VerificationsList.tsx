"use client"
import { useApproveVerification, useDeclineVerification, useGetVerificationApplications } from "@/services/verification.service";
import { useState } from "react";
import Image from 'next/image';
import emptyParkImage from '@/images/main_page_park/empty_park.png'

export default function VerificationRequests() {
    const [driveExpMap, setDriveExpMap] = useState<Record<string, number | undefined>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const { data, isLoading } = useGetVerificationApplications();
    const approveMutation = useApproveVerification();
    const declineMutation = useDeclineVerification();
  
    if (isLoading) {
        return <div className="text-center p-4">Загрузка...</div>;
      }
    
      if (!data || data.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center  text-center px-4">
           <Image
                src={emptyParkImage}
                alt="Нет автомобилей"
                width={550}
                height={350}
                className="mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Заявок пока нет</h2>
            <p className="text-gray-600 text-sm">Как только пользователи подадут заявки, они появятся здесь.</p>
          </div>
        );
      }
    
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Заявки пользователей ({data.length})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map(({ application, images }) => {
            const driveExp = driveExpMap[application.id];
            const hasError = touched[application.id] && (!driveExp || driveExp < 0);
  
            return (
              <div key={application.id} className="border rounded-lg shadow p-5 bg-white">
                <img
                  src={`http://localhost:9000/verifications/${images[0]}`}
                  alt="Документ"
                  className="w-full h-52 object-cover rounded mb-4"
                />
                <div className="text-lg font-semibold mb-1">{application.full_name}</div>
                <div className="text-sm text-gray-700 mb-1">Дата рождения: {application.birthday}</div>
                <div className="text-sm text-gray-700 mb-4">Номер телефона: {application.number}</div>
                <input
                  type="number"
                  className={`border rounded px-2 py-1 mb-1 w-full ${
                    hasError ? 'border-red-500' : ''
                  }`}
                  placeholder="Опыт вождения (лет)"
                  value={driveExp ?? ''}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setDriveExpMap((prev) => ({
                      ...prev,
                      [application.id]: isNaN(value) ? undefined : value,
                    }));
                  }}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, [application.id]: true }))
                  }
                />
                {hasError && (
                  <div className="text-sm text-red-500 mb-2">
                    Укажите корректный опыт вождения
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    disabled={hasError || driveExp === undefined}
                    onClick={() =>
                      approveMutation.mutate({
                        id: application.id,
                        drive_exp: driveExp!,
                      })
                    }
                    className={`py-1 px-3 rounded text-white ${
                      hasError || driveExp === undefined
                        ? 'bg-green-300 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    Подтвердить
                  </button>
                  <button
                    onClick={() => declineMutation.mutate(application.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  