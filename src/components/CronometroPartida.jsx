import React from 'react';

export function CronometroPartida({
  segundosDecorridos,
  rodando,
  aoAlternarCronometro,
  historicoSets,
  setAtual,
}) {
  const horas = String(Math.floor(segundosDecorridos / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((segundosDecorridos % 3600) / 60)).padStart(
    2,
    '0'
  );
  const segundos = String(segundosDecorridos % 60).padStart(2, '0');

  return (
    <div className="ring-1 ring-stone-200 bg-white rounded-3xl pt-5 pr-5 pb-5 pl-5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-stone-500">
          Tempo de Quadra ({rodando ? 'Em andamento' : 'Intervalo'})
        </p>
        <div className="flex items-center gap-2 text-stone-500">
          <button
            type="button"
            onClick={() => aoAlternarCronometro(false)}
            aria-label="Pausar cronômetro"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-stone-200 hover:bg-stone-50 transition-colors ${
              !rodando ? 'bg-stone-900 text-stone-100 hover:bg-stone-800' : ''
            }`}
          >
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
              className="h-4 w-4"
            >
              <rect x="14" y="3" width="5" height="18" rx="1" />
              <rect x="5" y="3" width="5" height="18" rx="1" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => aoAlternarCronometro(true)}
            aria-label="Iniciar cronômetro"
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-stone-200 hover:bg-stone-50 transition-colors ${
              rodando ? 'bg-stone-900 text-stone-100 hover:bg-stone-800' : ''
            }`}
          >
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
              className="h-4 w-4"
            >
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>
          </button>
        </div>
      </div>

      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
        {horas}:{minutos}:{segundos}
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        {historicoSets.map((item) => {
          const isSetAtivo = item.set === setAtual;
          return (
            <div
              key={item.set}
              className={
                isSetAtivo
                  ? 'rounded-2xl p-3 ring-1 bg-stone-900 text-stone-100 ring-stone-900'
                  : 'rounded-2xl p-3 ring-1 bg-stone-50 ring-stone-200'
              }
            >
              <p className={isSetAtivo ? 'text-stone-300 text-xs' : 'text-stone-500 text-xs'}>
                {item.label} • {item.duracao}
              </p>
              <p className="font-semibold mt-0.5 tabular-nums">
                {item.j1} — {item.j2}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

