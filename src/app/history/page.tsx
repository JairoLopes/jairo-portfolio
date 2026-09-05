import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import {
  RiBuilding4Line,
  RiMapPinLine,
  RiCalendarLine,
  RiCheckboxCircleLine,
  RiTimeLine,
} from "react-icons/ri";

/**
 * @Responsabilidade: Exibir a linha do tempo e histórico de carreira profissional do desenvolvedor, demonstrando evolução técnica, liderança e realizações.
 * @Fluxo: Renderiza como Server Component -> Monta cabeçalho com TitleAnimated -> Mapeia as 4 etapas profissionais estruturadas em ordem cronológica inversa -> Renderiza cards interativos com timeline visual e indicadores de impacto.
 * @Entradas: N/A (Server Component de rota "/history").
 * @Saídas: Interface rica com cards estilo Glassmorphism diferenciados por marcadores temporais, métricas de impacto e tags de tecnologias.
 * @Dependencias: react, react-icons/ri, TitleAnimated (@/components/animatedComponents/TitleAnimated).
 * @Regras_de_negocio: Os 4 cards devem ser distinguidos dos cards de projetos através de foco em cronologia, realizações com métricas e ausência de botões de deploy; o cargo mais recente possui badge pulsante de posição atual.
 * @Limitacoes: Dados estruturados estaticamente (mock de carreira); preparado para futura sincronização com perfis externos (LinkedIn/JSON).
 * @Edge_cases: Em resoluções móveis, a linha de timeline é ajustada para margem esquerda reduzida, evitando quebra de textos.
 * @Arquivos_relacionados: src/components/animatedComponents/TitleAnimated.tsx, src/app/globals.css, src/app/layout.tsx.
 */

interface CareerMilestone {
  readonly id: string;
  readonly role: string;
  readonly company: string;
  readonly location: string;
  readonly period: string;
  readonly isCurrent?: boolean;
  readonly summary: string;
  readonly keyAchievements: readonly string[];
  readonly technologies: readonly string[];
}

const CAREER_HISTORY: readonly CareerMilestone[] = [
  {
    id: "milestone-1",
    role: "Desenvolvedor Front-end",
    company: "Freelancer",
    location: "Home Office",
    period: "2025",
    isCurrent: true,
    summary:
      "Desenvolvimento de interfaces web responsivas utilizando Next.js, Tailwind e TypeScript para a criação de componentes reutilizáveis para diferentes dispositivos.",
    keyAchievements: [
      "Criação de interfaces web responsivas com foco em performance e componentização avançada.",
    ],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "React", "prisma"],
  },
  {
    id: "milestone-2",
    role: "Programador Front-end",
    company: "Prefeitura de Olinda",
    location: "Olinda - PE",
    period: "2022",
    isCurrent: false,
    summary:
      "Realização de ajustes e melhorias no front-end de sistemas corporativos utilizando React.",
    keyAchievements: [
      "Evolução contínua e otimização de interfaces para sistemas corporativos públicos.",
    ],
    technologies: ["React", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "milestone-3",
    role: "Técnico em Segurança da Informação",
    company: "Bidweb Security",
    location: "Recife - PE",
    period: "2020",
    isCurrent: false,
    summary:
      "Trabalhando com o desenvolvimento e manutenção de scripts Python em containers, e monitoramento de ameaças.",
    keyAchievements: [
      "Automação de processos e isolamento de aplicações de monitoramento utilizando containers.",
    ],
    technologies: ["Python", "Docker", "Linux", "Segurança da Informação"],
  },
  {
    id: "milestone-4",
    role: "Help Desk",
    company: "Secretaria da Fazenda",
    location: "Recife - PE",
    period: "2017",
    isCurrent: false,
    summary:
      "Prestação de suporte técnico a sistemas e infraestrutura interna.",
    keyAchievements: [
      "Resolução ágil de chamados técnicos, garantindo a estabilidade operacional dos postos de atendimento.",
    ],
    technologies: [
      "Suporte Técnico",
      "Redes",
      "Hardware",
      "Sistemas Operacionais",
    ],
  },
] as const;

export default function HistoryPage() {
  return (
    <section
      aria-labelledby="history-heading"
      className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16"
    >
      {/* Cabeçalho da Seção com Título Animado */}
      <header className="mb-12 text-center md:mb-16">
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiTimeLine className="h-3.5 w-3.5" />
          <span>TRAJETÓRIA & EXPERIÊNCIA PROFISSIONAL</span>
        </div>
        <TitleAnimated>
          <span className="text-foreground">Histórico & </span>
          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Evolução de Carreira
          </span>
        </TitleAnimated>
        <p className="text-foreground-muted mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
          Um resumo da minha trajetória e das experiências que construí ao longo
          da minha jornada{" "}
          <span className="text-accent-magenta">na área de tecnologia</span>
        </p>
      </header>

      {/* Timeline Linear com Conexão Visual Vertical */}
      <div className="border-border/70 relative ml-2 space-y-10 border-l pl-6 sm:ml-4 sm:pl-8">
        {CAREER_HISTORY.map((item) => (
          <article key={item.id} className="group relative">
            {/* Marcador Visual da Linha do Tempo */}
            <div
              aria-hidden="true"
              className={`bg-background absolute top-5 -left-7.75 flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 sm:-left-9.75 ${
                item.isCurrent
                  ? "border-primary ring-primary/20 shadow-[0_0_12px_rgba(56,189,248,0.8)] ring-4"
                  : "border-border group-hover:border-primary/60 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full transition-colors ${
                  item.isCurrent
                    ? "bg-primary animate-pulse"
                    : "bg-foreground-subtle group-hover:bg-primary"
                }`}
              />
            </div>

            {/* Card Glassmorphism com Detalhes da Atuação */}
            <div className="glass-panel hover:border-border-glow rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(56,189,248,0.12)]">
              {/* Header do Card: Período, Status e Cargo */}
              <div className="border-border/60 flex flex-wrap items-center justify-between gap-2 border-b pb-4">
                <div>
                  <h2 className="text-foreground group-hover:text-primary text-lg font-semibold tracking-tight transition-colors">
                    {item.role}
                  </h2>
                  <div className="text-foreground-muted mt-1 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <span className="text-foreground flex items-center gap-1 font-medium">
                      <RiBuilding4Line className="text-primary h-3.5 w-3.5" />
                      {item.company}
                    </span>
                    <span className="text-foreground-subtle">•</span>
                    <span className="text-foreground-subtle flex items-center gap-1">
                      <RiMapPinLine className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Badge de Período / Status */}
                <div className="flex items-center gap-2">
                  {item.isCurrent && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
                      ATUAL
                    </span>
                  )}
                  <span className="glass-panel text-foreground-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs">
                    <RiCalendarLine className="text-primary h-3 w-3" />
                    {item.period}
                  </span>
                </div>
              </div>

              {/* Resumo da Atuação */}
              <p className="text-foreground-muted mt-4 text-xs leading-relaxed sm:text-sm">
                {item.summary}
              </p>

              {/* Principais Realizações e Impactos Técnicos */}
              <div className="mt-5 space-y-2">
                <span className="text-foreground-subtle block font-mono text-[11px] tracking-wider uppercase">
                  Realizações e Impactos Chave:
                </span>
                <ul className="space-y-2">
                  {item.keyAchievements.map((achieve, idx) => (
                    <li
                      key={idx}
                      className="text-foreground-muted flex items-start gap-2 text-xs sm:text-sm"
                    >
                      <RiCheckboxCircleLine className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                      <span>{achieve}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Badges de Tecnologias Utilizadas */}
              <div className="border-border/60 mt-6 border-t pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-foreground-subtle hover:text-primary hover:border-primary/30 inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
