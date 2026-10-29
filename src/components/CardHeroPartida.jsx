import React from 'react';

export function CardHeroPartida({
  imagemHero,
  torneio,
  quadra,
  jogador1,
  jogador2,
  aoSimularPontoAleatorio,
}) {
  return (
    <article className="relative overflow-hidden h-80 bg-stone-900 rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
      <img
        src={imagemHero}
        alt={`Confronto entre ${jogador1.nome} e ${jogador2.nome}`}
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-tr to-transparent from-stone-900/85 via-stone-900/25" />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="rounded-full bg-stone-900/80 backdrop-blur-sm ring-1 ring-white/20 px-3 py-1 text-xs font-medium text-stone-100">
          {torneio}
        </span>
      </div>

      <div className="absolute bottom-5 left-5 right-16">
        <p className="text-2xl md:text-3xl font-semibold tracking-tight text-white leading-tight">
          {jogador1.nomeCurto} #{jogador1.ranking}
          <br />
          vs {jogador2.nomeCurto} #{jogador2.ranking}
        </p>
        <p className="mt-1 text-sm text-stone-200">{quadra}</p>
      </div>

      <button
        type="button"
        onClick={aoSimularPontoAleatorio}
        title="Simular próximo ponto ao vivo"
        aria-label="Simular próximo ponto ao vivo"
        className="absolute right-5 bottom-5 inline-flex h-11 w-11 items-center justify-center rounded-full shadow-md ring-1 bg-white text-stone-900 ring-stone-200 hover:bg-stone-50 active:scale-95 transition-transform"
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
          className="h-5 w-5"
        >
          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
        </svg>
      </button>
    </article>
  );
}

