"use client";

/**
 * @Responsabilidade: Fornecer barra de navegação global persistente (Bottom Sheet / Floating Dock) com detecção de rota ativa e suporte a toque responsivo.
 * @Fluxo: Obtém rota atual via usePathname -> Verifica estado de rolagem (UI/UX) -> Renderiza dock flutuante com indicador visual de scroll para mobile.
 * @Dependencias: react (useState, useRef), next/link, next/navigation, motion/react, react-icons/fi.
 * @Regras_de_negocio: Menu fixo no rodapé. Em telas onde o conteúdo excede a largura (mobile), exibe um hint visual dinâmico à direita informando que há mais rotas. O hint desaparece ao rolar.
 */

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  FiHome,
  FiCode,
  FiFolder,
  FiClock,
  FiBriefcase,
  FiChevronRight,
} from "react-icons/fi";

interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}

// Rota de Serviços inserida no array
const NAV_ITEMS: readonly NavItem[] = [
  { label: "Início", path: "/", icon: FiHome },
  { label: "Conhecimentos", path: "/skills", icon: FiCode },
  { label: "Projetos", path: "/projects", icon: FiFolder },
  { label: "Serviços", path: "/job", icon: FiBriefcase },
  { label: "Histórico", path: "/history", icon: FiClock },
] as const;

export default function BottomSheetNav() {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  // Monitora a rolagem para esconder o indicador visual quando o usuário chegar ao final
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    // Margem de 10px para considerar que chegou ao fim do scroll
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setIsScrolledToEnd(true);
    } else {
      setIsScrolledToEnd(false);
    }
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-fit -translate-x-1/2 px-3 md:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative flex w-full max-w-[calc(100vw-2rem)] rounded-full shadow-2xl shadow-black/80">
        {/* Navegação principal com ref e handler de scroll */}
        <nav
          ref={scrollContainerRef}
          onScroll={handleScroll}
          aria-label="Navegação Principal Inferior"
          className="glass-panel no-scrollbar relative flex w-full items-center gap-1 overflow-x-auto rounded-full p-1.5 sm:gap-2 sm:p-2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium tracking-wide transition-all duration-200 active:scale-95 sm:px-4 sm:text-sm ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-foreground-muted hover:text-foreground hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      mass: 0.8,
                    }}
                    className="bg-surface-active border-border-glow shadow-primary/20 absolute inset-0 -z-10 rounded-full border shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur-md"
                  />
                )}

                <Icon
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isActive ? "text-primary scale-110" : ""
                  }`}
                />

                <span className="whitespace-nowrap select-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Indicador Sutil de Rolagem (Scroll Hint) para Mobile */}
        {/* Desaparece suavemente quando o usuário rola o menu até o fim */}
        <AnimatePresence>
          {!isScrolledToEnd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 flex w-12 items-center justify-end rounded-r-full bg-linear-to-l from-[#11131c] to-transparent pr-2 sm:hidden"
            >
              <FiChevronRight className="text-primary/80 h-6 w-6 animate-pulse font-bold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
