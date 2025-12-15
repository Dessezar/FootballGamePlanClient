import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGamePlanById } from "../services/gamePlanService";
import type { GamePlan } from "../types/gamePlan";

export default function GamePlanDetailsPage() {
  const { id } = useParams();
  const gamePlanId = Number(id);

  const [gamePlan, setGamePlan] = useState<GamePlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Number.isNaN(gamePlanId)) return;

    (async () => {
      try {
        setError(null);
        const gp = await getGamePlanById(gamePlanId);
        setGamePlan(gp);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Okänt fel");
      }
    })();
  }, [gamePlanId]);

  if (Number.isNaN(gamePlanId)) {
    return <div className="p-6 text-slate-50">Felaktigt id i URL.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">{gamePlan ? gamePlan.name : "Laddar..."}</h1>
          <Link to="/" className="text-sm text-yellow-300">Tillbaka</Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-400/40 bg-red-900/20 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm text-slate-300">
            Nästa steg: här ska vi lista plays och registrera outcome.
          </p>
          <p className="mt-2 text-xs text-slate-400">GamePlanId: {gamePlanId}</p>
        </div>
      </div>
    </div>
  );
}
