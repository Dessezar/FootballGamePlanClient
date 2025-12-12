import type { GamePlan } from "../types/gamePlan";

type Props = {
  gamePlans: GamePlan[];
  onDelete: (id: number) => void;
};

export function GamePlanList({ gamePlans, onDelete }: Props) {
  if (gamePlans.length === 0) {
    return <p className="text-slate-400">Inga gameplans ännu.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {gamePlans.map((gp) => (
        <div
          key={gp.id}
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
        >
          <span className="text-sm font-semibold">{gp.name}</span>

          <button
            onClick={() => onDelete(gp.id)}
            className="mt-2 text-xs text-red-400"
          >
            Ta bort
          </button>
        </div>
      ))}
    </div>
  );
}
