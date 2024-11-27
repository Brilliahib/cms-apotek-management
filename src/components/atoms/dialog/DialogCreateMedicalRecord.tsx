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
import {
  medicalRecordSchema,
  MedicalRecordType,
} from "@/validators/records/record-validator";
import { useAddMedicalRecord } from "@/http/records/add-record";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateMedicalRecord({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const { data: session, status } = useSession();
  const form = useForm<MedicalRecordType>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      medicine_id: 0,
      name: "",
      phone_number: "",
      date_of_birth: "",
      medical_notes: "",
      prescription: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addMedicalRecordHandler, isPending } = useAddMedicalRecord({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan rekam medis!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan rekam medis!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["medical-record-list"],
      });
      router.refresh();
    },
  });

  const { data } = useGetAllMedicines(session?.access_token as string, {
    enabled: status === "authenticated",
  });

  const onSubmit = (body: MedicalRecordType) => {
    addMedicalRecordHandler(body);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Rekam Medis</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-5 pt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nomor telepon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Masukkan tanggal lahir"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="medical_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan Medis</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan catatan medis (opsional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resep</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan resep (opsional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                              {medicine.name}
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
