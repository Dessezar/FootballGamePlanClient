import { useState, type FormEvent } from "react";
import type { GamePlan } from "./types";

// TODO: senare hämtar vi detta från din .NET backend istället.
// Nu kör vi allt i minnet bara för att få upp UI:t.
function App() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [gamePlans, setGamePlans] = useState<GamePlan[]>([]); // lista med gameplans
  const [name, setName] = useState("");                       // inputfält för nytt namn

  // -----------------------------
  // HANDLERS
  // -----------------------------

  // När man skickar in formuläret för att skapa en ny gameplan
  function handleCreateGamePlan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    // Skapa en ny gameplan. ID är bara en enkel lokal räknare just nu.
    const newGamePlan: GamePlan = {
      id: Date.now(),
      name: trimmed,
    };

    // Uppdatera state
    setGamePlans((prev) => [newGamePlan, ...prev]);

    // Töm input
    setName("");
  }

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Wrapper för att centrera innehållet på sidan */}
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-6 sm:max-w-2xl">
        {/* Header / Topbar */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Gridiron GamePlans
            </h1>
            <p className="text-sm text-slate-400">
              Skapa och organisera gameplans för dina matcher.
            </p>
          </div>

          {/* Här kan vi senare lägga till profilknapp / darkmode toggle */}
          <div className="h-10 w-10 rounded-full border border-yellow-400/60 bg-slate-900/80" />
        </header>

        {/* Kort med formulär för att skapa ny GamePlan */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg">
          <h2 className="mb-3 text-lg font-semibold">
            Skapa ny GamePlan
          </h2>

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

          <p className="mt-2 text-xs text-slate-400">
            Tips: börja med en gameplan per motståndare eller matchsituation.
          </p>
        </section>

        {/* Lista med gameplans */}
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
                  // Senare: navigate till /gameplans/{id} eller öppna plays-grid
                  onClick={() => {
                    console.log("Open gameplan", gp.id);
                  }}
                  className="flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-left shadow-sm transition hover:border-yellow-400/70 hover:shadow-lg active:scale-[0.99]"
                >
                  <span className="mb-1 text-sm font-semibold">
                    {gp.name}
                  </span>
                  <span className="text-xs text-slate-400">
                    0 plays • statistik kommer senare
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
