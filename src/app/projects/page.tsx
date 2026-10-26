// src/app/projects/page.tsx

import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";
import { RiSparklingLine } from "react-icons/ri";
import CardProject, { type Project } from "./CardProject";

const PROJECTS_MOCK: readonly Project[] = [
  {
    id: "barbossa",
    title: "Barbossa",
    category: "Marketplace SaaS",
    description:
      "Marketplace em desenvolvimento para conectar clientes a barbearias. A proposta é permitir descobrir estabelecimentos, consultar serviços e preços e agendar atendimentos, enquanto proprietários gerenciam serviços, equipe e agenda.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Prisma",
      "PostgreSQL",
      "Better Auth",
      "Zod",
    ],
    isFeatured: true,
    isCompleted: false,
    isOpenSource: false,
  },
  {
    id: "site-personal",
    title: "Site Personal",
    category: "Landing Page",
    description:
      "Landing page profissional e responsiva para personal trainer, destacando serviços e planos de treino.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://talles-personal.vercel.app/",
    githubUrl: "https://github.com/JairoLopes/talles-personal-nuxt",
    isCompleted: true,
    isOpenSource: true,
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
    isCompleted: true,
    isOpenSource: true,
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
    isCompleted: true,
    isOpenSource: true,
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
          Uma seleção de aplicações de arquitetura moderna, com código limpo,
          foco em performance, tipagem rigorosa e uma boa UX.
        </SubTitleAnimated>
      </header>

      {/* Grid responsivo com cards de altura natural. */}
      <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS_MOCK.map((project, index) => (
          <CardProject key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
