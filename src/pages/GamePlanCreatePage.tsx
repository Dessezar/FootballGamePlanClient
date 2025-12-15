import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreateGamePlanForm } from "../components/CreateGamePlanForm";
import { PlayDraftBuilder } from "../components/PlayDraftBuilder";
import type { Play } from "../types/play";
import {
  createGamePlan,
  addPlaysToGamePlan,
} from "../services/gamePlanService";

export default function GamePlanCreatePage() {
  const navigate = useNavigate();

  const [plays, setPlays] = useState<Play[]>([]);
  const [gamePlanName, setGamePlanName] = useState<string>(""); // för att visa vald name
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addDraftPlay(play: Play) {
    setPlays((prev) => [play, ...prev]);
  }

  function removeDraftPlay(tempId: number) {
    setPlays((prev) => prev.filter((p) => p.tempId !== tempId));
  }

  // Vi återanvänder din CreateGamePlanForm men behöver fånga name i page-nivå.
  async function handleCreate(name: string) {
    try {
      setError(null);
      setSaving(true);
      setGamePlanName(name);

      const created = await createGamePlan(name);

      // Skicka alla plays på en gång!
      if (plays.length > 0) {
        const playsDto = plays.map((p) => ({ name: p.name, isPass: p.isPass }));
        await addPlaysToGamePlan(created.id, playsDto);
      }

      setSaving(false);
      navigate(`/gameplans/${created.id}`);
    } catch (e) {
      setSaving(false);
      setError(e instanceof Error ? e.message : "Okänt fel");
    }
  }
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-6 sm:max-w-2xl">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Skapa GamePlan
            </h1>
            <p className="text-sm text-slate-400">
              Lägg till plays här. På nästa sida används de i matchläge.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm text-yellow-300 hover:text-yellow-200"
          >
            Tillbaka
          </Link>
        </header>

        {error && (
          <div className="rounded-xl border border-red-400/40 bg-red-900/20 p-3 text-sm">
            {error}
          </div>
        )}

        {/* 1) Namn */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg">
          <h2 className="mb-3 text-lg font-semibold">Namn på GamePlan</h2>
          <CreateGamePlanForm onCreate={handleCreate} />
          <p className="mt-2 text-xs text-slate-400">
            Du kan lägga till plays nedan innan du klickar Skapa.
          </p>
        </section>

        {/* 2) Plays */}
        <PlayDraftBuilder
          plays={plays}
          onAdd={addDraftPlay}
          onRemove={removeDraftPlay}
        />

        {/* 3) Status */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
          <div>
            Valt namn:{" "}
            <span className="font-semibold">
              {gamePlanName || "inte satt ännu"}
            </span>
          </div>
          <div>
            Plays att spara:{" "}
            <span className="font-semibold">{plays.length}</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            När du klickar Skapa ovan skapas först gameplanen, sedan sparas
            varje play i din Azure SQL via API.
          </div>
          {saving && <div className="mt-2 text-yellow-300">Sparar...</div>}
        </div>
      </div>
    </div>
  );
}
