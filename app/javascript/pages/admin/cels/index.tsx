import { CelCard } from "../../../components/cels/admin/CelCard.tsx";
import { useTheme } from "../../../hooks/useTheme.ts";
import { Cel } from "../../../interfaces/cel/cel.ts";

function Index({ cels }: { cels: Cel[] }) {
  const {} = useTheme();

  return (
    <div className="flex flex-col gap-2 xl:max-w-2/3 mx-auto">
      {cels.map((cel: Cel) => (
        <CelCard key={cel.id} cel={cel} />
      ))}
      <div className={"m-2"}>
        <CelCard />
      </div>
    </div>
  );
}

export default Index;
