import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { getGamePlanById } from "../services/gamePlanService";
import type { GamePlan } from "../types/gamePlan";

type PlayStats = {
  id: number;
  name: string;
  type: "run" | "pass";
  avgYards: number;
  successRate: number;
  timesRan: number;
};

export default function GamePlanStatisticsPage() {
  const { id } = useParams();
  const gamePlanId = Number(id);

  const [gamePlan, setGamePlan] = useState<GamePlan | null>(null);
  const [filter, setFilter] = useState<"all" | "run" | "pass">("all");
  const [sortBy, setSortBy] = useState<"name" | "avgYards" | "successRate">(
    "name"
  );
  const [sortAsc, setSortAsc] = useState(true);
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

  const playStats = useMemo<PlayStats[]>(() => {
    console.log("🔍 GamePlan:", gamePlan);

    if (!gamePlan) return [];
    console.log("🔍 Plays:", gamePlan.plays);

    return gamePlan.plays
      .filter((play) => play.results && play.results.length > 0)
      .map((play) => {
        console.log(`🔍 Play: ${play.name}, Results:`, play.results);

        const totalYards = play.results!.reduce(
          (sum, r) => sum + r.yardsGained,
          0
        );
        const successfulPlays = play.results!.filter(
          (r) => r.isSuccessful
        ).length;

        return {
          id: play.id,
          name: play.name,
          type: play.isPass ? ("pass" as const) : ("run" as const),
          avgYards: totalYards / play.results!.length,
          successRate: (successfulPlays / play.results!.length) * 100,
          timesRan: play.results!.length,
        };
      });
  }, [gamePlan]);

  const filteredAndSorted = useMemo(() => {
    let filtered = playStats;

    if (filter !== "all") {
      filtered = playStats.filter((p) => p.type === filter);
    }

    return filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }

      return sortAsc
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [playStats, filter, sortBy, sortAsc]);

  function handleSort(column: "name" | "avgYards" | "successRate") {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  }

  if (Number.isNaN(gamePlanId)) {
    return <div className="p-6 text-slate-50">Felaktigt id i URL.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {gamePlan ? `${gamePlan.name} - Statistics` : "Laddar..."}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Key statistics for each play in your gameplan.
            </p>
          </div>
          <Link
            to={`/gameplans/${gamePlanId}`}
            className="text-sm text-yellow-300 hover:text-yellow-200"
          >
            Back to Gameplan
          </Link>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-400/40 bg-red-900/20 p-3 text-sm">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  filter === "all"
                    ? "bg-yellow-400 text-slate-950"
                    : "border border-slate-700 hover:bg-slate-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("run")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  filter === "run"
                    ? "bg-yellow-400 text-slate-950"
                    : "border border-slate-700 hover:bg-slate-800"
                }`}
              >
                Run
              </button>
              <button
                onClick={() => setFilter("pass")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  filter === "pass"
                    ? "bg-yellow-400 text-slate-950"
                    : "border border-slate-700 hover:bg-slate-800"
                }`}
              >
                Pass
              </button>
            </div>
          </div>

          {filteredAndSorted.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">
              {playStats.length === 0
                ? "No plays have been run yet. Run some plays to see stats."
                : "No plays match the current filter."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="pb-3 text-left">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-200"
                      >
                        Play Name
                        <span className="text-xs">
                          {sortBy === "name" ? (sortAsc ? "▲" : "▼") : "⇅"}
                        </span>
                      </button>
                    </th>
                    <th className="pb-3 text-center">
                      <span className="text-sm font-semibold text-slate-400">
                        Type
                      </span>
                    </th>
                    <th className="pb-3 text-center">
                      <span className="text-sm font-semibold text-slate-400">
                        Times Ran
                      </span>
                    </th>
                    <th className="pb-3 text-right">
                      <button
                        onClick={() => handleSort("avgYards")}
                        className="flex items-center justify-end gap-2 text-sm font-semibold text-slate-400 hover:text-slate-200 ml-auto"
                      >
                        Avg. Yards
                        <span className="text-xs">
                          {sortBy === "avgYards" ? (sortAsc ? "▲" : "▼") : "⇅"}
                        </span>
                      </button>
                    </th>
                    <th className="pb-3 text-right">
                      <button
                        onClick={() => handleSort("successRate")}
                        className="flex items-center justify-end gap-2 text-sm font-semibold text-slate-400 hover:text-slate-200 ml-auto"
                      >
                        Success Rate
                        <span className="text-xs">
                          {sortBy === "successRate"
                            ? sortAsc
                              ? "▲"
                              : "▼"
                            : "⇅"}
                        </span>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSorted.map((play) => (
                    <tr key={play.id} className="border-b border-slate-800/50">
                      <td className="py-3 font-medium">{play.name}</td>
                      <td className="py-3 text-center">
                        <span className="rounded-full bg-slate-800 px-2 py-1 text-xs capitalize">
                          {play.type}
                        </span>
                      </td>
                      <td className="py-3 text-center text-slate-400">
                        {play.timesRan}
                      </td>
                      <td className="py-3 text-right font-semibold">
                        {play.avgYards.toFixed(1)}
                      </td>
                      <td className="py-3 text-right font-semibold">
                        {play.successRate.toFixed(0)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
