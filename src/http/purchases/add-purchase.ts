import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { PurchaseType } from "@/validators/purchase/purchase-validator";
import { Purchase } from "@/types/purchase/purchase";

interface PurchaseResponse {
  data: Purchase;
}

export const addPurchaseHandler = async (
  body: PurchaseType,
  token: string
): Promise<PurchaseResponse> => {
  const { data } = await api.post("/purchases", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddPurchase = (
  options?: UseMutationOptions<PurchaseResponse, AxiosError<any>, PurchaseType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: PurchaseType) =>
      addPurchaseHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
