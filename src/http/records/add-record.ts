import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { MedicalRecords } from "@/types/records/medical-records";
import { MedicalRecordType } from "@/validators/records/record-validator";

interface MedicalRecordResponse {
  data: MedicalRecords;
}

export const addMedicalRecordHandler = async (
  body: MedicalRecordType,
  token: string
): Promise<MedicalRecordResponse> => {
  const { data } = await api.post("/medical-records", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddMedicalRecord = (
  options?: UseMutationOptions<
    MedicalRecordResponse,
    AxiosError<any>,
    MedicalRecordType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: MedicalRecordType) =>
      addMedicalRecordHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
