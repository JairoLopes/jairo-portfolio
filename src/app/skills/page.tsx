import React from "react";

// Componentes de UI e Animação reutilizáveis
import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Ícones da stack técnica (Simple Icons)
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiPrisma,
  SiPostgresql,
  SiSqlite,
  SiNodedotjs,
  SiGit,
  SiLinux,
  SiVercel,
  SiEslint,
  SiPrettier,
  SiNpm,
  SiZod,
} from "react-icons/si";

// Ícones semânticos e de apoio (Remix Icon e Tabler Icons)
import {
  RiCodeSSlashLine,
  RiDatabase2Line,
  RiToolsLine,
  RiSparklingLine,
  RiBookOpenLine,
  RiGraduationCapLine,
  RiCheckDoubleLine,
  RiFirebaseFill,
} from "react-icons/ri";
import { TbApi } from "react-icons/tb";

/**
 * ============================================================================
 * 💡 CONCEITO NEXT.JS (APP ROUTER):
 * Esta página é um SERVER COMPONENT por padrão.
 * - É renderizada diretamente no servidor gerando HTML puro e de rápido carregamento.
 * - Não envia código JavaScript desnecessário para o navegador no carregamento inicial.
 * - O componente interativo de abas (<Tabs />) gerencia a alternância no lado
 *   do cliente de forma isolada sem impactar a performance global.
 * ============================================================================
 */

// =============================================================
// TIPAGENS (Interfaces simples e diretas para fácil leitura)
// =============================================================

// Representa uma tecnologia ou habilidade da stack
interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  concepts: string[];
}

// Representa um item do histórico de formação acadêmica
interface AcademicDegree {
  title: string;
  type: string;
  institution: string;
  period: string;
  description: string;
  highlights: string[];
}

// =============================================================
// DADOS DE CONHECIMENTOS E HABILIDADES
// =============================================================

// Tecnologias principais exibidas na aba Front-end (Com destaque CORE)
const CORE_STACK: Skill[] = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    category: "Framework",
    concepts: ["App Router", "RSC", "Server Actions"],
  },
  {
    name: "React",
    icon: SiReact,
    category: "Biblioteca",
    concepts: ["Hooks", "Composição", "Estado"],
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    category: "Linguagem",
    concepts: ["Strict Mode", "Types", "Genéricos"],
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    category: "Estilo",
    concepts: ["Utility-First", "Mobile-First", "@theme"],
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    category: "UI",
    concepts: ["Componentes estilizados", "Base UI"],
  },
  {
    name: "Zod",
    icon: SiZod,
    category: "Validação",
    concepts: ["Schemas", "safeParse", "Inferência"],
  },
];

// Tecnologias secundárias do Front-end
const FRONTEND_COMPLEMENTARY: Skill[] = [
  {
    name: "Motion",
    icon: SiFramer,
    category: "Animação",
    concepts: ["Variants", "Layout Anim"],
  },
];

// Tecnologias do Back-end, Bancos de Dados e Integrações
const BACKEND_SKILLS: Skill[] = [
  {
    name: "Prisma ORM",
    icon: SiPrisma,
    category: "ORM",
    concepts: ["Schema Declarativo", "Type-Safe", "Migrations"],
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    category: "Banco",
    concepts: ["Relacional", "ACID"],
  },
  {
    name: "Firebase",
    icon: RiFirebaseFill,
    category: "Banco",
    concepts: ["NoSQL", "Firestore"],
  },
  {
    name: "SQLite",
    icon: SiSqlite,
    category: "Banco",
    concepts: ["Embutido", "Prototipagem"],
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    category: "Runtime",
    concepts: ["NPM", "APIs"],
  },
  {
    name: "APIs REST",
    icon: TbApi,
    category: "Integração",
    concepts: ["HTTP", "Autenticação", "Fetch/Axios"],
  },
];

// Ferramentas de ambiente, qualidade e DevOps
const TOOLS_SKILLS: Skill[] = [
  {
    name: "Git",
    icon: SiGit,
    category: "Versionamento",
    concepts: ["Gitflow", "Code Review"],
  },
  {
    name: "Linux",
    icon: SiLinux,
    category: "Sistema",
    concepts: ["Shell", "Servidores"],
  },
  {
    name: "Vercel",
    icon: SiVercel,
    category: "Deploy",
    concepts: ["CI/CD", "Edge"],
  },
  {
    name: "ESLint",
    icon: SiEslint,
    category: "Qualidade",
    concepts: ["Flat Config", "Regras"],
  },
  {
    name: "Prettier",
    icon: SiPrettier,
    category: "Formatação",
    concepts: ["Padronização"],
  },
  {
    name: "NPM",
    icon: SiNpm,
    category: "Pacotes",
    concepts: ["Scripts", "Dependências"],
  },
];

// Histórico acadêmico e especializações
const ACADEMIC_BACKGROUND: AcademicDegree[] = [
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
    title: "Redes de Computadores",
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
];

// Classes CSS reutilizáveis para os gatilhos das abas (TabsTrigger)
const TAB_TRIGGER_CLASS = cn(
  "text-foreground-muted h-10 gap-2 rounded-full border-transparent px-3 text-xs font-medium tracking-wide transition-all",
  "hover:text-foreground",
  "data-active:bg-primary/15 data-active:text-primary",
  "dark:data-active:bg-primary/15 dark:data-active:text-primary",
  "data-active:shadow-[0_0_15px_rgba(56,189,248,0.15)]",
  "sm:text-sm",
);

// =============================================================
// SUBCOMPONENTES AUXILIARES
// =============================================================

/**
 * Componente de título reutilizável para cada subseção da página.
 * Exibe um ícone ao lado de um título estilizado com cor customizável.
 */
function SectionHeading({
  icon: Icon,
  title,
  accent = "primary",
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  accent?: "primary" | "magenta";
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <Icon
        aria-hidden="true"
        className={cn(
          "h-5 w-5",
          accent === "primary" ? "text-primary" : "text-accent-magenta",
        )}
      />
      <h2 className="text-foreground text-base font-semibold tracking-tight sm:text-lg">
        {title}
      </h2>
    </div>
  );
}

/**
 * Card reutilizável para renderizar cada tecnologia individual.
 * Suporta o modo `featured` (destacado) com bordas/glow especiais e badge "CORE".
 */
function SkillCard({
  skill,
  featured = false,
}: {
  skill: Skill;
  featured?: boolean;
}) {
  const Icon = skill.icon;

  return (
    <Card
      className={cn(
        "glass-panel group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 p-4 ring-0 transition-all duration-300 hover:-translate-y-0.5",
        featured
          ? "border-primary/20 hover:border-border-glow hover:shadow-[0_0_25px_rgba(56,189,248,0.18)]"
          : "hover:border-border-glow hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]",
      )}
    >
      {/* Cabeçalho do Card: Ícone + Nome + Categoria */}
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "bg-surface-active border-border flex shrink-0 items-center justify-center rounded-xl border shadow-inner transition-colors duration-300",
            featured
              ? "text-primary group-hover:bg-primary/10 h-10 w-10"
              : "text-accent-purple group-hover:bg-accent-purple/10 h-9 w-9",
          )}
        >
          <Icon
            aria-hidden="true"
            className={featured ? "h-5 w-5" : "h-4 w-4"}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <h3
              className={cn(
                "text-foreground truncate font-semibold tracking-tight",
                featured ? "text-sm sm:text-base" : "text-sm",
              )}
            >
              {skill.name}
            </h3>
            {featured && (
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/10 text-primary h-4 rounded-full px-1.5 text-[9px] font-medium tracking-wider"
              >
                CORE
              </Badge>
            )}
          </div>
          <span className="text-foreground-subtle font-mono text-[10px] tracking-wider uppercase">
            {skill.category}
          </span>
        </div>
      </div>

      {/* Lista de pills/tags com conceitos chave da tecnologia */}
      <div className="mt-3 flex flex-wrap gap-1">
        {skill.concepts.map((concept) => (
          <span
            key={concept}
            className="text-foreground-muted hover:text-primary hover:border-primary/30 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] transition-colors"
          >
            {concept}
          </span>
        ))}
      </div>
    </Card>
  );
}

// =============================================================
// COMPONENTE PRINCIPAL DA PÁGINA (/skills)
// =============================================================

export default function SkillsPage() {
  return (
    <section
      aria-label="Habilidades e Stack Técnica"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16"
    >
      {/* ── CABEÇALHO DA PÁGINA ──────────────────────────────── */}
      <header className="mb-12 text-center md:mb-16">
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiBookOpenLine aria-hidden="true" className="h-3.5 w-3.5" />
          <span>HABILIDADES & TECNOLOGIAS</span>
        </div>

        <TitleAnimated>
          <span className="text-foreground">Formação & </span>
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Conhecimento Técnico
          </span>
        </TitleAnimated>

        <SubTitleAnimated>
          Uma visão organizada das tecnologias que uso no dia a dia, divididas
          por área de atuação.
        </SubTitleAnimated>
      </header>

      {/* ── SEÇÃO DE ABAS (SKILLS) ───────────────────────────── */}
      <div className="mb-16">
        <Tabs defaultValue="frontend" className="w-full gap-8">
          {/* Navegador das abas */}
          <TabsList
            className={cn(
              "glass-panel mx-auto flex w-full max-w-md items-center justify-center gap-1 rounded-full border p-1.5 group-data-horizontal/tabs:h-auto",
            )}
          >
            <TabsTrigger value="frontend" className={TAB_TRIGGER_CLASS}>
              <RiCodeSSlashLine aria-hidden="true" className="size-3.5" />
              <span>Front-end</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className={TAB_TRIGGER_CLASS}>
              <RiDatabase2Line aria-hidden="true" className="size-3.5" />
              <span>Back-end</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className={TAB_TRIGGER_CLASS}>
              <RiToolsLine aria-hidden="true" className="size-3.5" />
              <span>Ferramentas</span>
            </TabsTrigger>
          </TabsList>

          {/* Conteúdo Aba Front-end */}
          <TabsContent value="frontend" className="space-y-10">
            <div>
              <SectionHeading
                icon={RiSparklingLine}
                title="Core Stack"
                accent="primary"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CORE_STACK.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} featured />
                ))}
              </div>
            </div>

            <Separator className="bg-white/5" />

            <div>
              <SectionHeading
                icon={RiCodeSSlashLine}
                title="Tecnologias Complementares"
                accent="magenta"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FRONTEND_COMPLEMENTARY.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Conteúdo Aba Back-end */}
          <TabsContent value="backend">
            <SectionHeading
              icon={RiDatabase2Line}
              title="Back-end, Dados & Integração"
              accent="primary"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BACKEND_SKILLS.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </TabsContent>

          {/* Conteúdo Aba Ferramentas */}
          <TabsContent value="tools">
            <SectionHeading
              icon={RiToolsLine}
              title="Ferramentas, Ambiente & DevOps"
              accent="magenta"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TOOLS_SKILLS.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* ── SEÇÃO FORMAÇÃO ACADÊMICA ─────────────────────────── */}
      <div>
        <SectionHeading
          icon={RiGraduationCapLine}
          title="Formação Acadêmica & Especializações"
          accent="primary"
        />

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
                      <RiCheckDoubleLine
                        aria-hidden="true"
                        className="text-primary h-3.5 w-3.5 shrink-0"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
