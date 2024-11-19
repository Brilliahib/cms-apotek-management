"use client";

import { purchaseColumns } from "@/components/atoms/datacolumn/DataPurchase";
import DialogCreatePurchase from "@/components/atoms/dialog/DialogCreatePurchase";
import SearchInput from "@/components/atoms/search/SearchInput";
import { DataTable } from "@/components/molecules/datatable/DataTable";
import { Button } from "@/components/ui/button";
import { useGetAllPurchase } from "@/http/purchases/get-all-purchase";
import { useSession } from "next-auth/react";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { convertRupiah } from "@/utils/convertRupiah";
import { Download, Plus } from "lucide-react";

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

  const [DialogCreatePurchaseOpen, setDialogCreatePurchaseOpen] =
    useState(false);

  const handlePurchaseDialogOpen = () => {
    setDialogCreatePurchaseOpen(true);
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const now = new Date();
    const currentDateTime = now.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(18);
    const title = "Laporan Pembelian";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    doc.setFontSize(10);
    doc.text(currentDateTime, pageWidth - 10, 10, { align: "right" });

    const tableData = filteredData.map((purchase, index) => [
      index + 1,
      purchase.medicine.name,
      purchase.quantity,
      convertRupiah(purchase.total_price),
      new Date(purchase.created_at).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [["No", "Nama Obat", "Jumlah", "Harga", "Tanggal"]],
      body: tableData,
      startY: 30,
      margin: { top: 10 },
    });

    doc.save("Laporan Pembelian.pdf");
  };

  return (
    <>
      <div className="py-6 md:space-y-6 space-y-4">
        <div className="flex md:flex-row flex-col gap-4 justify-between">
          <SearchInput
            onSearch={setSearchQuery}
            className="min-w-[250px]"
            props="Cari pembelian..."
          />
          <div className="flex gap-4">
            <Button onClick={generatePDFReport} variant={"outline"}>
              <Download /> Unduh Laporan
            </Button>
            <Button onClick={handlePurchaseDialogOpen}>
              <Plus /> Buat Pembelian
            </Button>
          </div>
        </div>
        <DataTable columns={purchaseColumns} data={filteredData} />
      </div>
      <DialogCreatePurchase
        open={DialogCreatePurchaseOpen}
        setOpen={setDialogCreatePurchaseOpen}
      />
    </>
  );
}
