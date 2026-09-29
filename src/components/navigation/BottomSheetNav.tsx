"use client";

/**
 * Barra de navegação inferior fixa.
 *
 * - Cada rota é um botão escuro com leve transparência.
 * - O container é transparente e flutua sobre o conteúdo.
 * - Possui indicador animado via Motion (layoutId="navIndicator") que desliza entre as opções ativas.
 */

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  FiBriefcase,
  FiChevronRight,
  FiClock,
  FiCode,
  FiFolder,
  FiHome,
} from "react-icons/fi";

// Itens do menu (rota + rótulo + ícone)
const NAV_ITEMS = [
  { label: "Início", path: "/", icon: FiHome },
  { label: "Conhecimentos", path: "/skills", icon: FiCode },
  { label: "Projetos", path: "/projects", icon: FiFolder },
  { label: "Serviços", path: "/job", icon: FiBriefcase },
  { label: "Histórico", path: "/history", icon: FiClock },
];

export default function BottomSheetNav() {
  // Rota atual (para definir o item ativo)
  const pathname = usePathname();

  // Referência ao <nav> rolável + estado de alcance do fim da barra (mobile)
  const navRef = useRef<HTMLElement>(null);
  const [reachedEnd, setReachedEnd] = useState(false);

  function handleScroll() {
    const nav = navRef.current;
    if (!nav) return;

    const distanceToEnd = nav.scrollWidth - nav.clientWidth - nav.scrollLeft;
    setReachedEnd(distanceToEnd < 10);
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-3 md:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative">
        {/* Barra transparente que agrupa os botões */}
        <nav
          ref={navRef}
          onScroll={handleScroll}
          aria-label="Navegação principal"
          className="no-scrollbar flex max-w-[calc(100vw-2rem)] items-center gap-1.5 overflow-x-auto p-1 sm:gap-2"
          style={{ contain: "layout" }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-4.5 py-4",
                  "transition-all duration-200 active:scale-95",
                  "text-xs font-medium tracking-wide sm:px-4 sm:text-sm",
                  isActive
                    ? "font-semibold text-white"
                    : "text-foreground-muted hover:text-foreground border border-white/8 bg-black/85 hover:border-white/15",
                ].join(" ")}
              >
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute inset-0 -z-10 overflow-hidden rounded-lg border border-white/5 bg-black/90 backdrop-blur-md"
                  >
                    {/* Borda superior desvanecendo para a direita */}
                    <span className="from-primary via-primary-glow absolute inset-x-0 top-0 h-[1.5px] bg-linear-to-r to-transparent shadow-[0_0_8px_rgba(125,211,252,0.4)]" />

                    {/* Borda inferior desvanecendo para a esquerda */}
                    <span className="from-primary-glow via-primary/50 absolute inset-x-0 bottom-0 h-[1.5px] bg-linear-to-l to-transparent" />
                  </motion.span>
                )}

                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`}
                />
                <span className="whitespace-nowrap select-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Setinha de indicação de scroll (mobile) */}
        <AnimatePresence>
          {!reachedEnd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-10 items-center justify-end pr-1 sm:hidden"
            >
              <FiChevronRight className="text-primary-glow h-7 w-7 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
