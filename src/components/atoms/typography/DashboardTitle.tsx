interface DashboardTitleProps {
  title: string;
}

export default function DashboardTitle({ title }: DashboardTitleProps) {
  return (
    <>
      <div className="space-y-3">
        <h1 className="font-paytone text-4xl">{title}</h1>
      </div>
    </>
  );
}
