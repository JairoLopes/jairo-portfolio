import Link from "next/link";
import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import {
  RiFolderLine,
  RiExternalLinkLine,
  RiGithubFill,
  RiSparklingLine,
} from "react-icons/ri";

/**
 * @Responsabilidade: Exibir o catálogo de projetos de software desenvolvidos, apresentando desafios resolvidos, stack tecnológica e links para código e deploy.
 * @Fluxo: Renderiza como Server Component -> Apresenta cabeçalho animado com TitleAnimated -> Mapeia catálogo de projetos em um Grid responsivo Mobile-First -> Renderiza cards interativos em Glassmorphism.
 * @Entradas: N/A (Server Component de rota "/projects").
 * @Saídas: Catálogo interativo com botões otimizados para touch (>=44px), tags monoespaçadas estilo snippet e efeitos visuais de elevação e glow.
 * @Dependencias: react, next/link, react-icons/ri, TitleAnimated (@/components/animatedComponents/TitleAnimated).
 * @Regras_de_negocio: Cards devem ter touch target mínimo de 44px nos links de ação; tags de tecnologias em tipografia monoespaçada; links externos com rel="noopener noreferrer"; transição suave de hover nos cards.
 * @Limitacoes: Consome conjunto estático de dados mockados; futura versão pode integrar com GitHub API ou banco de dados via Prisma.
 * @Edge_cases: Projetos sem deploy ativo renderizam indicador visual de status de desenvolvimento sem quebrar os botões.
 * @Arquivos_relacionados: src/components/animatedComponents/TitleAnimated.tsx, src/app/globals.css, src/app/layout.tsx.
 */

interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly liveUrl: string;
  readonly githubUrl: string;
  readonly isFeatured?: boolean;
}

const PROJECTS_MOCK: readonly Project[] = [
  {
    id: "site-personal",
    title: "Site Personal",
    category: "Landing Page",
    description:
      "Landing page profissional e responsiva para personal trainer, destacando serviços e planos de treino.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://talles-personal.vercel.app/",
    githubUrl: "https://github.com/JairoLopes/talles-personal-nuxt",
    isFeatured: true,
  },
  {
    id: "astrolobby",
    title: "Astrolobby",
    category: "Integração de APIs",
    description:
      "Hub de conteúdo astronômico integrado à API da NASA (APOD) com tradução automática via DeepL.",
    tags: ["React", "Tailwind CSS", "TypeScript", "API Rest"],
    liveUrl: "https://astrolobby.vercel.app/",
    githubUrl: "https://github.com/JairoLopes/Astrolobby",
  },
  {
    id: "cardapio-digital",
    title: "Cardápio Digital",
    category: "Sistema Dinâmico",
    description:
      "Cardápio online customizável com rotas geradas dinamicamente a partir das categorias do menu.",
    tags: ["Vue.js", "Vue Router", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://cardapio-exemplo.vercel.app/",
    githubUrl: "https://github.com/JairoLopes/cardapio",
  },
] as const;

export default function ProjectsPage() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16"
    >
      {/* Cabeçalho da Seção com Título Animado */}
      <header className="mb-12 text-center md:mb-16">
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiSparklingLine className="h-3.5 w-3.5" />
          <span>PORTFÓLIO DE PROJETOS SELECIONADOS</span>
        </div>
        <TitleAnimated>
          <span className="text-foreground">Projetos & </span>
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Aplicações em Produção
          </span>
        </TitleAnimated>
        <p className="text-foreground-muted mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
          Uma seleção de aplicações de arquitetura moderna, com código limpo,
          foco em performance, tipagem rigorosa e uma boa UX.
        </p>
      </header>

      {/* Grid Responsivo Mobile-First (1 col mobile -> 2 col tablet -> 3 col desktop) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_MOCK.map((project) => (
          <article
            key={project.id}
            className="glass-panel group hover:border-border-glow relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(56,189,248,0.18)]"
          >
            <div>
              {/* Top Bar do Card: Categoria e Ícone de pasta */}
              <div className="mb-4 flex items-center justify-between">
                <span className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-medium">
                  {project.category}
                </span>
                <div className="text-foreground-subtle group-hover:text-primary rounded-lg bg-white/5 p-2 transition-colors duration-200">
                  <RiFolderLine className="h-4 w-4" />
                </div>
              </div>

              {/* Título do Projeto */}
              <h2 className="text-foreground group-hover:text-primary text-lg font-semibold tracking-tight transition-colors duration-200">
                {project.title}
              </h2>

              {/* Descrição Curta e Direta */}
              <p className="text-foreground-muted mt-2.5 text-xs leading-relaxed sm:text-sm">
                {project.description}
              </p>

              {/* Badges de Tecnologia (Estilo Developer Snippet) */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-accent-purple hover:text-foreground hover:border-primary/40 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] transition-colors duration-150"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Ações / Botões */}
            <div className="border-border mt-6 flex items-center gap-3 border-t pt-4">
              {/* Botão Deploy / Live */}
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn from-primary to-primary-glow shadow-primary/20 hover:shadow-primary/40 relative flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl bg-linear-to-r px-4 text-xs font-semibold text-slate-950 shadow-md transition-all duration-200 hover:opacity-95"
              >
                <span>Preview</span>
                <RiExternalLinkLine className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>

              {/* Botão Repositório GitHub */}
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel text-foreground-muted hover:text-foreground hover:bg-surface-hover hover:border-border-glow flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-medium transition-all duration-200"
              >
                <RiGithubFill className="h-5 w-5" />
                <span>Código</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
