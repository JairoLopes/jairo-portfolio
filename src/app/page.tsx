// src/app/page.tsx
import Link from "next/link";
import {
  RiWhatsappFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiArrowRightUpLine,
  RiMapPinLine,
  RiCodeSSlashLine,
  RiRocketLine,
} from "react-icons/ri";
import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";

/**
 * @Responsabilidade: Apresentar a porta de entrada do portfólio (Hero Section), destacando identidade profissional, especialidades técnicas, canais diretos de contato e um snippet de código estilizado como editor.
 * @Fluxo: Renderiza como Server Component -> Badge de status ativo -> TitleAnimated (título principal) -> SubTitleAnimated (especialidade) -> Linha de quick info com localização, foco e stack -> Snippet de código com chrome de janela e numeração de linhas -> Grupo de botões de contato (WhatsApp, GitHub, LinkedIn).
 * @Entradas: N/A (Server Component de rota raiz "/").
 * @Saídas: Interface centralizada, responsiva e compacta, com microinterações via Tailwind e animações delegadas aos componentes folha.
 * @Dependencias: react, next/link, react-icons/ri, TitleAnimated (@/components/animatedComponents/TitleAnimated), SubTitleAnimated (@/components/animatedComponents/SubTitleAnimated).
 * @Regras_de_negocio: Área de toque dos botões deve respeitar no mínimo 44px de altura (h-12); links externos com atributos de segurança rel="noopener noreferrer"; layout mobile-first; identidade visual (Glassmorphism + dark + cyan/roxo/magenta) preservada.
 * @Limitacoes: Renderiza estaticamente no servidor; animações interativas complexas são delegadas aos componentes folha em animatedComponents.
 * @Edge_cases: Em telas pequenas os botões empilham verticalmente; chips de quick info quebram linha naturalmente via flex-wrap; snippets longos quebram palavra dentro do bloco com overflow controlado.
 * @Arquivos_relacionados: src/components/animatedComponents/TitleAnimated.tsx, src/components/animatedComponents/SubTitleAnimated.tsx, src/app/globals.css, src/app/layout.tsx.
 */

// Lista estática das principais tecnologias.
// Fica fora do componente para não recriar o array a cada render (mesmo em Server Component,
// essa organização facilita leitura e futura extração para CMS/API).
const STACK_HIGHLIGHTS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind v4",
  "Prisma",
] as const;

export default function Home() {
  return (
    <section
      // Referência de acessibilidade: o título principal define o nome da seção.
      aria-labelledby="hero-title"
      // Centraliza vertical e horizontalmente, limita a largura e usa padding enxuto.
      className="mx-auto flex min-h-svh w-full max-w-4xl flex-1 flex-col items-center justify-center px-8 py-10 text-center sm:px-6 md:py-14"
    >
      {/* ============================================================
          BLOCO 1 — Badge de status "Disponível para novos projetos"
          ============================================================ */}
      {/* Chip de status com indicador pulsante. Comunica disponibilidade
          antes de qualquer outro conteúdo — é a primeira coisa que o olho pega. */}
      <div className="border-border bg-surface text-foreground-muted mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 font-mono text-xs tracking-wide shadow-lg shadow-black/40 backdrop-blur-md">
        {/* Ponto duplo: um com animate-ping (efeito sonar) e outro sólido por cima. */}
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="select-none">DISPONÍVEL PARA NOVOS PROJETOS</span>
      </div>

      {/* ============================================================
          BLOCO 2 — Título principal
          ============================================================ */}
      {/* Título com animação isolada em Client Component (TitleAnimated).
          Mantém-se dentro de uma div com margem controlada para
          respeitar o espaçamento global do hero. */}
      <div className="mb-4">
        <TitleAnimated>
          <span className="text-foreground">Olá, eu sou </span>
          {/* Texto com gradiente via bg-clip-text — herda a paleta cyan → roxo. */}
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Jairo Lopes
          </span>
        </TitleAnimated>
      </div>

      {/* ============================================================
          BLOCO 3 — Subtítulo de especialidade
          ============================================================ */}
      {/* Subtítulo com animação de blur (SubTitleAnimated). Aplica-se
          destaque apenas às tecnologias centrais para não competir
          com o título principal. */}
      <SubTitleAnimated>
        <h2 className="text-foreground-muted max-w-2xl text-base leading-relaxed font-normal sm:text-lg">
          <strong className="text-foreground font-semibold">
            Desenvolvedor Next.js,
          </strong>{" "}
          focado na criação de aplicações web de alto desempenho, arquiteturas
          modernas com <span className="text-primary font-medium">Next.js</span>
          , ecossistema{" "}
          <span className="text-accent-purple font-medium">React</span>,{" "}
          <span className="text-accent-magenta font-medium">TypeScript</span> e
          produtos SaaS escaláveis.
        </h2>
      </SubTitleAnimated>

      {/* ============================================================
          BLOCO 4 — Quick info (localização · foco · stack)
          ============================================================ */}
      {/* Linha enxuta de "credenciais rápidas" — cada item é um chip textual
          com ícone à esquerda. Ficam num flex-wrap para quebrar
          elegantemente em telas estreitas. */}
      <div className="text-foreground-subtle mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
        {/* Item 1: localização / modelo de trabalho */}
        <span className="inline-flex items-center gap-1.5">
          <RiMapPinLine className="text-primary h-3.5 w-3.5" />
          Brasil
        </span>

        {/* Separador visual entre itens (apenas decorativo). */}
        <span
          className="bg-border hidden h-3 w-px sm:inline-block"
          aria-hidden="true"
        />

        {/* Item 2: tipo de atuação profissional */}
        <span className="inline-flex items-center gap-1.5">
          <RiCodeSSlashLine className="text-accent-purple h-3.5 w-3.5" />
          Desenvolvimento web
        </span>

        {/* Separador visual entre itens (apenas decorativo). */}
        <span
          className="bg-border hidden h-3 w-px sm:inline-block"
          aria-hidden="true"
        />

        {/* Item 3: foco principal de mercado */}
        <span className="inline-flex items-center gap-1.5">
          <RiRocketLine className="text-accent-magenta h-3.5 w-3.5" />
          Foco em SaaS
        </span>
      </div>

      {/* ============================================================
          BLOCO 5 — Snippet de código estilizado como editor
          ============================================================ */}
      {/* Simula uma janela de editor com chrome (dots + filename + badge de
          linguagem) e um corpo com numeração de linhas. Reforça a identidade
          "software developer" sem depender de imagens externas. */}
      <div className="mt-8 mb-8 w-full max-w-md">
        <div className="glass-panel overflow-hidden rounded-xl text-left shadow-xl">
          {/* Chrome da janela: dots coloridos, nome do arquivo e badge de linguagem */}
          <div className="border-border flex items-center justify-between border-b px-3 py-2">
            {/* Lado esquerdo: dots estilo macOS + nome do arquivo em monospace */}
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full bg-rose-500/80"
                aria-hidden="true"
              />
              <span
                className="h-2 w-2 rounded-full bg-amber-500/80"
                aria-hidden="true"
              />
              <span
                className="h-2 w-2 rounded-full bg-emerald-500/80"
                aria-hidden="true"
              />
              <span className="text-foreground-subtle ml-2 font-mono text-[11px] tracking-wider">
                jairo_profile.tsx
              </span>
            </div>

            {/* Lado direito: badge de linguagem sutil */}
            <span className="text-primary border-primary/20 bg-primary/10 rounded-md border px-1.5 py-0.5 font-mono text-[10px] tracking-wider">
              TS
            </span>
          </div>

          {/* Corpo do código com numeração de linhas em grid.
              Cada linha é composta por dois spans: o número (coluna esquerda)
              e o conteúdo de código (coluna direita). */}
          <div className="text-foreground-muted grid grid-cols-[1.5rem_1fr] gap-x-3 px-3 py-3 font-mono text-xs leading-relaxed">
            {/* Linha 1 — abertura do objeto */}
            <span className="text-foreground-subtle/50 select-none">1</span>
            <span>
              <span className="text-accent-magenta">const</span>{" "}
              <span className="text-primary">developer</span> = &#123;
            </span>

            {/* Linha 2 — campo role */}
            <span className="text-foreground-subtle/50 select-none">2</span>
            <span>
              &nbsp;&nbsp;role:{" "}
              <span className="text-emerald-400">
                &quot;Desenvolvedor Next.js&quot;
              </span>
              ,
            </span>

            {/* Linha 3 — array de stack, iterando STACK_HIGHLIGHTS.
                Uso de map para não repetir spans manualmente. */}
            <span className="text-foreground-subtle/50 select-none">3</span>
            <span>
              &nbsp;&nbsp;stack: [
              {STACK_HIGHLIGHTS.map((tech, i) => (
                <span key={tech}>
                  <span className="text-emerald-400">&quot;{tech}&quot;</span>
                  {/* Adiciona vírgula após cada item, exceto o último. */}
                  {i < STACK_HIGHLIGHTS.length - 1 ? ", " : ""}
                </span>
              ))}
              ]
            </span>

            {/* Linha 4 — fechamento do objeto */}
            <span className="text-foreground-subtle/50 select-none">4</span>
            <span>&#125;;</span>
          </div>
        </div>
      </div>

      {/* ============================================================
          BLOCO 6 — Botões de contato
          ============================================================ */}
      {/* Três ações em hierarquia decrescente:
          WhatsApp (primário, gradiente), GitHub (secundário, glass) e
          LinkedIn (terciário, apenas ícone). Todos com h-12 (48px) para
          atender ao mínimo de toque confortável em mobile. */}
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row">
        {/* Botão primário: WhatsApp. Gradiente cyan → azul claro, texto escuro
            e leve scale no hover para reforçar a sensação de CTA. */}
        <Link
          href="https://wa.me/5581997052877?text=Olá%20Jairo,%20encontrei%20seu%20portfólio%20e%20gostaria%20de%20conversar."
          target="_blank"
          rel="noopener noreferrer"
          className="group from-primary to-primary-glow shadow-primary/30 hover:shadow-primary/50 relative flex h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r px-6 text-sm font-semibold text-slate-950 shadow-md transition-all duration-300 hover:scale-105 sm:w-auto"
        >
          <RiWhatsappFill className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          <span>Falar no WhatsApp</span>
          <RiArrowRightUpLine className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Botão secundário: GitHub. Visual glass combinando com os cards,
            hover translada seta diagonal e escala o ícone. */}
        <Link
          href="https://github.com/JairoLopes"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel text-foreground hover:bg-surface-hover hover:border-border-glow group flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-200 sm:w-auto"
        >
          <RiGithubFill className="text-foreground-muted group-hover:text-foreground h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
          <span>GitHub</span>
          <RiArrowRightUpLine className="text-foreground-subtle h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Botão terciário: LinkedIn. Apenas ícone, formato circular.
            aria-label garante leitura por leitores de tela. */}
        <Link
          href="https://www.linkedin.com/in/jairo-lopes-filho/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil do LinkedIn"
          className="glass-panel text-foreground-muted hover:text-primary hover:border-primary/40 group flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-200"
        >
          <RiLinkedinBoxFill className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
        </Link>
      </div>
    </section>
  );
}
