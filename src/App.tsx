import { useNavigate } from "react-router-dom";
import { useState, type FormEvent, useEffect } from "react";
import type { GamePlan } from "./types/gamePlan";
import { getGamePlans, createGamePlan } from "./services/gamePlanService";

function App() {
  const navigate = useNavigate();

  const [gamePlans, setGamePlans] = useState<GamePlan[]>([]);
  const [name, setName] = useState("");

  // Hämta gameplans från API vid start
  useEffect(() => {
    (async () => {
      const gps = await getGamePlans();
      setGamePlans(gps);
    })();
  }, []);

  async function handleCreateGamePlan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    const created = await createGamePlan(trimmed);
    setGamePlans((prev) => [created, ...prev]);
    setName("");
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

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg">
          <h2 className="mb-3 text-lg font-semibold">Skapa ny GamePlan</h2>

          <form
            onSubmit={handleCreateGamePlan}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              placeholder="Namn på gameplan, t.ex. AIK vs Djurgården"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none ring-0 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md transition hover:bg-yellow-300 disabled:opacity-40"
              disabled={!name.trim()}
            >
              Skapa
            </button>
          </form>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Dina GamePlans</h2>
            <span className="text-xs text-slate-400">
              {gamePlans.length} st
            </span>
          </div>

          {gamePlans.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-6 text-sm text-slate-400">
              Du har inga gameplans ännu. Skapa din första ovanför.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {gamePlans.map((gp) => (
                <button
                  key={gp.id}
                  onClick={() => navigate(`/gameplans/${gp.id}`)}
                  className="flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left shadow-sm transition hover:border-yellow-400/70 hover:shadow-lg active:scale-[0.99]"
                >
                  <span className="mb-1 text-sm font-semibold">{gp.name}</span>
                  <span className="text-xs text-slate-400">
                    Klicka för att hantera plays
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
