import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getGamePlanById } from "../services/gamePlanService";
import type { GamePlan } from "../types/gamePlan";
import type { Play } from "../types/play";
import { RunPlayDialog } from "../components/RunPlayDialog";

export default function GamePlanDetailsPage() {
  const { id } = useParams();
  const gamePlanId = Number(id);

  const [gamePlan, setGamePlan] = useState<GamePlan | null>(null);
  const [selectedPlay, setSelectedPlay] = useState<Play | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadGamePlan() {
    try {
      setError(null);
      const gp = await getGamePlanById(gamePlanId);
      setGamePlan(gp);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Okänt fel");
    }
  }

  useEffect(() => {
    if (!Number.isNaN(gamePlanId)) {
      loadGamePlan();
    }
  }, [gamePlanId]);

  function handleOpenDialog(play: Play) {
    setSelectedPlay(play);
    setIsDialogOpen(true);
  }

  function handleSuccess() {
    loadGamePlan();
  }

  if (Number.isNaN(gamePlanId)) {
    return <div className="p-6 text-slate-50">Felaktigt id i URL.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {gamePlan ? gamePlan.name : "Laddar..."}
          </h1>
          <Link
            to="/"
            className="text-sm text-yellow-300 hover:text-yellow-200"
          >
            Tillbaka
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/40 bg-red-900/20 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {gamePlan ? gamePlan.name : "Laddar..."}
            </h1>
            <div className="flex gap-2">
              <Link
                to={`/gameplans/${gamePlanId}/statistics`}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
              >
                Statistics
              </Link>
            </div>
          </div>
          <h2 className="mb-4 text-lg font-semibold">Plays</h2>
          {!gamePlan ? (
            <p className="text-sm text-slate-400">Laddar plays...</p>
          ) : gamePlan.plays.length === 0 ? (
            <p className="text-sm text-slate-400">
              Inga plays på denna gameplan ännu.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {gamePlan.plays.map((play) => (
                <button
                  key={play.id}
                  onClick={() => handleOpenDialog(play)}
                  className="flex h-24 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/40 p-3 text-center transition-colors hover:border-yellow-400/70"
                >
                  <div className="text-sm font-semibold">{play.name}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    {play.isPass ? "Pass" : "Run"}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <RunPlayDialog
          play={selectedPlay}
          gamePlanId={gamePlanId}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}
