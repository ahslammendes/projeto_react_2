import React from 'react';

export function DestaquesTransmissao({ comentarios, imagemAvatar }) {
  return (
    <article className="ring-1 ring-stone-200 bg-white rounded-3xl pt-6 pr-6 pb-6 pl-6 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Feed da Transmissão
          </h2>
          <p className="text-sm text-stone-500">Análise tática em tempo real</p>
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
            className="h-4 w-4"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </span>
      </div>

      <div className="space-y-3">
        {comentarios.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img
              className="h-8 w-8 rounded-full object-cover ring-1 ring-stone-200"
              style={{ objectPosition: item.avatarPos }}
              src={imagemAvatar}
              alt={item.autor}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.autor}</p>
              <p className="text-xs text-stone-500 truncate">{item.texto}</p>
            </div>
            <span className="text-xs text-stone-400 shrink-0">
              {item.tempo}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

