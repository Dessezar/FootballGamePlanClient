import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { GamePlan } from "./types/gamePlan";
import { getGamePlans, deleteGamePlan } from "./services/gamePlanService";

function App() {
  const navigate = useNavigate();
  const [gamePlans, setGamePlans] = useState<GamePlan[]>([]);

  useEffect(() => {
    (async () => {
      const gps = await getGamePlans();
      setGamePlans(gps);
    })();
  }, []);

  async function handleDelete(id: number) {
    await deleteGamePlan(id);
    setGamePlans((prev) => prev.filter((gp) => gp.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-6 sm:max-w-2xl">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Gridiron GamePlans
            </h1>
            <p className="text-sm text-slate-400">
              Skapa och organisera gameplans för dina matcher.
            </p>
          </div>
          <div className="h-10 w-10 rounded-full border border-yellow-400/60 bg-slate-900/80" />
        </header>

        <button
          onClick={() => navigate("/gameplans/new")}
          className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Skapa ny GamePlan
        </button>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dina GamePlans</h2>
            <span className="text-xs text-slate-400">
              {gamePlans.length} st
            </span>
          </div>

          {gamePlans.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
              Du har inga gameplans ännu. Skapa din första.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {gamePlans.map((gp) => (
                <div
                  key={gp.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4"
                >
                  <button
                    onClick={() => navigate(`/gameplans/${gp.id}`)}
                    className="w-full text-left"
                  >
                    <div className="text-sm font-semibold">{gp.name}</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Klicka för matchläge
                    </div>
                  </button>

                  <button
                    onClick={() => handleDelete(gp.id)}
                    className="mt-2 text-xs text-red-400"
                  >
                    Ta bort
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
