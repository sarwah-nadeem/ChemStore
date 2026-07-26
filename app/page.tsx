"use client";

import { useState } from "react";

export default function Home() {
  const [chemical, setChemical] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!chemical.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/chemical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chemical }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F6F3EC]">
      <div
        className="h-3 w-full relative z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1C2321, #1C2321 12px, #E8A33D 12px, #E8A33D 24px)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 text-[#1C2321]">
        <svg className="absolute -left-10 top-16 w-56 h-56 opacity-[0.06] -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7">
          <path d="M9 2h6M10 2v6l-6 11a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-11V2" strokeLinejoin="round" />
          <path d="M6.5 15h11" />
        </svg>
        <svg className="absolute -right-16 bottom-10 w-72 h-72 opacity-[0.06] rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.6">
          <rect x="4" y="4" width="16" height="16" rx="1.5" transform="rotate(45 12 12)" />
        </svg>
        <svg className="absolute right-6 top-1/3 w-40 h-40 opacity-[0.07]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7">
          <circle cx="6" cy="6" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="12" cy="16" r="2.4" />
          <path d="M7.6 7.2 10.2 14M16.4 7.2 13.8 14M8 6h8" />
        </svg>
        <svg className="absolute left-10 bottom-24 w-32 h-32 opacity-[0.06] -rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7">
          <path d="M12 3 22 20H2Z" strokeLinejoin="round" />
          <path d="M12 9v5" />
          <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
        </svg>
        <svg className="absolute right-8 top-6 w-36 h-36 opacity-[0.06] rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.7">
          <rect x="4" y="2" width="16" height="20" rx="1" />
          <path d="M4 9h16M4 15.5h16M12 2v20" />
          <circle cx="9.5" cy="12" r="0.4" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="18.5" r="0.4" fill="currentColor" stroke="none" />
        </svg>
        <svg className="absolute left-6 top-1/2 w-24 h-24 opacity-[0.07] -rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M12 14.5V4a2 2 0 1 0-4 0v10.5a4 4 0 1 0 4 0Z" strokeLinejoin="round" />
          <circle cx="10" cy="17" r="1.4" fill="currentColor" stroke="none" />
          <path d="M12 7h1.5M12 10h1.5" />
        </svg>
        <svg className="absolute right-1/4 bottom-6 w-28 h-28 opacity-[0.06] rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="5" y="10" width="14" height="10" rx="1.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <main className="relative flex flex-col items-center px-4 py-16 sm:py-20">
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-16 h-16 mb-5">
            <div className="absolute inset-0 rotate-45 rounded-md bg-[#1C2321]" />
            <div className="absolute inset-[3px] rotate-45 rounded-sm bg-[#E8A33D] flex items-center justify-center">
              <span className="-rotate-45 font-[family-name:var(--font-display)] text-[#1C2321] text-xs font-bold tracking-wider">
                CS
              </span>
            </div>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight text-center">
            <span className="text-[#E8A33D]">Chem</span>
            <span className="text-[#1C2321]">Store</span>
          </h1>
          <p className="mt-3 text-[#1C2321]/60 text-center max-w-md font-[family-name:var(--font-body)] text-sm sm:text-base">
            Enter a chemical name. Get safe storage instructions, backed by AI, in seconds.
          </p>
        </div>

        <div className="w-full max-w-md">
          <label className="block font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#1C2321]/50 mb-2 pl-1">
            Chemical Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={chemical}
              onChange={(e) => setChemical(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Bleach, Ammonia, Acetone"
              className="flex-1 bg-white border-2 border-[#1C2321]/15 rounded-md px-4 py-3 font-[family-name:var(--font-body)] text-[#1C2321] placeholder:text-[#1C2321]/30 focus:outline-none focus:border-[#E8A33D] transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-[#1C2321] text-[#F6F3EC] px-6 rounded-md font-[family-name:var(--font-display)] text-sm tracking-wide hover:bg-[#2F3A37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "..." : "SEARCH"}
            </button>
          </div>
        </div>

        {error && (
          <div className="w-full max-w-md mt-6 bg-[#C1443B]/10 border border-[#C1443B]/30 rounded-md p-4">
            <p className="font-[family-name:var(--font-body)] text-sm text-[#C1443B]">{error}</p>
          </div>
        )}

        {result && (
          <div className="w-full max-w-md mt-8 bg-white rounded-md shadow-sm overflow-hidden border border-[#1C2321]/10">
            <div className="flex items-center gap-3 bg-[#1C2321] px-5 py-3">
              <div className="w-2.5 h-2.5 rotate-45 bg-[#E8A33D]" />
              <span className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-[#F6F3EC]">
                Storage Instructions
              </span>
            </div>
            <div className="px-5 py-5">
              <p className="font-[family-name:var(--font-body)] text-[15px] leading-relaxed text-[#1C2321]/85 whitespace-pre-line">
                {result}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}