import Link from "next/link";
import {
  RiWhatsappFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiArrowRightUpLine,
} from "react-icons/ri";
import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";
/**
 * @Responsabilidade: Apresentar a porta de entrada do portfólio (Hero Section), destacando identidade profissional, especialidades técnicas e canais diretos de contato.
 * @Fluxo: Renderiza como Server Component -> Monta badge de status ativo -> Invoca TitleAnimated para o título principal -> Renderiza snippet de especialidades e botões de ação rápida para WhatsApp e GitHub.
 * @Entradas: N/A (Server Component de rota raiz "/").
 * @Saídas: Interface rica, centralizada e responsiva com microinterações via Tailwind e Motion isolado.
 * @Dependencias: react, next/link, react-icons/ri, TitleAnimated (@/components/animatedComponents/TitleAnimated).
 * @Regras_de_negocio: Área de toque dos botões deve respeitar no mínimo 44px de altura (h-11); proibido o uso de valores arbitrários em colchetes; links externos com atributos de segurança rel="noopener noreferrer"; layout mobile-first.
 * @Limitacoes: Renderiza estaticamente no servidor; animações interativas complexas são delegadas aos componentes folha em animatedComponents.
 * @Edge_cases: Em telas pequenas, os botões de ação empilham verticalmente sem quebras de layout.
 * @Arquivos_relacionados: src/components/animatedComponents/TitleAnimated.tsx, src/app/globals.css, src/app/layout.tsx.
 */

export default function Home() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-screen w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 md:py-20"
    >
      {/* Badge acima do titulo */}
      <div className="border-border bg-surface text-foreground-muted mb-6 inline-flex items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-xs tracking-wide shadow-lg shadow-black/40 backdrop-blur-md">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="select-none">DISPONÍVEL PARA NOVOS PROJETOS</span>
      </div>

      {/* Título Principal com Animação Isolada (Client Component) */}
      <div className="mb-10">
        <TitleAnimated>
          <span className="text-foreground">Olá, eu sou </span>
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Jairo Lopes
          </span>
        </TitleAnimated>
      </div>

      {/* Subtítulo de Especialidade */}
      <SubTitleAnimated>
        <h2 className="text-foreground-muted max-w-2xl text-base leading-relaxed font-normal sm:text-lg md:text-xl">
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

      {/* Snippet Developer Touch (Estética Luxury Tech) */}
      <div className="mt-8 mb-10 w-full max-w-md">
        <div className="glass-panel overflow-hidden rounded-xl p-3 text-left font-mono text-xs shadow-xl">
          {/* Container que representa painel da janela */}
          <div className="text-foreground-subtle border-border flex items-center gap-1.5 border-b pb-2">
            <span className="h-2 w-2 rounded-full bg-rose-500/80" />
            <span className="h-2 w-2 rounded-full bg-amber-500/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
            <span className="text-foreground-subtle ml-2 text-xs tracking-wider uppercase">
              jairo_profile.tsx
            </span>
          </div>

          {/* Container que representa o código */}
          <div className="text-foreground-muted pt-2">
            <span className="text-accent-magenta">const</span>{" "}
            <span className="text-primary">developer</span> = &#123;
            <br />
            &nbsp;&nbsp;role:{" "}
            <span className="text-emerald-400">
              &quot;Desenvolvedor Next.js&quot;
            </span>
            ,
            <br />
            &nbsp;&nbsp;stack: [
            <span className="text-emerald-400">&quot;Next.js&quot;</span>,{" "}
            <span className="text-emerald-400">&quot;React&quot;</span>,{" "}
            <span className="text-emerald-400">&quot;Typescript&quot;</span>,{" "}
            <span className="text-emerald-400">&quot;Tailwind v4&quot;</span>,{" "}
            <span className="text-emerald-400">&quot;Prisma&quot;</span>]
            <br />
            &#125;;
          </div>
        </div>
      </div>

      {/* Grupo de Ações e Contato Direto */}
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        {/* Botão Primário WhatsApp */}
        <Link
          href="https://wa.me/5581997052877?text=Olá%20Jairo,%20encontrei%20seu%20portfólio%20e%20gostaria%20de%20conversar."
          target="_blank"
          rel="noopener noreferrer"
          className="group from-primary to-primary-glow shadow-primary/30 hover:shadow-primary/50 relative flex h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-md transition-all duration-300 hover:scale-105 sm:w-auto"
        >
          <RiWhatsappFill className="h-6 w-6 text-slate-950 transition-transform duration-200 group-hover:scale-110" />
          <span>Falar no WhatsApp</span>
          <RiArrowRightUpLine className="h-5 w-5 opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Botão Secundário GitHub */}
        <Link
          href="https://github.com/JairoLopes"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-panel text-foreground hover:bg-surface-hover hover:border-border-glow group flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-200 sm:w-auto"
        >
          <RiGithubFill className="text-foreground-muted group-hover:text-foreground h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
          <span>GitHub</span>
          <RiArrowRightUpLine className="text-foreground-subtle h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        {/* Botão Terciário LinkedIn */}
        <Link
          href="https://www.linkedin.com/in/jairo-lopes-filho/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Perfil do LinkedIn"
          className="glass-panel text-foreground-muted hover:text-primary hover:border-primary/40 group flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-200"
        >
          <RiLinkedinBoxFill className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
        </Link>
      </div>
    </section>
  );
}
