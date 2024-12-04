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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useAddMedicine } from "@/http/medicines/add-medicine";
import {
  medicineSchema,
  MedicineType,
} from "@/validators/medicines/medicine-validators";

interface DialogCreateArticleProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogCreateMedicine({
  open,
  setOpen,
}: DialogCreateArticleProps) {
  const form = useForm<MedicineType>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      name: "",
      supplier_id: 4,
      stock: 0,
      price: 0,
      pharmacy_price: 0,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: addMedicineHandler, isPending } = useAddMedicine({
    onError: (error: AxiosError<any>) => {
      toast({
        title: "Gagal menambahkan obat!",
        description: error.response?.data.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Berhasil menambahkan obat!",
        variant: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["medicine-list"],
      });
      router.refresh();
    },
  });

  const onSubmit = (body: MedicineType) => {
    addMedicineHandler(body);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Obat</DialogTitle>
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
                  <FormLabel>Nama Obat</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Masukkan nama obat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stok</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan jumlah stok"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan harga obat"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pharmacy_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Apotek</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan harga apotek"
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
