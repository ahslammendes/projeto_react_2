import React from 'react';

export function GraficoRitmoPartida({
  imagemGrafico,
  dadosRitmo,
  velocidadeMeta,
}) {
  const valores = dadosRitmo.map((d) => d.velocidade);
  const minVal = Math.min(...valores) - 4;
  const maxVal = Math.max(...valores) + 4;
  const largura = 260;
  const altura = 110;

  const pontosSvg = dadosRitmo.map((item, idx) => {
    const x =
      20 + (idx / Math.max(dadosRitmo.length - 1, 1)) * (largura - 40);
    const proporcao = (item.velocidade - minVal) / Math.max(maxVal - minVal, 1);
    const y = altura - 22 - proporcao * (altura - 42);
    return { ...item, x, y };
  });

  const caminhoLinha = pontosSvg
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const caminhoArea = `${caminhoLinha} L ${pontosSvg[
    pontosSvg.length - 1
  ].x.toFixed(1)} ${altura - 18} L ${pontosSvg[0].x.toFixed(1)} ${
    altura - 18
  } Z`;

  return (
    <article
      className="relative overflow-hidden h-80 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] text-stone-100 bg-cover rounded-3xl pt-6 pr-6 pb-6 pl-6 bg-center"
      style={{ backgroundImage: `url(${imagemGrafico})` }}
    >
      <div className="absolute inset-0 bg-stone-900/60" />

      <div className="relative z-10">
        <div className="mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Radar de Saque
            </h2>
            <p className="text-sm text-stone-300">
              Pico: {velocidadeMeta} km/h
            </p>
          </div>
          <span className="rounded-xl p-2 text-stone-300 bg-stone-800/50">
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
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </span>
        </div>

        <p className="text-sm text-stone-300">Velocidade por Game (km/h)</p>

        <div className="h-44 bg-stone-900/55 backdrop-blur-sm ring-1 ring-white/10 rounded-2xl mt-3 p-3 flex flex-col justify-between">
          <svg
            viewBox={`0 0 ${largura} ${altura}`}
            className="w-full h-full overflow-visible"
          >
            <defs>
              <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Linhas de grade sutis */}
            {[24, 54, 84].map((yGrid) => (
              <line
                key={yGrid}
                x1="16"
                y1={yGrid}
                x2={largura - 16}
                y2={yGrid}
                stroke="rgba(231,229,228,0.12)"
                strokeWidth="1"
              />
            ))}

            <path d={caminhoArea} fill="url(#amberFill)" />
            <path
              d={caminhoLinha}
              fill="none"
              stroke="#fef3c7"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {pontosSvg.map((ponto, index) => (
              <g key={ponto.game}>
                <circle
                  cx={ponto.x}
                  cy={ponto.y}
                  r={index === 3 ? 4.5 : 3.5}
                  fill={index === 3 ? '#f59e0b' : '#e5e7eb'}
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                <text
                  x={ponto.x}
                  y={ponto.y - 8}
                  textAnchor="middle"
                  fill="#fef3c7"
                  fontSize="9"
                  fontWeight="600"
                >
                  {ponto.velocidade}
                </text>
                <text
                  x={ponto.x}
                  y={altura - 4}
                  textAnchor="middle"
                  fill="#e7e5e4"
                  fontSize="9"
                  fontWeight="500"
                >
                  {ponto.game}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </article>
  );
}

