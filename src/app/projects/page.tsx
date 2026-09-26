// src/app/projects/page.tsx
import Link from "next/link";
import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  RiExternalLinkLine,
  RiGithubFill,
  RiSparklingLine,
  RiFolderLine,
} from "react-icons/ri";

/**
 * @Responsabilidade: Exibir o catálogo de projetos em cards compactos e ricos em detalhes visuais, mantendo a identidade Glassmorphism do portfólio e reforçando a estética "software developer" através de microelementos (index, brackets, dot pattern, prefixo terminal).
 * @Fluxo: Server Component -> Renderiza cabeçalho animado (TitleAnimated / SubTitleAnimated) -> Mapeia PROJECTS_MOCK em um grid uniforme e responsivo (1 col mobile / 2 col sm / 3 col lg) -> Cada card é estruturado com Card/CardHeader/CardTitle/CardDescription/CardContent/CardFooter + Badge/Button/Separator.
 * @Entradas: N/A (rota estática "/projects").
 * @Saídas: Grid responsivo Mobile-First com cards compactos, bordas sutis, dot pattern de fundo, acentos de canto, número de índice monoespaçado e microinterações suaves de hover.
 * @Dependencias: react, next/link, react-icons/ri, TitleAnimated, SubTitleAnimated, Card/Badge/Button/Separator (@/components/ui).
 * @Regras_de_negocio: Preservar identidade visual (Glassmorphism + dark + cyan/roxo/magenta); manter dados intactos de PROJECTS_MOCK; projeto com isFeatured recebe badge DESTAQUE e accent line magenta no topo; touch targets com no mínimo 44px; links externos com rel="noopener noreferrer"; tipografia monoespaçada em ids, prefixos e tags.
 * @Limitacoes: Consome PROJECTS_MOCK estático; sem integração com GitHub API ou banco de dados.
 * @Edge_cases: Tags longas quebram linha naturalmente dentro de flex-wrap; índice monoespaçado é gerado via padStart para suportar qualquer quantidade de projetos; ausência de isFeatured apenas oculta o badge correspondente sem quebrar o layout.
 * @Arquivos_relacionados: src/components/ui/card.tsx, src/components/ui/badge.tsx, src/components/ui/button.tsx, src/components/ui/separator.tsx, src/components/animatedComponents/TitleAnimated.tsx, src/components/animatedComponents/SubTitleAnimated.tsx, src/app/globals.css.
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
      {/* Cabeçalho da Seção com Título e Subtítulo Animados */}
      <header className="mb-12 text-center md:mb-16">
        {/* Badge acima do título */}
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiSparklingLine className="h-3.5 w-3.5" />
          <span>PORTFÓLIO DE PROJETOS SELECIONADOS</span>
        </div>

        {/* Título animado */}
        <TitleAnimated>
          <span className="text-foreground">Projetos & </span>
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Aplicações em Produção
          </span>
        </TitleAnimated>

        {/* Subtítulo animado */}
        <SubTitleAnimated>
          <p className="text-foreground-muted mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            Uma seleção de aplicações de arquitetura moderna, com código limpo,
            foco em performance, tipagem rigorosa e uma boa UX.
          </p>
        </SubTitleAnimated>
      </header>

      {/* Grid Uniforme de Projetos (1 col mobile / 2 col sm / 3 col lg) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_MOCK.map((project, index) => {
          // Índice monoespaçado com zero à esquerda (01, 02, 03...)
          const displayIndex = String(index + 1).padStart(2, "0");

          return (
            <article key={project.id} aria-label={`Projeto: ${project.title}`}>
              <Card className="glass-panel group hover:border-border-glow relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 p-0 ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]">
                {/* Accent line superior (magenta se destaque, primary caso contrário) */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-px ${
                    project.isFeatured
                      ? "via-accent-magenta/70 bg-linear-to-r from-transparent to-transparent"
                      : "via-primary/40 bg-linear-to-r from-transparent to-transparent"
                  }`}
                />

                {/* Bracket superior esquerdo */}
                <span
                  aria-hidden="true"
                  className="border-primary/40 group-hover:border-primary absolute top-3 left-3 h-3 w-3 border-t border-l transition-colors"
                />
                {/* Bracket inferior direito */}
                <span
                  aria-hidden="true"
                  className="border-primary/40 group-hover:border-primary absolute right-3 bottom-3 h-3 w-3 border-r border-b transition-colors"
                />

                {/* Faixa Visual Compacta com dot pattern + watermark */}
                <div className="relative flex h-24 items-center justify-center overflow-hidden">
                  {/* Dot pattern sutil em background */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-40"
                  />
                  {/* Glow radial sutil */}
                  <div
                    aria-hidden="true"
                    className="bg-primary/15 absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl"
                  />

                  {/* Índice monoespaçado (watermark) */}
                  <span
                    aria-hidden="true"
                    className="text-foreground-subtle/30 group-hover:text-primary/40 absolute top-2 right-3 font-mono text-[10px] tracking-widest transition-colors"
                  >
                    {displayIndex}
                  </span>

                  {/* Ícone central com moldura glass */}
                  <div className="glass-panel border-border group-hover:border-primary/40 relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300">
                    <RiFolderLine className="text-primary h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Status dot (canto superior direito do bloco visual) */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-2 left-3 flex h-2.5 w-2.5"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                </div>

                {/* Conteúdo do Card */}
                <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-5">
                  {/* Parte superioe do card, aborda titulo e descrição do projeto abaixo do titulo*/}
                  <CardHeader className="gap-2.5 p-0">
                    {/* Linha de badges: categoria + destaque opcional */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className="border-primary/20 bg-primary/10 text-primary rounded-full px-2 py-0 text-[10px] font-medium tracking-wide"
                      >
                        {project.category}
                      </Badge>
                      {project.isFeatured && (
                        <Badge className="border-accent-magenta/30 bg-accent-magenta/15 text-accent-magenta gap-1 rounded-full border px-2 py-0 text-[10px] font-semibold tracking-wider">
                          <RiSparklingLine className="h-2.5 w-2.5" />
                          DESTAQUE
                        </Badge>
                      )}
                    </div>

                    {/* Container do titulo do projeto*/}
                    <CardTitle className="flex items-baseline gap-1.5 text-base font-semibold tracking-tight">
                      <span className="text-foreground-subtle font-mono text-xs font-normal">
                        ~/
                      </span>
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </span>
                    </CardTitle>

                    {/* Descrição curta */}
                    <CardDescription className="text-foreground-muted line-clamp-3 text-xs leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Tecnologias Utilizadas */}
                  <CardContent className="mt-auto p-0">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-accent-purple hover:text-foreground hover:border-primary/40 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] transition-colors duration-150"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  {/* Divisória + Ações */}
                  <Separator className="bg-white/5" />

                  <CardFooter className="gap-2 border-0 bg-transparent p-0">
                    <Button
                      size="lg"
                      className="from-primary to-primary-glow text-primary-foreground hover:shadow-primary/40 h-11 flex-1 gap-1.5 rounded-xl bg-linear-to-r px-3 text-xs font-semibold shadow-md transition-all duration-200"
                      nativeButton={false}
                      render={
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <span>Preview</span>
                      <RiExternalLinkLine className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="text-foreground-muted hover:text-foreground hover:border-border-glow h-11 flex-1 gap-1.5 rounded-xl border-white/10 bg-white/5 px-3 text-xs font-medium transition-all duration-200"
                      nativeButton={false}
                      render={
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      }
                    >
                      <RiGithubFill className="h-4 w-4" />
                      <span>Código</span>
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </article>
          );
        })}
      </div>
    </section>
  );
}
