"use client";

import { salesColumns } from "@/components/atoms/datacolumn/DataSales";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllSales } from "@/http/sales/get-all-sales";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardSalesContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllSales(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((sales) =>
      sales.medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari penjualan..."
          />
          <Link href={"/dashboard/admin/users/create"}>
            <Button>Beli Obat</Button>
          </Link>
        </div>
        <DataTable columns={salesColumns} data={filteredData} />
      </div>
    </>
  );
}
