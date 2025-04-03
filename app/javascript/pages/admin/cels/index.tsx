
import {CelCard} from "../../../components/cels/admin/CelCard.tsx";
import {useTheme} from "../../../hooks/useTheme.ts";

export default function Index({cels}) {
    const {_, toggleTheme } = useTheme();

    return (
        <>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 flex-1">
                Administration des CELs
            </h1>

            <main className="flex flex-col gap-2">
                {cels.map((cel) => (
                    <CelCard
                        key={cel.id}
                        cel={cel}
                    />
                ))}
            </main>
        </>
    );
}

