import React from 'react';

const TIPOS_JOGADA = ['Todos', 'Ace', 'Winner', 'Break Point', 'Erro'];

export function BarraDePesquisa({
  termoBusca,
  aoMudarBusca,
  filtroTipo,
  aoMudarFiltroTipo,
}) {
  return (
    <div className="mb-4 space-y-3">
      <div>
        <label
          htmlFor="campo-busca-jogadas"
          className="block text-xs font-medium text-stone-500 mb-1.5"
        >
          Buscar lance por jogador, golpe ou set:
        </label>
        <div className="relative">
          <input
            id="campo-busca-jogadas"
            type="text"
            value={termoBusca}
            onChange={(e) => aoMudarBusca(e.target.value)}
            placeholder="Ex: Ace, Forehand, Voleio, Set 3..."
            className="w-full rounded-2xl py-2.5 pl-4 pr-9 text-sm bg-stone-50 text-stone-900 ring-1 ring-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
          {termoBusca && (
            <button
              type="button"
              onClick={() => aoMudarBusca('')}
              aria-label="Limpar busca"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {TIPOS_JOGADA.map((tipo) => {
          const ativo = filtroTipo === tipo;
          return (
            <button
              key={tipo}
              type="button"
              onClick={() => aoMudarFiltroTipo(tipo)}
              className={
                ativo
                  ? 'rounded-xl px-2.5 py-1 text-xs font-medium bg-stone-900 text-stone-100 transition-colors'
                  : 'rounded-xl px-2.5 py-1 text-xs font-medium ring-1 bg-stone-50 text-stone-600 ring-stone-200 hover:bg-stone-100 transition-colors'
              }
            >
              {tipo}
            </button>
          );
        })}
      </div>
    </div>
  );
}

