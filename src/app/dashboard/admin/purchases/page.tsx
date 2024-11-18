import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardPurchasesAdminContent from "@/components/organism/dashboard/admin/purchases/DashboardPurchasesAdminContent";

export default function DashboardAdminPurchase() {
  return (
    <>
      <DashboardTitle title="Pembelian" />
      <DashboardPurchasesAdminContent />
    </>
  );
}
