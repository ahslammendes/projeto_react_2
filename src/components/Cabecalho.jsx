import React from 'react';

export function Cabecalho({
  partidas,
  partidaAtivaId,
  aoSelecionarPartida,
  cronometroRodando,
  torneioAtual,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-300/80 bg-stone-200/85 backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-900 text-stone-100 shadow-md">
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
              className="h-5 w-5"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight whitespace-nowrap text-stone-900">
                CourtFlux
              </span>
              {cronometroRodando ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  AO VIVO
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                  PAUSADO
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 truncate hidden sm:block">
              {torneioAtual}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-stone-600">
          {partidas.map((item) => {
            const ativo = item.id === partidaAtivaId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => aoSelecionarPartida(item.id)}
                className={
                  ativo
                    ? 'rounded-xl px-3 py-2 bg-stone-900 text-stone-100 shadow-sm transition-colors'
                    : 'rounded-xl px-3 py-2 ring-1 bg-stone-50 ring-stone-200 hover:bg-white hover:text-stone-900 transition-colors'
                }
              >
                {item.jogador1.nomeCurto} vs {item.jogador2.nomeCurto}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

