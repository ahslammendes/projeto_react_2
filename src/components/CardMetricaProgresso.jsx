import React from 'react';

export function CardMetricaProgresso({
  titulo,
  valorPrincipal,
  unidade,
  percentual,
  subtitulo,
  varianteCor,
  mostrarPercentualLateral,
}) {
  const gradienteBarra =
    varianteCor === 'indigo'
      ? 'bg-gradient-to-r from-indigo-400 to-purple-500'
      : 'bg-gradient-to-r from-yellow-400 to-orange-500';

  return (
    <div className="ring-1 ring-stone-200 h-44 bg-white rounded-3xl pt-5 pr-5 pb-5 pl-5 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-stone-500">{titulo}</p>
        {varianteCor === 'indigo' ? (
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
            className="h-4 w-4 text-indigo-600"
          >
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
          </svg>
        ) : (
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
            className="h-4 w-4 text-yellow-600"
          >
            <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
          </svg>
        )}
      </div>

      <p className="mt-3 text-2xl font-semibold tracking-tight">
        {valorPrincipal}
        {unidade ? (
          <span className="ml-1 text-base font-medium text-stone-500">
            {unidade}
          </span>
        ) : null}
      </p>

      {mostrarPercentualLateral ? (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 overflow-hidden rounded-full bg-stone-200">
            <div
              className={`h-full rounded-full ${gradienteBarra}`}
              style={{ width: `${percentual}%` }}
            />
          </div>
          <p className="text-xs font-medium text-stone-600">{percentual}%</p>
        </div>
      ) : (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className={`h-full rounded-full ${gradienteBarra}`}
            style={{ width: `${percentual}%` }}
          />
        </div>
      )}

      <p className="mt-2 text-xs text-stone-500">{subtitulo}</p>
    </div>
  );
}

