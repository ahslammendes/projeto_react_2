import React, { useState, useEffect } from 'react';
import { PARTIDAS_INICIAIS } from './data/partidasData';
import { Cabecalho } from './components/Cabecalho';
import { CardHeroPartida } from './components/CardHeroPartida';
import { CardMetricaCircular } from './components/CardMetricaCircular';
import { CardMetricaDestaque } from './components/CardMetricaDestaque';
import { CardMetricaProgresso } from './components/CardMetricaProgresso';
import { CronometroPartida } from './components/CronometroPartida';
import { PainelPlacarAoVivo } from './components/PainelPlacarAoVivo';
import { HistoricoJogadas } from './components/HistoricoJogadas';
import { GraficoRitmoPartida } from './components/GraficoRitmoPartida';
import { ResumoConfronto } from './components/ResumoConfronto';
import { DestaquesTransmissao } from './components/DestaquesTransmissao';
import { Rodape } from './components/Rodape';

const PONTOS_LABELS = ['0', '15', '30', '40'];

export function App() {
  const [partidas, setPartidas] = useState(PARTIDAS_INICIAIS);
  const [partidaAtivaId, setPartidaAtivaId] = useState(PARTIDAS_INICIAIS[0].id);
  const [cronometroRodando, setCronometroRodando] = useState(true);
  const [filtroEstatistica, setFiltroEstatistica] = useState('Todos');
  const [termoBusca, setTermoBusca] = useState('');
  const [filtroTipoJogada, setFiltroTipoJogada] = useState('Todos');

  const partidaAtual =
    partidas.find((p) => p.id === partidaAtivaId) || partidas[0];

  // Cronômetro em tempo real (reconciliação automática pelo Virtual DOM)
  useEffect(() => {
    if (!cronometroRodando) return undefined;

    const intervalo = setInterval(() => {
      setPartidas((estadoAnterior) =>
        estadoAnterior.map((item) =>
          item.id === partidaAtivaId
            ? { ...item, tempoInicialSegundos: item.tempoInicialSegundos + 1 }
            : item
        )
      );
    }, 1000);

    return () => clearInterval(intervalo);
  }, [cronometroRodando, partidaAtivaId]);

  const selecionarPartida = (novoId) => {
    setPartidaAtivaId(novoId);
    setFiltroEstatistica('Todos');
    setTermoBusca('');
    setFiltroTipoJogada('Todos');
  };

  const resetarPartidaAtual = () => {
    const original = PARTIDAS_INICIAIS.find((p) => p.id === partidaAtivaId);
    if (!original) return;
    setPartidas((estadoAnterior) =>
      estadoAnterior.map((item) =>
        item.id === partidaAtivaId ? JSON.parse(JSON.stringify(original)) : item
      )
    );
  };

  // Lógica oficial de pontuação do Tênis (0 -> 15 -> 30 -> 40 -> Deuce/AD -> Game -> Set)
  const marcarPonto = (numeroJogador, tipoLance = 'Winner') => {
    setPartidas((estadoAnterior) =>
      estadoAnterior.map((partida) => {
        if (partida.id !== partidaAtivaId) return partida;

        const p = { ...partida.placar };
        const macros = { ...partida.resumoMacros };
        let novoSacador = partida.sacadorAtual;
        let novoSetAtual = partida.setAtual;
        let fechouGame = false;

        if (numeroJogador === 1) {
          macros.pontosJ1 += 1;
          if (tipoLance === 'Ace') macros.acesJ1 += 1;
          else macros.winnersJ1 += 1;
        } else {
          macros.pontosJ2 += 1;
          if (tipoLance === 'Ace') macros.acesJ2 += 1;
          else macros.winnersJ2 += 1;
        }
        macros.totalPontos = macros.pontosJ1 + macros.pontosJ2;

        // Verifica Deuce / Vantagem
        if (p.pontosIdx1 === 3 && p.pontosIdx2 === 3) {
          if (p.vantagem === null) {
            p.vantagem = numeroJogador;
          } else if (p.vantagem === numeroJogador) {
            fechouGame = true;
          } else {
            p.vantagem = null; // Volta para Deuce
          }
        } else if (numeroJogador === 1) {
          if (p.pontosIdx1 === 3) {
            fechouGame = true;
          } else {
            p.pontosIdx1 += 1;
          }
        } else {
          if (p.pontosIdx2 === 3) {
            fechouGame = true;
          } else {
            p.pontosIdx2 += 1;
          }
        }

        if (fechouGame) {
          p.pontosIdx1 = 0;
          p.pontosIdx2 = 0;
          p.vantagem = null;

          // Verifica se foi quebra de serviço (Break)
          if (numeroJogador !== partida.sacadorAtual) {
            if (numeroJogador === 1) macros.breakPointsConvertidosJ1 += 1;
            else macros.breakPointsConvertidosJ2 += 1;
          }

          novoSacador = partida.sacadorAtual === 1 ? 2 : 1;

          if (numeroJogador === 1) p.gamesJogador1 += 1;
          else p.gamesJogador2 += 1;

          // Atualiza o set ativo no histórico de sets (imutabilidade com map)
          p.historicoSets = p.historicoSets.map((s) =>
            s.set === partida.setAtual
              ? { ...s, j1: p.gamesJogador1, j2: p.gamesJogador2 }
              : s
          );

          // Verifica fechamento de Set (6+ games com diferença >= 2, ou 7 games)
          const g1 = p.gamesJogador1;
          const g2 = p.gamesJogador2;
          if ((g1 >= 6 || g2 >= 6) && Math.abs(g1 - g2) >= 2) {
            if (g1 > g2) p.setsJogador1 += 1;
            else p.setsJogador2 += 1;

            if (partida.setAtual < 3) {
              novoSetAtual = partida.setAtual + 1;
              p.gamesJogador1 = 0;
              p.gamesJogador2 = 0;
            }
          }
        }

        const jogadorAutor =
          numeroJogador === 1 ? partida.jogador1 : partida.jogador2;

        const placarFormatado = fechouGame
          ? `Game ${p.gamesJogador1}-${p.gamesJogador2}`
          : p.vantagem === 1
          ? 'AD - 40'
          : p.vantagem === 2
          ? '40 - AD'
          : `${PONTOS_LABELS[p.pontosIdx1]} - ${PONTOS_LABELS[p.pontosIdx2]}`;

        const novaJogada = {
          id: Date.now(),
          titulo:
            tipoLance === 'Ace'
              ? `Ace confirmado no saque — ${jogadorAutor.nome}`
              : fechouGame
              ? `Game fechado por ${jogadorAutor.nome}`
              : `Ponto de ${tipoLance} — ${jogadorAutor.nome}`,
          descricao: `Set ${novoSetAtual} • Quadra Central • Atualizado em tempo real`,
          tipo: fechouGame && numeroJogador !== partida.sacadorAtual ? 'Break Point' : tipoLance,
          set: novoSetAtual,
          placarMomento: placarFormatado,
          destaque: tipoLance === 'Ace' || fechouGame,
        };

        return {
          ...partida,
          sacadorAtual: novoSacador,
          setAtual: novoSetAtual,
          placar: p,
          resumoMacros: macros,
          jogadas: [novaJogada, ...partida.jogadas],
        };
      })
    );
  };

  const simularPontoAleatorio = () => {
    const vencedor = Math.random() > 0.45 ? 1 : 2;
    const tipos = ['Winner', 'Ace', 'Winner', 'Break Point'];
    const tipoEscolhido = tipos[Math.floor(Math.random() * tipos.length)];
    marcarPonto(vencedor, tipoEscolhido);
  };

  return (
    <>
      <Cabecalho
        partidas={partidas}
        partidaAtivaId={partidaAtivaId}
        aoSelecionarPartida={selecionarPartida}
        cronometroRodando={cronometroRodando}
        torneioAtual={`${partidaAtual.torneio} • ${partidaAtual.fase}`}
      />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Coluna Esquerda (4 colunas): Hero, Métricas 2x2 e Cronômetro */}
          <section className="lg:col-span-4 space-y-6">
            <CardHeroPartida
              imagemHero={partidaAtual.imagemHero}
              torneio={partidaAtual.torneio}
              quadra={partidaAtual.quadra}
              jogador1={partidaAtual.jogador1}
              jogador2={partidaAtual.jogador2}
              aoSimularPontoAleatorio={simularPontoAleatorio}
            />

            <div className="grid grid-cols-2 gap-4">
              <CardMetricaCircular
                titulo="Forehand Speed"
                valor={partidaAtual.jogador1.velocidadeForehand}
                unidade="KM/H"
              />

              <CardMetricaDestaque
                titulo="Total de Aces"
                valor={
                  partidaAtual.resumoMacros.acesJ1 +
                  partidaAtual.resumoMacros.acesJ2
                }
                unidade="aces"
                jogador1={partidaAtual.jogador1}
                jogador2={partidaAtual.jogador2}
                rotuloAcao="+ Ace"
                aoClicarAcao={() =>
                  marcarPonto(partidaAtual.sacadorAtual, 'Ace')
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CardMetricaProgresso
                titulo="Baseline Win"
                valorPrincipal={`${partidaAtual.jogador1.taxaFundoQuadra}%`}
                unidade=""
                percentual={partidaAtual.jogador1.taxaFundoQuadra}
                subtitulo={`${partidaAtual.jogador1.nomeCurto} no fundo`}
                varianteCor="indigo"
                mostrarPercentualLateral={false}
              />

              <CardMetricaProgresso
                titulo="Volley Accuracy"
                valorPrincipal={partidaAtual.jogador2.precisaoVoleio}
                unidade="%"
                percentual={partidaAtual.jogador2.pontosRedeGanhos}
                subtitulo={`Rede: ${partidaAtual.jogador2.pontosRedeGanhos}% ganhos`}
                varianteCor="amber"
                mostrarPercentualLateral={true}
              />
            </div>

            <CronometroPartida
              segundosDecorridos={partidaAtual.tempoInicialSegundos}
              rodando={cronometroRodando}
              aoAlternarCronometro={setCronometroRodando}
              historicoSets={partidaAtual.placar.historicoSets}
              setAtual={partidaAtual.setAtual}
            />
          </section>

          {/* Coluna Central (5 colunas): Placar Ao Vivo, Telemetria e Histórico Play-by-Play */}
          <section className="lg:col-span-5 space-y-6">
            <PainelPlacarAoVivo
              jogador1={partidaAtual.jogador1}
              jogador2={partidaAtual.jogador2}
              placar={partidaAtual.placar}
              sacadorAtual={partidaAtual.sacadorAtual}
              setAtual={partidaAtual.setAtual}
              estatisticasComparativas={partidaAtual.estatisticasComparativas}
              filtroEstatistica={filtroEstatistica}
              aoMudarFiltroEstatistica={setFiltroEstatistica}
              aoMarcarPonto={marcarPonto}
              aoResetarPartida={resetarPartidaAtual}
            />

            <HistoricoJogadas
              jogadas={partidaAtual.jogadas}
              termoBusca={termoBusca}
              aoMudarBusca={setTermoBusca}
              filtroTipo={filtroTipoJogada}
              aoMudarFiltroTipo={setFiltroTipoJogada}
              aoAdicionarAceRapido={() =>
                marcarPonto(partidaAtual.sacadorAtual, 'Ace')
              }
            />
          </section>

          {/* Coluna Direita (3 colunas): Gráfico de Ritmo, Head-to-Head e Feed */}
          <section className="lg:col-span-3 space-y-6">
            <GraficoRitmoPartida
              imagemGrafico={partidaAtual.imagemGrafico}
              dadosRitmo={partidaAtual.ritmoVelocidadeSaque}
              velocidadeMeta={partidaAtual.jogador1.velocidadeForehand}
            />

            <ResumoConfronto
              resumoMacros={partidaAtual.resumoMacros}
              jogador1={partidaAtual.jogador1}
              jogador2={partidaAtual.jogador2}
            />

            <DestaquesTransmissao
              comentarios={partidaAtual.comentariosTransmissao}
              imagemAvatar={partidaAtual.imagemHero}
            />
          </section>
        </div>

        <Rodape />
      </main>
    </>
  );
}

export default App;

