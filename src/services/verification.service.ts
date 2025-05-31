import { axiosWithAuth } from "@/api/interceptors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

  export const useGetVerificationApplications = () => {
    return useQuery<VerificationEntry[]>({
      queryKey: ['verifications'],
      queryFn: async () => {
        const res = await axiosWithAuth.get('/v1/users/verifications');
        return res.data.verification_applications;
      },
    });
  };
  
  export const useApproveVerification = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async ({ id, drive_exp }: { id: string; drive_exp: number }) => {
        return axiosWithAuth.put(`/v1/users/verifications/approve/${id}?drive_exp=${drive_exp}`);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['verifications'] }),
    });
  };
  
  export const useDeclineVerification = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (id: string) => {
        return axiosWithAuth.put(`/v1/users/verifications/decline/${id}`);
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['verifications'] }),
    });
  };
  
  interface VerificationApplication {
    id: string;
    full_name: string;
    birthday: string;
    number: string;
  }
  
  interface VerificationEntry {
    application: VerificationApplication;
    images: string[];
  }
  