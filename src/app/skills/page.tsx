/**
 * @Responsabilidade: Apresentar a stack técnica do desenvolvedor organizada por
 * categorias (Front-end / Back-end / Ferramentas) através de um sistema de abas
 * acessível e preservar a seção de formação acadêmica em bloco separado.
 * @Fluxo: Renderiza como Server Component -> Cabeçalho animado
 * (TitleAnimated/SubTitleAnimated) -> Componente Tabs (Client isolado em
 * @/components/ui/tabs.tsx) organiza as três categorias -> Aba Front-end exibe
 * Core Stack destacado + tecnologias complementares -> Abas Back-end e
 * Ferramentas exibem grids de skills -> Bloco final com formação acadêmica.
 * @Entradas: N/A (Server Component de rota "/skills").
 * @Saídas: Interface com abas responsivas, cards compactos em Glassmorphism,
 * badges discretos, layout mobile-first (1 col) -> tablet (2 col) -> desktop (3 col).
 * @Dependencias: react, react-icons/si, react-icons/ri, react-icons/tb,
 * @/components/ui/{tabs,card,badge,separator},
 * @/components/animatedComponents/{TitleAnimated,SubTitleAnimated}, @/lib/utils.
 * @Regras_de_negocio: Core Stack (Next.js, React, TypeScript, Tailwind CSS, Zod)
 * recebe destaque visual discreto via badge CORE; cada tecnologia aparece em
 * apenas uma aba (sem duplicação); identidade visual (Glassmorphism + dark +
 * cyan/roxo/magenta) preservada; nenhuma dependência nova adicionada.
 * @Limitacoes: Dados estruturados estaticamente no arquivo; expansão futura pode
 * consumir CMS ou API.
 * @Edge_cases: Grid do Core Stack com 5 itens distribui-se naturalmente em
 * 1/2/3 colunas; pills de conceitos quebram linha via flex-wrap sem overflow
 * horizontal; o componente Tabs preserva navegação por teclado e foco visível.
 * @Arquivos_relacionados: src/components/ui/tabs.tsx, src/components/ui/card.tsx,
 * src/components/ui/badge.tsx, src/components/ui/separator.tsx,
 * src/components/animatedComponents/TitleAnimated.tsx,
 * src/components/animatedComponents/SubTitleAnimated.tsx, src/app/globals.css.
 */

import type { ComponentType } from "react";

import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// ── Ícones: stack técnica (Simple Icons) ───────────────────────
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

// ── Ícones: semânticos e de apoio (Remix Icon) ─────────────────
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

// =============================================================
// Tipagens
// =============================================================

interface Skill {
  readonly name: string;
  readonly icon: ComponentType<{ className?: string }>;
  readonly category: string;
  readonly concepts: readonly string[];
}

interface AcademicDegree {
  readonly title: string;
  readonly type: string;
  readonly institution: string;
  readonly period: string;
  readonly description: string;
  readonly highlights: readonly string[];
}

// =============================================================
// Dados: Core Stack — destaque dentro da aba Front-end
// =============================================================
// Tecnologias que representam a base principal do stack atual.
// Zod entra aqui como peça de validação/schema do ecossistema.
const CORE_STACK: readonly Skill[] = [
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
] as const;

// =============================================================
// Dados: Tecnologias complementares (aba Front-end)
// =============================================================
const FRONTEND_COMPLEMENTARY: readonly Skill[] = [
  {
    name: "Motion",
    icon: SiFramer,
    category: "Animação",
    concepts: ["Variants", "Layout Anim"],
  },
] as const;

// =============================================================
// Dados: Back-end, Dados & Integração (aba Back-end)
// =============================================================
const BACKEND_SKILLS: readonly Skill[] = [
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
] as const;

// =============================================================
// Dados: Ferramentas, Ambiente & DevOps (aba Ferramentas)
// =============================================================
const TOOLS_SKILLS: readonly Skill[] = [
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
] as const;

// =============================================================
// Dados: Formação acadêmica (preservada do layout original)
// =============================================================
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
] as const;

// =============================================================
// Classe compartilhada dos TabsTrigger (evita repetição)
// =============================================================
// Cobre: tamanho de toque confortável (h-10), tipografia compacta,
// estado inativo discreto e estado ativo com tint primário sutil.
// O "dark:data-active:*" é obrigatório para sobrepor os defaults do
// componente Tabs (que aplica dark:data-active:bg-input/30).
const TAB_TRIGGER_CLASS = cn(
  "text-foreground-muted h-10 gap-2 rounded-full border-transparent px-3 text-xs font-medium tracking-wide transition-all",
  "hover:text-foreground",
  "data-active:bg-primary/15 data-active:text-primary",
  "dark:data-active:bg-primary/15 dark:data-active:text-primary",
  "data-active:shadow-[0_0_15px_rgba(56,189,248,0.15)]",
  "sm:text-sm",
);

// =============================================================
// Componente auxiliar: SkillCard
// =============================================================
// Card compacto e escaneável. O modo "featured" (usado no Core Stack)
// aplica ícone maior, tipografia um grau acima e glow discreto.
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
        "glass-panel group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border border-white/5 p-4 ring-0",
        "hover:border-border-glow transition-all duration-300 hover:-translate-y-0.5",
        "hover:shadow-[0_0_20px_rgba(56,189,248,0.12)]",
        featured &&
          "border-primary/20 hover:shadow-[0_0_25px_rgba(56,189,248,0.18)]",
      )}
    >
      {/* Cabeçalho do card: ícone + nome + categoria + badge CORE */}
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

      {/* Conceitos em pills monoespaçadas (mesmo padrão visual de /projects) */}
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
// Componente auxiliar: SectionHeading
// =============================================================
// Cabeçalho pequeno usado dentro das abas e no bloco acadêmico.
// O parâmetro "accent" alterna entre primary (cyan) e magenta para
// criar ritmo visual entre seções dentro da mesma aba.
function SectionHeading({
  icon: Icon,
  title,
  accent = "primary",
}: {
  icon: ComponentType<{ className?: string }>;
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

// =============================================================
// Página: /skills
// =============================================================
export default function SkillsPage() {
  return (
    <section
      aria-label="Habilidades e Stack Técnica"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16"
    >
      {/* ============================================================
          Cabeçalho da seção: badge + título animado + subtítulo
          ============================================================ */}
      <header className="mb-12 text-center md:mb-16">
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiBookOpenLine className="h-3.5 w-3.5" aria-hidden="true" />
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

      {/* ============================================================
          Bloco 1: Stack Técnica com Tabs
          ============================================================ */}
      <div className="mb-16">
        <Tabs defaultValue="frontend" className="w-full gap-8">
          {/* Navegação por categorias (segmented control glass) */}
          <TabsList
            className={cn(
              "glass-panel mx-auto flex w-full max-w-md items-center justify-center gap-1 rounded-full border p-1.5 group-data-horizontal/tabs:h-auto",
            )}
          >
            <TabsTrigger value="frontend" className={TAB_TRIGGER_CLASS}>
              <RiCodeSSlashLine className="size-3.5" aria-hidden="true" />
              <span>Front-end</span>
            </TabsTrigger>
            <TabsTrigger value="backend" className={TAB_TRIGGER_CLASS}>
              <RiDatabase2Line className="size-3.5" aria-hidden="true" />
              <span>Back-end</span>
            </TabsTrigger>
            <TabsTrigger value="tools" className={TAB_TRIGGER_CLASS}>
              <RiToolsLine className="size-3.5" aria-hidden="true" />
              <span>Ferramentas</span>
            </TabsTrigger>
          </TabsList>

          {/* ------------------------------------------------------------
              Aba: Front-end
              ------------------------------------------------------------ */}
          <TabsContent value="frontend" className="space-y-10">
            {/* Core Stack: tecnologias que representam a base principal */}
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

            {/* Separador entre Core Stack e complementares */}
            <Separator className="bg-white/5" />

            {/* Tecnologias complementares do ecossistema front-end */}
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

          {/* ------------------------------------------------------------
              Aba: Back-end
              ------------------------------------------------------------ */}
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

          {/* ------------------------------------------------------------
              Aba: Ferramentas
              ------------------------------------------------------------ */}
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

      {/* ============================================================
          Bloco 2: Formação Acadêmica (fora das Tabs)
          ============================================================ */}
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
