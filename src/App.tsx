import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { GamePlan } from "./types/gamePlan";
import { getGamePlans, deleteGamePlan } from "./services/gamePlanService";
import logo from "../src/assets/tact-IQ-callLogo.png";
import logo1 from "../src/assets/604d40c1-be95-4507-879f-e68294675769-md.jpeg";

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
        <header className="flex items-end justify-left gap-4">
          <img
            src="../src/assets/tact-IQ-callLogo.png"
            alt=""
            className="h-30 w-30"
          />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Tact-IQ-all</h1>
            <p className="text-m text-slate-400">
              Real-time insight. Real sideline impact
            </p>
          </div>
          {/* <div className="h-10 w-10 rounded-full border border-yellow-400/60 bg-slate-900/80" /> */}
        </header>

        <button
          onClick={() => navigate("/gameplans/new")}
          className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950"
        >
          Create GamePlan
        </button>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">All GamePlans</h2>
            <span className="text-xs text-slate-400">
              {gamePlans.length} st
            </span>
          </div>

          {gamePlans.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
              No GamePlans yet. Create your first GamePlan!
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
                      Click to call Plays
                    </div>
                  </button>

                  <button
                    onClick={() => handleDelete(gp.id)}
                    className="mt-2 text-xs text-red-400"
                  >
                    Delete
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
