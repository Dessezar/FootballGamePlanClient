import { useState, type FormEvent } from "react";
import type { Play } from "../types/play";

type Props = {
  plays: Play[];
  onAdd: (play: Play) => void;
  onRemove: (tempId: number) => void;
};

export function PlayDraftBuilder({ plays, onAdd, onRemove }: Props) {
  const [name, setName] = useState("");
  const [isPass, setIsPass] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    onAdd({
      tempId: Date.now(),
      name: trimmed,
      isPass,
    });

    setName("");
    setIsPass(false);
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-lg">
      <h2 className="mb-3 text-lg font-semibold">Lägg till plays</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="flex-1">
          <label className="mb-1 block text-xs text-slate-400">Play name</label>
          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="t ex Inside Zone"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={isPass}
            onChange={(e) => setIsPass(e.target.checked)}
          />
          Pass
        </label>

        <button
          type="submit"
          disabled={!name.trim()}
          className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-40"
        >
          Add play
        </button>
      </form>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Plays som kommer sparas</h3>
          <span className="text-xs text-slate-400">{plays.length} st</span>
        </div>

        {plays.length === 0 ? (
          <p className="mt-2 text-sm text-slate-400">Inga plays ännu.</p>
        ) : (
          <div className="mt-2 grid grid-cols-1 gap-2">
            {plays.map((p) => (
              <div
                key={p.tempId}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-3"
              >
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-slate-400">
                    {p.isPass ? "Pass" : "Run"}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(p.tempId)}
                  className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-yellow-400/70"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
