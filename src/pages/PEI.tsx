import DashboardLayout from "../layouts/DashboardLayout";
import PEIHeader from "../components/PEI/PEIHeader";
import PEITable from "../components/PEI/PEITable.tsx";

export default function PEI() {
  return (
    <DashboardLayout>
      <PEIHeader />
      <PEITable />
    </DashboardLayout>
  );
}
