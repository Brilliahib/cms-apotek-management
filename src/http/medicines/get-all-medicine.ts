import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Medicine } from "@/types/medicine/medicine";

interface GetAllMedicinesResponse {
  data: Medicine[];
}

export const GetAllMedicinesHandler = async (
  token: string
): Promise<GetAllMedicinesResponse> => {
  const { data } = await api.get<GetAllMedicinesResponse>("/medicines", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllMedicines = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllMedicinesResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["medicine-list"],
    queryFn: () => GetAllMedicinesHandler(token),
    ...options,
  });
};
