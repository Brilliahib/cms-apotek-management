"use client";

import { medicalRecordColumns } from "@/components/atoms/datacolumn/DataMedicalRecord";
import DialogCreateMedicalRecord from "@/components/atoms/dialog/DialogCreateMedicalRecord";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllMedicalRecords } from "@/http/records/get-all-records";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardMedicalRecordsContent() {
  const { data: session, status } = useSession();
  const { data, isPending } = useGetAllMedicalRecords(
    session?.access_token as string,
    {
      enabled: status === "authenticated",
    }
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [DialogMedicalRecordOpen, setDialogMedicalRecordOpen] = useState(false);

  const handleMedicalRecordDialog = () => {
    setDialogMedicalRecordOpen(true);
  };

  const filteredData =
    data?.data.filter((medicine) =>
      medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari nama pasien..."
          />
          <Button onClick={handleMedicalRecordDialog}>
            <Plus /> Buat Rekam Medis
          </Button>
        </div>
        <DataTable columns={medicalRecordColumns} data={filteredData} />
      </div>
      <DialogCreateMedicalRecord
        open={DialogMedicalRecordOpen}
        setOpen={setDialogMedicalRecordOpen}
      />
    </>
  );
}
