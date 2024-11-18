"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetIncomeExpense } from "@/http/pharmacy/get-income-expenses";
import { useSession } from "next-auth/react";
import { convertRupiah } from "@/utils/convertRupiah";

export default function CardIncomeExpense() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetIncomeExpense(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-4 py-4">
        <Card className="shadow border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p>Uang Sekarang</p>
              <h1 className="font-bold text-2xl">
                {data ? convertRupiah(data?.data.balance) : "Loading..."}
              </h1>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p>Uang Masuk</p>
              <h1 className="font-bold text-2xl">
                {data ? convertRupiah(data?.data.income) : "Loading..."}
              </h1>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p>Uang Keluar</p>
              <h1 className="font-bold text-2xl">
                {data ? convertRupiah(data?.data.expense) : "Loading..."}
              </h1>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
