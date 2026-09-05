"use client";

/**
 * @Responsabilidade: Fornecer barra de navegação global persistente (Bottom Sheet / Floating Dock) com detecção de rota ativa e suporte a toque responsivo.
 * @Fluxo: Obtém rota atual via usePathname -> Mapeia lista de rotas estruturadas -> Renderiza dock flutuante fixo na base da viewport com indicador visual animado via Motion.
 * @Entradas: N/A (Componente autônomo conectado ao roteamento do Next.js).
 * @Saídas: Interface de navegação acessível com links semânticos (next/link) e feedback visual de estado ativo.
 * @Dependencias: react, next/link, next/navigation (usePathname), motion/react (motion, AnimatePresence), react-icons/fi.
 * @Regras_de_negocio: O menu deve permanecer fixo no rodapé em Mobile e Desktop, suportar scroll horizontal suave sem barra visível em telas estreitas e garantir touch target mínimo de 44px.
 * @Limitacoes: Renderizado exclusivamente no cliente ("use client") para leitura em tempo real do pathname e animações de transição de aba.
 * @Edge_cases: Sub-rotas não previstas permanecem com fallback limpo sem quebrar o layout; rotas desconhecidas desativam o pill ativo.
 * @Arquivos_relacionados: src/app/layout.tsx, src/app/globals.css, src/app/template.tsx.
 */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FiHome, FiCode, FiFolder, FiClock } from "react-icons/fi";

interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: readonly NavItem[] = [
  {
    label: "Início",
    path: "/",
    icon: FiHome,
  },
  {
    label: "Conhecimentos",
    path: "/skills",
    icon: FiCode,
  },
  {
    label: "Projetos",
    path: "/projects",
    icon: FiFolder,
  },
  {
    label: "Histórico",
    path: "/history",
    icon: FiClock,
  },
] as const;

export default function BottomSheetNav() {
  const pathname = usePathname();

  return (
    <header
      role="banner"
      aria-label="Navegação Principal"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-3 md:bottom-6"
    >
      <nav
        aria-label="Menu Inferior"
        className="glass-panel no-scrollbar relative flex max-w-[calc(100vw-2rem)] items-center gap-1 overflow-x-auto rounded-full p-1.5 shadow-2xl shadow-black/80 sm:gap-2 sm:p-2"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`relative flex min-h-11 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium tracking-wide transition-colors duration-200 sm:px-4 sm:text-sm ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-foreground-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              {/* Pill Animado de Fundo para Rota Ativa */}
              {isActive && (
                <motion.span
                  layoutId="activeNavPill"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 32,
                  }}
                  className="bg-surface-active border-border-glow shadow-primary/20 absolute inset-0 -z-10 rounded-full border shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-md"
                />
              )}

              {/* Ícone Semântico */}
              <Icon
                className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                  isActive ? "text-primary scale-110" : ""
                }`}
              />

              {/* Rótulo de Texto */}
              <span className="whitespace-nowrap select-none">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
