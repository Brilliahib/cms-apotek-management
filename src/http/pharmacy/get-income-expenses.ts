import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { IncomeExpense } from "@/types/pharmacy/pharmacy";

interface GetIncomeExpenseResponse {
  data: IncomeExpense;
}

export const GetIncomeExpenseHandler = async (
  token: string
): Promise<GetIncomeExpenseResponse> => {
  const { data } = await api.get<GetIncomeExpenseResponse>("/pharmacy/1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetIncomeExpense = (
  token: string,
  options?: Partial<UseQueryOptions<GetIncomeExpenseResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["income-expense"],
    queryFn: () => GetIncomeExpenseHandler(token),
    ...options,
  });
};
