import React from 'react';
import { BarraDePesquisa } from './BarraDePesquisa';

function ListaResultadosJogadas({ resultados }) {
  // Renderização condicional com if e return antecipado (conforme slides 77-80)
  if (resultados.length === 0) {
    return (
      <div className="rounded-2xl p-6 ring-1 bg-stone-50 ring-stone-200 text-center">
        <p className="text-sm font-medium text-stone-700">
          Nenhum resultado encontrado para a busca atual.
        </p>
        <p className="mt-1 text-xs text-stone-500">
          Tente pesquisar outro golpe ou altere o filtro de categoria acima.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {resultados.map((jogada) => {
        const isAceOuDestaque = jogada.tipo === 'Ace' || jogada.destaque;
        const isBreakPoint = jogada.tipo === 'Break Point';

        return (
          <div
            key={jogada.id}
            className={
              isAceOuDestaque
                ? 'flex items-center gap-4 rounded-2xl p-4 ring-1 bg-emerald-50 ring-emerald-200'
                : 'flex items-center gap-4 rounded-2xl p-4 ring-1 bg-stone-50 ring-stone-200'
            }
          >
            <div
              className={
                isAceOuDestaque
                  ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white'
                  : isBreakPoint
                  ? 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600'
                  : 'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600'
              }
            >
              {isAceOuDestaque ? (
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
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : isBreakPoint ? (
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
                  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
                  <path d="m2.5 21.5 1.4-1.4" />
                  <path d="m20.1 3.9 1.4-1.4" />
                  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
                  <path d="m9.6 14.4 4.8-4.8" />
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
                  className="h-5 w-5"
                >
                  <rect width="20" height="6" x="2" y="4" rx="2" />
                  <rect width="20" height="6" x="2" y="14" rx="2" />
                </svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{jogada.titulo}</p>
              <p className="text-xs text-stone-500 truncate">
                {jogada.descricao} • Placar: {jogada.placarMomento}
              </p>
            </div>

            <span
              className={
                isAceOuDestaque
                  ? 'text-xs font-medium text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full shrink-0'
                  : isBreakPoint
                  ? 'text-xs font-medium text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full shrink-0'
                  : 'text-xs font-medium text-stone-600 bg-stone-200 px-2.5 py-1 rounded-full shrink-0'
              }
            >
              {jogada.tipo}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function HistoricoJogadas({
  jogadas,
  termoBusca,
  aoMudarBusca,
  filtroTipo,
  aoMudarFiltroTipo,
  aoAdicionarAceRapido,
}) {
  const jogadasFiltradas = jogadas.filter((jogada) => {
    const bateTipo = filtroTipo === 'Todos' || jogada.tipo === filtroTipo;
    const termo = termoBusca.trim().toLowerCase();
    const bateTexto =
      termo === '' ||
      jogada.titulo.toLowerCase().includes(termo) ||
      jogada.descricao.toLowerCase().includes(termo) ||
      jogada.tipo.toLowerCase().includes(termo);
    return bateTipo && bateTexto;
  });

  return (
    <article className="ring-1 ring-stone-200 bg-white rounded-3xl pt-6 pr-6 pb-6 pl-6 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Histórico de Lances (Play-by-Play)
          </h2>
          <p className="text-sm text-stone-500">
            {jogadasFiltradas.length} de {jogadas.length} lances exibidos
          </p>
        </div>
        <button
          type="button"
          onClick={aoAdicionarAceRapido}
          title="Registrar novo Ace na partida"
          aria-label="Registrar novo Ace na partida"
          className="rounded-xl p-2 text-stone-500 ring-1 ring-stone-200 hover:bg-stone-50 transition-colors"
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>

      <BarraDePesquisa
        termoBusca={termoBusca}
        aoMudarBusca={aoMudarBusca}
        filtroTipo={filtroTipo}
        aoMudarFiltroTipo={aoMudarFiltroTipo}
      />

      <ListaResultadosJogadas resultados={jogadasFiltradas} />
    </article>
  );
}

