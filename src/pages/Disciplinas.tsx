import DashboardLayout from "../layouts/DashboardLayout";
import DisciplinasHeader from "../components/Disciplinas/DisciplinasHeader";
import DisciplinasTable from "../components/Disciplinas/DisciplinasTable";

export default function Disciplinas() {
  return (
    <DashboardLayout>
      <DisciplinasHeader />
      <DisciplinasTable />
    </DashboardLayout>
  );
}
