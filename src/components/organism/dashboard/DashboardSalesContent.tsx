"use client";

import { salesColumns } from "@/components/atoms/datacolumn/DataSales";
import DialogCreateSales from "@/components/atoms/dialog/DialogCreateSale";
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

  const [DialogSalesOpen, setDialogSalesOpen] = useState(false);

  const handleSalesDialogOpen = () => {
    setDialogSalesOpen(true);
  };

  return (
    <>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="flex md:flex-row flex-col justify-between gap-4">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari penjualan..."
          />
          <Button onClick={handleSalesDialogOpen}>Buat Penjualan</Button>
        </div>
        <DataTable columns={salesColumns} data={filteredData} />
      </div>
      <DialogCreateSales open={DialogSalesOpen} setOpen={setDialogSalesOpen} />
    </>
  );
}
