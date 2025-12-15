import { useState } from "react";
import type { Play } from "../types/play";
import type { Coverage, PassFailReason } from "../types/playResult";
import { addPlayResult } from "../services/gamePlanService";

type Props = {
  play: Play | null;
  gamePlanId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function RunPlayDialog({
  play,
  gamePlanId,
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [yards, setYards] = useState(0);
  const [coverage, setCoverage] = useState<Coverage>(0);
  const [passFailReason, setPassFailReason] = useState<PassFailReason>(0);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [saving, setSaving] = useState(false);

  if (!isOpen || !play) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!play) return;

    try {
      setSaving(true);
      await addPlayResult(play.id, gamePlanId, {
        coverage,
        isPass: play.isPass,
        passFailReason,
        yardsGained: yards,
        isSuccessful,
      });

      setSaving(false);
      onSuccess();
      onClose();

      setYards(0);
      setCoverage(0);
      setPassFailReason(0);
      setIsSuccessful(true);
    } catch (error) {
      setSaving(false);
      alert("Failed to save play result");
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-bold">Run Play: {play.name}</h2>
        <p className="mb-4 text-sm text-slate-400">
          {play.isPass ? "Pass Play" : "Run Play"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-400">
              Yards Gained/Lost
            </label>
            <input
              type="number"
              value={yards}
              onChange={(e) => setYards(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="0"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-400">
              Defense Faced
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCoverage(0)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
                  coverage === 0
                    ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                    : "border-slate-700 hover:bg-slate-800"
                }`}
              >
                Man/Blitz
              </button>
              <button
                type="button"
                onClick={() => setCoverage(1)}
                className={`flex-1 rounded-xl border px-3 py-2 text-sm ${
                  coverage === 1
                    ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                    : "border-slate-700 hover:bg-slate-800"
                }`}
              >
                Zone
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/40 p-3">
            <span className="text-sm text-slate-400">Successful Play?</span>
            <button
              type="button"
              onClick={() => setIsSuccessful(!isSuccessful)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isSuccessful ? "bg-yellow-400" : "bg-slate-700"
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-slate-950 transition-transform ${
                  isSuccessful ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-40"
            >
              {saving ? "Saving..." : "Save Outcome"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
