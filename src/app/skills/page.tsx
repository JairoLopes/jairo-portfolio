import React from "react";
import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import {
  RiGraduationCapLine,
  RiAwardLine,
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiCheckDoubleLine,
  RiBookOpenLine,
  RiDatabase2Fill,
} from "react-icons/ri";
import {
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaTools } from "react-icons/fa";

/**
 * @Responsabilidade: Apresentar a trajetória acadêmica, especializações e competências técnicas do desenvolvedor de forma hierárquica e categorizada.
 * @Fluxo: Renderiza como Server Component -> Apresenta cabeçalho animado via TitleAnimated -> Exibe cards de formação acadêmica (graduação e pós) -> Renderiza blocos detalhados de skills (Frontend e Backend/Database).
 * @Entradas: N/A (Server Component de rota "/skills").
 * @Saídas: Interface modular com design Glassmorphism, badges monoespaçadas e layout em grid responsivo mobile-first.
 * @Dependencias: react, react-icons/ri, TitleAnimated (@/components/animatedComponents/TitleAnimated).
 * @Regras_de_negocio: Formação acadêmica deve anteceder a grade de competências; cada stack técnica deve detalhar conceitos reais do Next.js App Router, React 19, TS, Tailwind v4 e Prisma; touch targets e espaçamento compatíveis com telas móveis.
 * @Limitacoes: Dados estruturados estaticamente (mock de perfil profissional); expansão futura pode consumir CMS ou banco de dados.
 * @Edge_cases: Descrições longas de cursos quebram elegantemente com leadings confortáveis sem desalinhar os grids em telas estreitas.
 * @Arquivos_relacionados: src/components/animatedComponents/TitleAnimated.tsx, src/app/globals.css, src/app/layout.tsx.
 */

interface AcademicDegree {
  readonly title: string;
  readonly type: string;
  readonly institution: string;
  readonly period: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

interface SkillCategory {
  readonly name: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly description: string;
  readonly skills: readonly {
    readonly name: string;
    readonly icon: React.ComponentType<{ className?: string }>; // <-- Nova linha adicionada
    readonly concepts: readonly string[];
  }[];
}

const ACADEMIC_BACKGROUND: readonly AcademicDegree[] = [
  {
    type: "Pós-Graduação / Especialização",
    title: "Desenvolvimento Web Moderno",
    institution: "EBAC",
    period: "2022 — 2023",
    description:
      "Aprofundamento na construção de aplicações web escaláveis, com foco no ecossistema React e Next.js. Exploração de estratégias de renderização híbrida, gerenciamento de estado, integração de APIs.",
    highlights: [
      "Next.js e Renderização Híbrida (App Router, SSR, SSG e ISR)",
      "Performance, Acessibilidade e Otimização (Core Web Vitals, Caching e SEO Técnico)",
      "Integração de APIs, Server Actions e React Server Components",
    ],
  },
  {
    type: "Graduação",
    title: "Redes de computadores",
    institution: "Uninassau",
    period: "2017 — 2020",
    description:
      "Formação com forte ênfase na administração, sistemas Linux. Arquitetura de redes, Shell Script e gestão de ambientes baseados em sistemas operacionais open source.",
    highlights: [
      "Servidores Linux",
      "Segurança e Gerenciamento de Serviços de Rede (Open Source)",
      "Shell Scripting",
    ],
  },
] as const;

const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    name: "Frontend & Arquitetura de Interface",
    icon: RiCodeSSlashLine,
    description:
      "Construção de aplicações web modernas, com foco em performance, renderização no servidor e excelente experiência do usuário.",
    skills: [
      {
        name: "Next.js (App Router)",
        icon: SiNextdotjs,
        concepts: [
          "React Server Components (RSC)",
          "Server Actions",
          "Otimização de Assets (Fonts/Images)",
        ],
      },
      {
        name: "Ecossistema React",
        icon: SiReact,
        concepts: [
          "Hooks",
          "Composição de Componentes",
          "Gerenciamento Limpo de Estado",
          "Motion / Animações Interativas",
        ],
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        concepts: [
          "Tipagem Estrita (Strict Mode)",
          "Types e Interfaces",
          "Código limpo",
        ],
      },
      {
        name: "Tailwind CSS v4",
        icon: SiTailwindcss,
        concepts: [
          "Configuração centralizada via @theme",
          "Arquitetura Utility-First",
          "Layouts Responsivos focados em Mobile-First",
        ],
      },
    ],
  },
  {
    name: "Backend, Dados & Integração",
    icon: RiDatabase2Line,
    description:
      "Persistência consistente, modelagem relacional de alta integridade e integração fluida entre camada de serviço e banco de dados.",
    skills: [
      {
        name: "Prisma ORM",
        icon: SiPrisma,
        concepts: [
          "Modelagem Declarativa no Schema",
          "Prisma Client Type-Safe",
          "Migrations Automatizadas",
          "Integração com Server Actions",
        ],
      },
      {
        name: "Bancos de Dados Relacionais",
        icon: RiDatabase2Fill,
        concepts: [
          "PostgreSQL & SQLite",
          "Integridade Referencial",
          "Transações ACID",
        ],
      },
      {
        name: "APIs & Fluxo de Dados",
        icon: TbApi,
        concepts: [
          "Axios e Fetch",
          "RESTful Design",
          "Segurança & Sanitização de Dados",
        ],
      },
      {
        name: "DevOps & Ferramentas",
        icon: FaTools,
        concepts: [
          "Git & Gitflow",
          "Deploy Contínuo (Vercel)",
          "ESLint 9 & Prettier",
        ],
      },
    ],
  },
] as const;

export default function SkillsPage() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16"
    >
      {/* Cabeçalho da Seção com Título Animado */}
      <header className="mb-12 text-center md:mb-16">
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiBookOpenLine className="h-3.5 w-3.5" />
          <span>PERFIL ACADÊMICO & EXPERTISE</span>
        </div>
        <TitleAnimated>
          <span className="text-foreground">Formação & </span>
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Habilidades Técnicas
          </span>
        </TitleAnimated>
        <p className="text-foreground-muted mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
          Base educacional que fundamenta meus conhecimentos e as tecnologias
          que uso para programar.
        </p>
      </header>

      {/* ====================================================================
          BLOCO 1: FORMAÇÃO ACADÊMICA
          ==================================================================== */}
      <div className="mb-16">
        <div className="mb-6 flex items-center gap-2.5">
          <RiGraduationCapLine className="text-primary h-6 w-6" />
          <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
            Formação Acadêmica & Especializações
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ACADEMIC_BACKGROUND.map((degree) => (
            <article
              key={degree.title}
              className="glass-panel group hover:border-border-glow relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="bg-primary/10 border-primary/20 text-primary rounded-full border px-3 py-1 text-xs font-medium">
                    {degree.type}
                  </span>
                  <span className="text-foreground-subtle font-mono text-xs">
                    {degree.period}
                  </span>
                </div>

                <h3 className="text-foreground text-lg font-semibold tracking-tight">
                  {degree.title}
                </h3>
                <h4 className="text-accent-magenta mb-3 text-sm font-medium">
                  {degree.institution}
                </h4>

                <p className="text-foreground-muted text-xs leading-relaxed sm:text-sm">
                  {degree.description}
                </p>
              </div>

              <div className="border-border mt-6 border-t pt-4">
                <span className="text-foreground-subtle mb-2 block font-mono text-[11px] tracking-wider uppercase">
                  Destaques da Formação:
                </span>
                <ul className="space-y-1.5">
                  {degree.highlights.map((item) => (
                    <li
                      key={item}
                      className="text-foreground-muted flex items-center gap-2 text-xs"
                    >
                      <RiCheckDoubleLine className="text-primary h-3.5 w-3.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ====================================================================
          BLOCO 2: HABILIDADES TÉCNICAS (STACK REAL)
          ==================================================================== */}
      <div>
        <div className="mb-6 flex items-center gap-2.5">
          <RiAwardLine className="text-accent-magenta h-6 w-6" />
          <h2 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
            Competências Técnicas & Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="glass-panel flex flex-col rounded-2xl p-6 sm:p-7"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="bg-surface-active border-border text-primary rounded-xl border p-2.5 shadow-inner">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground text-lg font-semibold">
                      {cat.name}
                    </h3>
                    <p className="text-foreground-muted text-xs">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {cat.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="border-border/80 bg-surface/50 hover:border-border-glow hover:bg-surface-hover rounded-xl border p-4 transition-colors duration-200"
                      >
                        {/* Wrapper flex para alinhar o ícone com o título da skill */}
                        <div className="mb-3 flex items-center gap-2.5">
                          <SkillIcon className="text-accent-magenta h-5 w-5 shrink-0" />
                          <h4 className="text-foreground text-sm font-semibold tracking-wide">
                            {skill.name}
                          </h4>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {skill.concepts.map((concept) => (
                            <span
                              key={concept}
                              className="text-foreground-muted hover:text-primary hover:border-primary/30 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] transition-colors"
                            >
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
