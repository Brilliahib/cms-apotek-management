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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { convertRupiah } from "@/utils/convertRupiah";
import { Download, Plus } from "lucide-react";

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

  const generatePDFReport = () => {
    const doc = new jsPDF();

    const now = new Date();
    const currentDateTime = now.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "short",
    });

    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(18);
    const title = "Laporan Penjualan";
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

    doc.save("Laporan Penjualan.pdf");
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
          <div className="flex gap-4">
            <Button onClick={generatePDFReport} variant={"outline"}>
              <Download /> Unduh Laporan
            </Button>
            <Button onClick={handleSalesDialogOpen}>
              <Plus /> Buat Penjualan
            </Button>
          </div>
        </div>
        <DataTable columns={salesColumns} data={filteredData} />
      </div>
      <DialogCreateSales open={DialogSalesOpen} setOpen={setDialogSalesOpen} />
    </>
  );
}
