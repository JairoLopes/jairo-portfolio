import React from "react";

import TitleAnimated from "@/components/animatedComponents/TitleAnimated";
import SubTitleAnimated from "@/components/animatedComponents/SubTitleAnimated";

import {
  RiBriefcase4Line,
  RiMacbookLine,
  RiSpeedUpLine,
  RiSmartphoneLine,
  RiCheckboxCircleLine,
  RiCodeSSlashLine,
} from "react-icons/ri";

/**
 * @Responsabilidade: Apresentar os principais serviços oferecidos pelo desenvolvedor,
 * destacando soluções e benefícios de forma clara para potenciais clientes.
 * @Fluxo: Renderiza como Server Component -> Apresenta cabeçalho com TitleAnimated ->
 * Mapeia a matriz de serviços -> Renderiza cards interativos com foco em benefícios.
 * @Entradas: N/A (Server Component de rota "/services").
 * @Saídas: Interface em grid responsivo (1 coluna no mobile, 2 no desktop) com cards
 * em Glassmorphism apresentando serviços de forma simples e comercial.
 * @Dependencias: react, react-icons/ri, TitleAnimated, SubTitleAnimated.
 * @Regras_de_negocio: Linguagem acessível para clientes; foco nos problemas que os
 * serviços resolvem; ausência de valores financeiros; apresentação clara dos principais
 * benefícios e entregáveis.
 * @Limitacoes: Dados estruturados estaticamente.
 * @Arquivos_relacionados: src/components/animatedComponents/TitleAnimated.tsx,
 * src/app/globals.css.
 */

interface ServiceItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly deliverables: readonly string[];
}

/**
 * Catálogo de serviços.
 *
 * Os textos foram mantidos propositalmente menos técnicos, priorizando o que o cliente
 * recebe e o problema que a solução ajuda a resolver, em vez de destacar tecnologias.
 */
const SERVICES_OFFERED: readonly ServiceItem[] = [
  {
    id: "professional-websites",
    title: "Sites e Landing Pages",
    description:
      "Criação de sites profissionais para apresentar sua empresa, seus serviços ou seu trabalho e transformar visitantes em novos contatos.",
    icon: RiMacbookLine,
    deliverables: [
      "Página profissional e personalizada",
      "Experiência perfeita no celular e computador",
      "Integração com WhatsApp e canais de contato",
    ],
  },
  {
    id: "business-presence",
    title: "Presença Digital",
    description:
      "Estruturas digitais pensadas para ajudar sua empresa a ser encontrada, transmitir credibilidade e facilitar o contato com novos clientes.",
    icon: RiBriefcase4Line,
    deliverables: [
      "Apresentação clara dos seus serviços",
      "Estrutura preparada para mecanismos de busca",
      "Links e chamadas para contato bem posicionados",
    ],
  },
  {
    id: "performance-seo",
    title: "Velocidade e Visibilidade",
    description:
      "Melhoria de sites existentes para carregar mais rápido, oferecer uma experiência melhor e aumentar suas chances de ser encontrado no Google.",
    icon: RiSpeedUpLine,
    deliverables: [
      "Carregamento mais rápido",
      "Otimização para dispositivos móveis",
      "Melhor estrutura para mecanismos de busca",
    ],
  },
  {
    id: "web-systems",
    title: "Sistemas e Aplicações Web",
    description:
      "Desenvolvimento de sistemas personalizados para empresas que precisam ir além de um site e transformar processos em soluções digitais.",
    icon: RiCodeSSlashLine,
    deliverables: [
      "Painéis e áreas administrativas",
      "Integração com APIs e serviços externos",
      "Soluções personalizadas para sua necessidade",
    ],
  },
  {
    id: "interface-ux",
    title: "Interfaces e Experiência",
    description:
      "Criação de interfaces modernas, intuitivas e agradáveis de usar, pensando tanto na aparência quanto na facilidade de navegação.",
    icon: RiSmartphoneLine,
    deliverables: [
      "Interface moderna e responsiva",
      "Navegação simples e intuitiva",
      "Experiência consistente em diferentes dispositivos",
    ],
  },
] as const;

export default function ServicesPage() {
  return (
    <section
      aria-labelledby="services-heading"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-12 sm:px-6 md:py-16"
    >
      {/* Cabeçalho da Seção com Título e Subtítulo Animado */}
      <header className="mb-12 text-center md:mb-16">
        {/* Badge acima do título */}
        <div className="border-border bg-surface text-primary mb-3 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 font-mono text-xs backdrop-blur-md">
          <RiBriefcase4Line className="h-3.5 w-3.5" />
          <span>SOLUÇÕES & SERVIÇOS</span>
        </div>

        {/* Título animado */}
        <TitleAnimated>
          <span className="text-foreground">Como posso </span>

          <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text text-transparent">
            Ajudar seu Projeto
          </span>
        </TitleAnimated>

        {/* Subtítulo animado */}
        <SubTitleAnimated>
          <p className="text-foreground-muted mx-auto mt-4 max-w-2xl text-sm leading-relaxed sm:text-base">
            Soluções digitais para transformar ideias em experiências
            profissionais, rápidas e fáceis de usar.
          </p>
        </SubTitleAnimated>
      </header>

      {/* Grid Responsivo Mobile-First para os Serviços */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SERVICES_OFFERED.map((service) => {
          const Icon = service.icon;

          return (
            <article
              key={service.id}
              className="glass-panel hover:border-border-glow group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)] sm:p-8"
            >
              {/* Cabeçalho do Card de Serviço */}
              <div className="mb-5 flex items-center gap-4">
                <div className="bg-surface-active border-border text-primary group-hover:bg-primary/10 rounded-xl border p-3 shadow-inner transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-foreground text-lg font-bold tracking-tight sm:text-xl">
                  {service.title}
                </h2>
              </div>

              {/* Descrição Principal */}
              <p className="text-foreground-muted mb-6 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Linha Divisória */}
              <div className="border-border/60 mt-auto border-t pt-5">
                <span className="text-foreground-subtle mb-3 block font-mono text-[11px] tracking-wider uppercase">
                  O que você recebe:
                </span>

                {/* Lista de Benefícios e Entregáveis */}
                <ul className="space-y-2.5">
                  {service.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-foreground-muted flex items-start gap-2 text-xs sm:text-sm"
                    >
                      <RiCheckboxCircleLine className="text-accent-purple mt-0.5 h-4 w-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
