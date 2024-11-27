import DashboardTitle from "@/components/atoms/typography/DashboardTitle";
import DashboardMedicalRecordsContent from "@/components/organism/dashboard/records/DashboardRecordContent";

export default function DashboardRecordsPage() {
  return (
    <>
      <DashboardTitle title="Rekam Medis" />
      <DashboardMedicalRecordsContent />
    </>
  );
}
