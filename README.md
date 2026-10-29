# 🎾 CourtFlux — Tennis Live Match Dashboard

Aplicação web interativa desenvolvida em **React** para acompanhamento e simulação em tempo real de partidas de tênis, construída como projeto prático da disciplina **Frameworks Front-end (SENAI — Prof. Me. Deivison S. Takatu)**.

O visual e a arquitetura de interface seguem fielmente o **Moveflux Design System** (`stone-200` canvas, tipografia `Inter`, cartões `rounded-3xl` com anéis sutis e sombras multicamadas, medidores em `conic-gradient` e barras de progresso em gradiente), integrando as imagens oficiais de confronto e telemetria de quadra.

---

## 📋 Descrição do Projeto

O **CourtFlux** simula um painel de transmissão e estatísticas ao vivo de tênis (*World Championship Series* e *Grand Slam Arena*), permitindo alternar entre dois confrontos principais:
1. **C. Ramirez (#4) vs L. Kowalski (#7)** — *World Championship Series*
2. **M. Carter (#4, USA) vs A. Petrovic (#7, SRB)** — *Grand Slam Arena*

O usuário pode simular pontos ao vivo (`0` → `15` → `30` → `40` → `Deuce / Vantagem (AD)` → `Game` → `Set`), registrar **Aces** e **Winners**, acompanhar o cronômetro de quadra em tempo real e pesquisar/filtrar tanto as métricas táticas quanto o histórico ponto a ponto (*Play-by-Play*).

---

## ⚙️ Funcionalidades

- **Placar de Tênis Interativo em Tempo Real:** Cálculo automático das regras oficiais do tênis (`0`, `15`, `30`, `40`, `Deuce`, `Vantagem`, quebra de serviço `Break Point`, fechamento de `Game` e `Set`), alternando automaticamente o tenista sacador.
- **Alternância entre Partidas:** Seleção instantânea entre os confrontos **Ramirez vs Kowalski** e **Carter vs Petrovic** na barra superior.
- **Cronômetro de Quadra Ao Vivo:** Contador em tempo real com controles de **Play** e **Pause** e resumo dos parciais de cada Set (`Set 1`, `Set 2`, `Set 3`).
- **Filtro de Estatísticas Táticas:** Pílulas seletoras (`All`, `Set 01`, `Set 02`, `Set 03`, `Srv/Ace`, `Net/Vol`, `Base/Rly`) para filtrar indicadores comparativos de velocidade de forehand, eficiência de fundo de quadra, precisão de voleio e pontos na rede.
- **Histórico de Lances (Play-by-Play) com Busca e Filtros:**
  - Campo de pesquisa textual em tempo real por jogador, golpe ou set.
  - Filtro rápido por categoria de lance (`Todos`, `Ace`, `Winner`, `Break Point`, `Erro`).
  - Atualização automática a cada novo ponto marcado no placar.
- **Gráfico de Ritmo de Saque & Head-to-Head:** Visualização em curva SVG da velocidade de saque por game (`km/h`) e comparativo consolidado de pontos, aces, winners e quebras de serviço.

---

## 🧠 Conceitos de React Utilizados (Requisitos da Aula)

### 1. JSX (JavaScript XML)
- Escrita declarativa combinando marcação visual e expressões JavaScript entre chaves `{ }`.
- Uso correto das convenções do JSX: `className` para classes CSS, `htmlFor` no `<label>` do campo de pesquisa (`BarraDePesquisa.jsx`), fechamento de tags sem conteúdo (`<img />`, `<input />`, `<path />`) e uso de `Fragment` (`<>...</>`) no componente raiz `App.jsx`.

### 2. Componentes: Criação, Composição e Reutilização
A aplicação foi dividida em componentes funcionais independentes e reutilizáveis, organizados na seguinte árvore hierárquica:

```text
App
├── Cabecalho
├── CardHeroPartida
├── CardMetricaCircular
├── CardMetricaDestaque
├── CardMetricaProgresso (reutilizado para Baseline Win e Volley Accuracy)
├── CronometroPartida
├── PainelPlacarAoVivo
│   └── ItemEstatistica (reutilizado para cada métrica da partida)
├── HistoricoJogadas
│   ├── BarraDePesquisa
│   └── ListaResultadosJogadas
├── GraficoRitmoPartida
├── ResumoConfronto
├── DestaquesTransmissao
└── Rodape
```

### 3. Props (Propriedades)
- Fluxo unidirecional de dados (de componente pai para componente filho).
- Passagem de diferentes tipos de valores via `props`:
  - **Strings e Números:** `titulo`, `valor`, `unidade`, `percentual`, `segundosDecorridos`.
  - **Booleanos:** `rodando`, `cronometroRodando`, `mostrarPercentualLateral`.
  - **Objetos e Arrays:** `jogador1`, `jogador2`, `placar`, `jogadas`, `estatisticasComparativas`, `dadosRitmo`.
  - **Funções (Callbacks):** `aoMarcarPonto`, `aoSelecionarPartida`, `aoMudarBusca`, `aoAlternarCronometro`.

### 4. DOM e Virtual DOM (Reconciliação e Estado)
- Uso dos hooks `useState` e `useEffect` para gerenciar o estado da partida, cronômetro e filtros.
- Quando um ponto é marcado ou um filtro é alterado, o React recalcula a descrição da interface no **Virtual DOM**, realiza a **reconciliação** e atualiza apenas os nós necessários no DOM real — sem necessidade de manipulação imperativa (`document.querySelector` ou `.textContent`).
- Atualizações de listas e objetos em estado sempre produzem **novos arrays/objetos** (`map`, spread `...`), preservando a imutabilidade.

### 5. Listas e Keys
- Uso combinado de `.filter()` e `.map()` para transformar coleções de dados em elementos JSX (`estatisticasComparativas`, `jogadas`, `historicoSets`, `comentariosTransmissao`, `FILTROS_PILULAS`).
- Uso de identificadores únicos e estáveis na propriedade `key` (`key={jogada.id}`, `key={stat.id}`, `key={item.id}`) para garantir a identidade dos elementos durante a reconciliação.

### 6. Renderização Condicional
- **Com `if` e `return` antecipado:** No componente `ListaResultadosJogadas` (`HistoricoJogadas.jsx`), caso a filtragem não retorne itens (`if (resultados.length === 0)`), é retornado antecipadamente um aviso de *"Nenhum resultado encontrado para a busca atual"*.
- **Com Operador Ternário (`? :`) e Curto-Circuito (`&&`):**
  - Alternância do badge de status no cabeçalho (`AO VIVO` vs `PAUSADO`).
  - Exibição dinâmica de estados críticos do game (`Break Point`, `Deuce (Iguais)` ou `Set X`).
  - Indicador visual da bolinha amarela ao lado do tenista que está sacando no momento (`sacadorAtual === 1 && ...`).

---

## ✅ Checklist Geral do Desafio e Entregáveis

| Requisito Proposto na Atividade | Status | Onde está no Projeto |
| :--- | :---: | :--- |
| **1. Utilizar JSX** (expressões `{}`, `className`, `htmlFor`, tags fechadas, `Fragment`) | ✅ Concluído | Em todos os componentes; `Fragment` (`<>...</>`) em `src/App.jsx` e `htmlFor="campo-busca-jogadas"` em `src/components/BarraDePesquisa.jsx`. |
| **2. Componentes** (criação, composição, árvore hierárquica e reutilização) | ✅ Concluído | 12 componentes modulares em `src/components/`, com reutilização direta em `CardMetricaProgresso.jsx` e `ItemEstatistica.jsx`. |
| **3. Props** (fluxo unidirecional pai → filho com diversos tipos de dados) | ✅ Concluído | Passagem de strings, números, booleanos, objetos (`jogador1`, `placar`), arrays (`jogadas`, `partidas`) e funções de callback a partir do `src/App.jsx`. |
| **4. Virtual DOM e Reconciliação** (atualização declarativa via estado) | ✅ Concluído | Placar interativo ponto a ponto (`0` → `15` → `30` → `40` → `Deuce/AD` → `Game` → `Set`) e cronômetro ao vivo gerenciados com `useState` e `useEffect` em `src/App.jsx`. |
| **5. Listas e Keys** (`.map()`, `.filter()`, `key` única e imutabilidade) | ✅ Concluído | Filtragem e listagem de lances em `HistoricoJogadas.jsx`, métricas em `PainelPlacarAoVivo.jsx`, sets em `CronometroPartida.jsx` e feed em `DestaquesTransmissao.jsx`. |
| **6. Renderização Condicional** (`if / return` antecipado e ternário `? :`) | ✅ Concluído | `if (resultados.length === 0) return ...` em `ListaResultadosJogadas` (`HistoricoJogadas.jsx`), além de ternários e `&&` para *Break Point*, *Deuce*, tenista sacador e status *AO VIVO / PAUSADO*. |
| **7. README.md** (descrição, funcionalidades e conceitos utilizados) | ✅ Concluído | Documentado integralmente neste arquivo `README.md`. |

---

## 📦 Estrutura dos Entregáveis do Projeto

### 1. Código-Fonte da Aplicação (`src/`)
- **`src/main.jsx`**: Ponto de entrada que monta a árvore React na `<div id="root">`.
- **`src/App.jsx`**: Componente principal contendo o estado das partidas, lógica de pontuação do tênis, cronômetro e distribuição de `props`.
- **`src/data/partidasData.js`**: Base de dados estruturada das duas partidas (**Ramirez vs Kowalski** e **M. Carter vs A. Petrovic**).
- **12 Componentes em `src/components/`**:
  1. `Cabecalho.jsx` — Barra superior com status ao vivo e seletor de partidas.
  2. `CardHeroPartida.jsx` — Banner principal do confronto com botão de simulação rápida de ponto.
  3. `CardMetricaCircular.jsx` — Medidor circular (`conic-gradient`) da velocidade de Forehand.
  4. `CardMetricaDestaque.jsx` — Indicador de Aces com avatares dos tenistas e botão `+ Ace`.
  5. `CardMetricaProgresso.jsx` — Cartão reutilizável com barra de progresso (*Baseline Win* e *Volley Accuracy*).
  6. `CronometroPartida.jsx` — Cronômetro interativo (*Play/Pause*) e parciais dos 3 sets.
  7. `PainelPlacarAoVivo.jsx` — Placar interativo (Sets, Games, Pontos `0/15/30/40/AD`) e filtro de estatísticas por categoria/set.
  8. `ItemEstatistica.jsx` — Linha reutilizável de estatística comparativa com ícone e barra graduada.
  9. `HistoricoJogadas.jsx` — Lista *Play-by-Play* com renderização condicional para busca vazia.
  10. `BarraDePesquisa.jsx` — Input controlado de busca textual e pílulas de filtro por tipo de lance.
  11. `GraficoRitmoPartida.jsx` — Gráfico SVG de velocidade de saque por game sobre imagem de quadra.
  12. `ResumoConfronto.jsx`, `DestaquesTransmissao.jsx` e `Rodape.jsx` — Painel *Head-to-Head*, feed tático e rodapé institucional.

### 2. Configuração e Empacotamento
- **`package.json`**, **`vite.config.js`**, **`index.html`** e **`.gitignore`**.

---

## 🚀 Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse o link local exibido no terminal (ex: `http://localhost:5173`).

