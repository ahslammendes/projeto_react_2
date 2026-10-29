import React from 'react';

export function CardMetricaDestaque({
  titulo,
  valor,
  unidade,
  jogador1,
  jogador2,
  rotuloAcao,
  aoClicarAcao,
}) {
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
          className="h-4 w-4 text-blue-600"
        >
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">
        {valor}
        <span className="ml-1 text-base font-medium text-stone-500">
          {unidade}
        </span>
      </p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-6 w-6 rounded-full object-cover"
            style={{ objectPosition: jogador1.posicaoAvatar }}
            src={jogador1.avatar}
            alt={jogador1.nome}
          />
          <img
            className="h-6 w-6 -ml-2 rounded-full object-cover ring-2 ring-white"
            style={{ objectPosition: jogador2.posicaoAvatar }}
            src={jogador2.avatar}
            alt={jogador2.nome}
          />
        </div>
        <button
          type="button"
          onClick={aoClicarAcao}
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors"
        >
          {rotuloAcao}
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
            className="h-3 w-3"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

