import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Medicine } from "@/types/medicine/medicine";
import { MedicineType } from "@/validators/medicines/medicine-validators";

interface MedicineResponse {
  data: Medicine;
}

export const addMedicineHandler = async (
  body: MedicineType,
  token: string
): Promise<MedicineResponse> => {
  const { data } = await api.post("/medicines", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddMedicine = (
  options?: UseMutationOptions<MedicineResponse, AxiosError<any>, MedicineType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: MedicineType) =>
      addMedicineHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
