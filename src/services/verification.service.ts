import { axiosWithAuth } from "@/api/interceptors";

export const VerificationService = {

    async makeVerification(formData: FormData) {
      try {
        const response = await axiosWithAuth.post('/v1/users/verify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201 && response.data) {
          console.log('Верификация успешна:', response.data);
          return response.data;
        } else {
          throw new Error('Не удалось верифицировать');
        }
      } catch (error) {
        console.error('Произошла ошибка при верификации:', error);
        throw error;
      }
    },
  }
