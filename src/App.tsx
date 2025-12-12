import { CreateGamePlanForm } from "./components/CreateGamePlanForm";
import { GamePlanList } from "./components/GamePlanList";
import { useGamePlans } from "./hooks/useGamePlans";

function App() {
  const { gamePlans, loading, addGamePlan, removeGamePlan } = useGamePlans();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Gridiron GamePlans</h1>

      <CreateGamePlanForm onCreate={addGamePlan} />

      {loading ? (
        <p>Laddar...</p>
      ) : (
        <GamePlanList gamePlans={gamePlans} onDelete={removeGamePlan} />
      )}
    </div>
  );
}

export default App;
