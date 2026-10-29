import React from 'react';
import { ItemEstatistica } from './ItemEstatistica';

const PONTOS_TENIS = ['0', '15', '30', '40'];

const FILTROS_PILULAS = [
  { id: 'Todos', topo: 'All', base: '100%' },
  { id: 'Set 1', topo: 'Set', base: '01' },
  { id: 'Set 2', topo: 'Set', base: '02' },
  { id: 'Set 3', topo: 'Set', base: '03' },
  { id: 'Saque', topo: 'Srv', base: 'Ace' },
  { id: 'Rede', topo: 'Net', base: 'Vol' },
  { id: 'Fundo', topo: 'Base', base: 'Rly' },
];

export function PainelPlacarAoVivo({
  jogador1,
  jogador2,
  placar,
  sacadorAtual,
  setAtual,
  estatisticasComparativas,
  filtroEstatistica,
  aoMudarFiltroEstatistica,
  aoMarcarPonto,
  aoResetarPartida,
}) {
  const pontoExibido1 =
    placar.vantagem === 1
      ? 'AD'
      : placar.vantagem === 2
      ? '40'
      : PONTOS_TENIS[placar.pontosIdx1];

  const pontoExibido2 =
    placar.vantagem === 2
      ? 'AD'
      : placar.vantagem === 1
      ? '40'
      : PONTOS_TENIS[placar.pontosIdx2];

  const isDeuce =
    placar.pontosIdx1 === 3 &&
    placar.pontosIdx2 === 3 &&
    placar.vantagem === null;

  const isBreakPoint =
    (sacadorAtual === 1 &&
      ((placar.pontosIdx2 === 3 && placar.pontosIdx1 < 3) ||
        placar.vantagem === 2)) ||
    (sacadorAtual === 2 &&
      ((placar.pontosIdx1 === 3 && placar.pontosIdx2 < 3) ||
        placar.vantagem === 1));

  const estatisticasFiltradas = estatisticasComparativas.filter((item) => {
    if (filtroEstatistica === 'Todos') return true;
    return (
      item.categoria === filtroEstatistica || item.set === filtroEstatistica
    );
  });

  return (
    <article className="ring-1 ring-stone-200 flex flex-col bg-white rounded-3xl pt-6 pr-6 pb-6 pl-6 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
              Placar & Telemetria
            </h2>
            {isBreakPoint ? (
              <span className="text-xs font-medium text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                Break Point
              </span>
            ) : isDeuce ? (
              <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Deuce (Iguais)
              </span>
            ) : (
              <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Set {setAtual}
              </span>
            )}
          </div>
          <p className="text-sm text-stone-500">
            Clique nos botões abaixo para pontuar e atualizar o Virtual DOM
          </p>
        </div>

        <button
          type="button"
          onClick={aoResetarPartida}
          title="Restaurar placar inicial"
          className="rounded-xl px-2.5 py-1.5 text-xs font-medium text-stone-600 ring-1 ring-stone-200 bg-stone-50 hover:bg-stone-100 transition-colors"
        >
          Resetar
        </button>
      </div>

      {/* Placar ao vivo interativo */}
      <div className="mb-5 rounded-2xl p-4 ring-1 bg-stone-50 ring-stone-200 space-y-3">
        <div className="grid grid-cols-12 items-center text-xs font-medium text-stone-500 pb-1 border-b border-stone-200">
          <span className="col-span-6"> TENISTA / RANKING</span>
          <span className="col-span-2 text-center">SETS</span>
          <span className="col-span-2 text-center">GAMES</span>
          <span className="col-span-2 text-center">PTS</span>
        </div>

        {/* Linha Jogador 1 */}
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-6 flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold truncate">
              {jogador1.nome}
            </span>
            <span className="text-xs text-stone-500">#{jogador1.ranking}</span>
            {sacadorAtual === 1 && (
              <span
                title="Sacando agora"
                className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200"
              />
            )}
          </div>
          <span className="col-span-2 text-center text-sm font-semibold tabular-nums">
            {placar.setsJogador1}
          </span>
          <span className="col-span-2 text-center text-sm font-semibold tabular-nums">
            {placar.gamesJogador1}
          </span>
          <span className="col-span-2 text-center">
            <span className="inline-flex min-w-[2.25rem] justify-center rounded-lg bg-stone-900 text-stone-100 px-2 py-1 text-xs font-semibold tabular-nums">
              {pontoExibido1}
            </span>
          </span>
        </div>

        {/* Linha Jogador 2 */}
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-6 flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold truncate">
              {jogador2.nome}
            </span>
            <span className="text-xs text-stone-500">#{jogador2.ranking}</span>
            {sacadorAtual === 2 && (
              <span
                title="Sacando agora"
                className="inline-block h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200"
              />
            )}
          </div>
          <span className="col-span-2 text-center text-sm font-semibold tabular-nums">
            {placar.setsJogador2}
          </span>
          <span className="col-span-2 text-center text-sm font-semibold tabular-nums">
            {placar.gamesJogador2}
          </span>
          <span className="col-span-2 text-center">
            <span className="inline-flex min-w-[2.25rem] justify-center rounded-lg bg-stone-900 text-stone-100 px-2 py-1 text-xs font-semibold tabular-nums">
              {pontoExibido2}
            </span>
          </span>
        </div>

        {/* Botões de ação rápida para pontuar */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => aoMarcarPonto(1, 'Winner')}
            className="flex-1 rounded-xl px-3 py-2 text-xs font-medium bg-stone-900 text-stone-100 hover:bg-stone-800 transition-colors"
          >
            + Ponto {jogador1.nomeCurto}
          </button>
          <button
            type="button"
            onClick={() => aoMarcarPonto(2, 'Winner')}
            className="flex-1 rounded-xl px-3 py-2 text-xs font-medium ring-1 bg-white text-stone-900 ring-stone-300 hover:bg-stone-100 transition-colors"
          >
            + Ponto {jogador2.nomeCurto}
          </button>
        </div>
      </div>

      {/* Strip de 7 pílulas idêntica ao Design System */}
      <div className="mb-5 grid grid-cols-7 gap-2 text-center text-xs font-medium text-stone-600">
        {FILTROS_PILULAS.map((pilula) => {
          const selecionado = filtroEstatistica === pilula.id;
          return (
            <button
              key={pilula.id}
              type="button"
              onClick={() => aoMudarFiltroEstatistica(pilula.id)}
              className={
                selecionado
                  ? 'rounded-xl px-2 py-2 bg-stone-900 text-stone-100 transition-colors'
                  : 'rounded-xl px-2 py-2 ring-1 bg-stone-50 ring-stone-200 hover:bg-stone-100 transition-colors'
              }
            >
              <p className="font-medium">{pilula.topo}</p>
              <p className="mt-0.5 text-sm font-semibold tracking-tight">
                {pilula.base}
              </p>
            </button>
          );
        })}
      </div>

      {/* Lista de estatísticas com renderização condicional */}
      <div className="flex-1 space-y-3">
        {estatisticasFiltradas.length === 0 ? (
          <div className="rounded-2xl p-6 ring-1 bg-stone-50 ring-stone-200 text-center">
            <p className="text-sm font-medium text-stone-700">
              Nenhuma métrica registrada para o filtro "{filtroEstatistica}".
            </p>
          </div>
        ) : (
          estatisticasFiltradas.map((stat) => (
            <ItemEstatistica
              key={stat.id}
              titulo={stat.titulo}
              status={stat.status}
              detalhe={stat.detalhe}
              percentual={stat.percentual}
              corIcone={stat.corIcone}
              corBarra={stat.corBarra}
              icone={stat.icone}
            />
          ))
        )}
      </div>
    </article>
  );
}

