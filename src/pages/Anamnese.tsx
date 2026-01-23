import DashboardLayout from "../layouts/DashboardLayout";
import AnamneseHeader from "../components/Anamnese/AnamneseHeader";
import AnamneseTable from "../components/Anamnese/AnamneseTable";

export default function Anamnese() {
  return (
    <DashboardLayout>
      <AnamneseHeader />
      <AnamneseTable />
    </DashboardLayout>
  );
}
