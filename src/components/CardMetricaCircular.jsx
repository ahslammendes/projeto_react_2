import React from 'react';

export function CardMetricaCircular({ titulo, valor, unidade }) {
  return (
    <div className="ring-1 ring-stone-200 h-44 bg-white rounded-3xl pt-5 pr-5 pb-5 pl-5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-stone-500">{titulo}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-rose-500"
        >
          <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-rose-400 via-orange-300 to-amber-400" />
          <div className="absolute inset-1 rounded-full bg-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-semibold tracking-tight">{valor}</p>
              <p className="text-xs text-stone-500">{unidade}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

