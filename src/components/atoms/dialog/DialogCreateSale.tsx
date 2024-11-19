import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { Image as ImageIcon, Trash2, Upload as UploadIcon } from "lucide-react";
import Image from "next/image";
import {
  purchaseSchema,
  PurchaseType,
} from "@/validators/purchase/purchase-validator";
import { useAddPurchase } from "@/http/purchases/add-purchase";
import { useSession } from "next-auth/react";
import { useGetAllMedicines } from "@/http/medicines/get-all-medicine";
import { saleSchema, SaleType } from "@/validators/sale/sale-validator";
import { useAddSale } from "@/http/sales/add-sales";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateSales({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const { data: session, status } = useSession();
  const form = useForm<SaleType>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      pharmacy_id: 1,
      user_id: session?.user.id,
      medicine_id: 0,
      quantity: 0,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addSaleHandler, isPending } = useAddSale({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menjual obat!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menjual obat!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["sales-list"],
      });
      router.refresh();
    },
  });

  const { data } = useGetAllMedicines(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const onSubmit = (body: SaleType) => {
    addSaleHandler(body);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Penjualan Obat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="medicine_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daftar Obat</FormLabel>
                  <FormControl>
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Daftar Obat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Daftar Obat</SelectLabel>
                          {data?.data.map((medicine) => (
                            <SelectItem
                              key={medicine.id}
                              value={String(medicine.id)}
                            >
                              {medicine.name}{" "}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kuantitas/Banyak</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan banyak obat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
