"use client";

import { purchaseColumns } from "@/components/atoms/datacolumn/DataPurchase";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllPurchase } from "@/http/purchases/get-all-purchase";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPurchasesAdminContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllPurchase(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((purchase) =>
      purchase.medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="flex justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari pembelian..."
          />
          <Link href={"/dashboard/admin/users/create"}>
            <Button>Beli Obat</Button>
          </Link>
        </div>
        <DataTable columns={purchaseColumns} data={filteredData} />
      </div>
    </>
  );
}
