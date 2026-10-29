import React from 'react';

export function ResumoConfronto({ resumoMacros, jogador1, jogador2 }) {
  const totalAces = resumoMacros.acesJ1 + resumoMacros.acesJ2;
  const totalWinners = resumoMacros.winnersJ1 + resumoMacros.winnersJ2;
  const totalBreaks =
    resumoMacros.breakPointsConvertidosJ1 +
    resumoMacros.breakPointsConvertidosJ2;

  const percAcesJ1 = Math.round(
    (resumoMacros.acesJ1 / Math.max(totalAces, 1)) * 100
  );
  const percWinnersJ1 = Math.round(
    (resumoMacros.winnersJ1 / Math.max(totalWinners, 1)) * 100
  );
  const percBreaksJ1 = Math.round(
    (resumoMacros.breakPointsConvertidosJ1 / Math.max(totalBreaks, 1)) * 100
  );

  return (
    <article className="ring-1 ring-stone-200 h-80 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] bg-white rounded-3xl pt-6 pr-6 pb-6 pl-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Head to Head</h2>
          <p className="text-sm text-stone-500">
            {jogador1.nomeCurto} vs {jogador2.nomeCurto}
          </p>
        </div>
        <span className="rounded-xl p-2 text-stone-500 bg-stone-50">
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </span>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-green-400 via-yellow-400 to-red-400" />
            <div className="absolute inset-2 rounded-full bg-white" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold tracking-tight tabular-nums">
                  {resumoMacros.totalPontos}
                </p>
                <p className="text-xs text-stone-500">pontos</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-sm text-stone-500 tabular-nums">
            {resumoMacros.pontosJ1} pts ({jogador1.nomeCurto}) •{' '}
            {resumoMacros.pontosJ2} pts ({jogador2.nomeCurto})
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl p-3 ring-1 bg-red-50 ring-red-200">
            <div className="h-2 w-full overflow-hidden rounded-full bg-red-200 mb-2">
              <div
                className="h-full rounded-full bg-red-400"
                style={{ width: `${percAcesJ1}%` }}
              />
            </div>
            <p className="text-xs font-medium text-red-600">Aces</p>
            <p className="text-sm font-semibold tabular-nums">
              {resumoMacros.acesJ1}-{resumoMacros.acesJ2}
            </p>
          </div>

          <div className="rounded-2xl p-3 ring-1 bg-blue-50 ring-blue-200">
            <div className="h-2 w-full overflow-hidden rounded-full bg-blue-200 mb-2">
              <div
                className="h-full rounded-full bg-blue-400"
                style={{ width: `${percWinnersJ1}%` }}
              />
            </div>
            <p className="text-xs font-medium text-blue-600">Winners</p>
            <p className="text-sm font-semibold tabular-nums">
              {resumoMacros.winnersJ1}-{resumoMacros.winnersJ2}
            </p>
          </div>

          <div className="rounded-2xl p-3 ring-1 bg-yellow-50 ring-yellow-200">
            <div className="h-2 w-full overflow-hidden rounded-full bg-yellow-200 mb-2">
              <div
                className="h-full rounded-full bg-yellow-400"
                style={{ width: `${percBreaksJ1}%` }}
              />
            </div>
            <p className="text-xs font-medium text-yellow-600">Breaks</p>
            <p className="text-sm font-semibold tabular-nums">
              {resumoMacros.breakPointsConvertidosJ1}-
              {resumoMacros.breakPointsConvertidosJ2}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

