"use client";

import { medicineColumns } from "@/components/atoms/datacolumn/DataMedicine";
import { salesColumns } from "@/components/atoms/datacolumn/DataSales";
import DialogCreateMedicine from "@/components/atoms/dialog/DialogCreateMedicines";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllMedicines } from "@/http/medicines/get-all-medicine";
import { useGetAllSales } from "@/http/sales/get-all-sales";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardMedicineContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllMedicines(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData =
    data?.data.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const [DialogMedicineOpen, setDialogMedicineOpen] = useState(false);

  const handleDialogMedicineOpen = () => {
    setDialogMedicineOpen(true);
  };

  return (
    <>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari obat..."
          />
          <Button onClick={handleDialogMedicineOpen}>
            <Plus /> Tambah Obat
          </Button>
        </div>
        <DataTable columns={medicineColumns} data={filteredData} />
      </div>
      <DialogCreateMedicine
        open={DialogMedicineOpen}
        setOpen={setDialogMedicineOpen}
      />
    </>
  );
}
