import { useState, type FormEvent } from "react";

type Props = {
  onCreate: (name: string) => void;
};

export function CreateGamePlanForm({ onCreate }: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    onCreate(trimmed);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Namn på gameplan"
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-slate-950"
      >
        Create
      </button>
    </form>
  );
}
