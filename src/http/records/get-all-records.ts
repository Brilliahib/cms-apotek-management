import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { MedicalRecords } from "@/types/records/medical-records";

interface GetAllMedicalRecordsResponse {
  data: MedicalRecords[];
}

export const GetAllMedicalRecordsHandler = async (
  token: string
): Promise<GetAllMedicalRecordsResponse> => {
  const { data } = await api.get<GetAllMedicalRecordsResponse>(
    "/medical-records",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllMedicalRecords = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllMedicalRecordsResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["medical-records"],
    queryFn: () => GetAllMedicalRecordsHandler(token),
    ...options,
  });
};
