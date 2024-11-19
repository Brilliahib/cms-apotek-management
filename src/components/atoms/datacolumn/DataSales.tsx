"use client";

import { ColumnDef } from "@tanstack/react-table";

import ActionButton from "@/components/molecules/datatable/ActionButton";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Eye, SquarePen } from "lucide-react";
import { convertRupiah } from "@/utils/convertRupiah";
import { Sales } from "@/types/sales/sales";

export const salesColumns: ColumnDef<Sales>[] = [
  {
    accessorKey: "index",
    header: "No",
    cell: ({ row }) => {
      return <p suppressHydrationWarning>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Obat",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.medicine.name}
        </p>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: "Kuantitas/Banyak",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data.quantity}
        </p>
      );
    },
  },
  {
    accessorKey: "medicine",
    header: "Harga Satuan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data ? convertRupiah(data?.medicine.price) : "Loading..."}
        </p>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: "Harga Total",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p suppressHydrationWarning className="md:line-clamp-2 line-clamp-1">
          {data ? convertRupiah(data?.total_price) : "Loading..."}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <ActionButton>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"#"} className="flex items-center text-gray-700">
              <SquarePen className="h-4 w-4" />
              <span className="ml-2">Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"#"} className="flex items-center text-gray-700">
              <Eye className="h-4 w-4" />
              <span className="ml-2">Detail</span>
            </Link>
          </DropdownMenuItem>
        </ActionButton>
      );
    },
  },
];
