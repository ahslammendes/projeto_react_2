import React from 'react';

export function Rodape() {
  return (
    <footer className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
      <p>
        <strong className="font-semibold text-stone-700">
          CourtFlux Tennis Dashboard
        </strong>{' '}
        • Projeto React — Frameworks Front-end (SENAI)
      </p>
      <p>
        Conceitos: JSX • Componentes • Props • Virtual DOM • Listas &amp; Keys •
        Renderização Condicional
      </p>
    </footer>
  );
}

