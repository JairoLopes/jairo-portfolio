"use client";

/**
 * Barra de navegação inferior fixa.
 *
 * - Cada rota é um botão escuro com leve transparência.
 * - O container é totalmente transparente — os botões "flutuam" soltos.
 * - Há um pequeno espaçamento separador entre eles.
 * - Em telas pequenas, aparece uma setinha indicando que há mais itens à direita.
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

// ─────────────────────────────────────────────────────────────
// Itens do menu (rota + rótulo + ícone)
// ─────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Início", path: "/", icon: FiHome },
  { label: "Conhecimentos", path: "/skills", icon: FiCode },
  { label: "Projetos", path: "/projects", icon: FiFolder },
  { label: "Serviços", path: "/job", icon: FiBriefcase },
  { label: "Histórico", path: "/history", icon: FiClock },
];

export default function BottomSheetNav() {
  // Rota atual (para saber qual botão marcar como ativo)
  const pathname = usePathname();

  // Referência ao <nav> rolável + estado de "chegou ao fim"
  const navRef = useRef<HTMLElement>(null);
  const [reachedEnd, setReachedEnd] = useState(false);

  // Sempre que o usuário rola o menu, checa se a setinha deve sumir
  function handleScroll() {
    const nav = navRef.current;
    if (!nav) return;

    const distanceToEnd = nav.scrollWidth - nav.clientWidth - nav.scrollLeft;
    setReachedEnd(distanceToEnd < 10);
  }

  return (
    // Camada fixa no rodapé (centralizada, com safe-area para iOS)
    <div
      className="fixed bottom-4 left-1/2 z-50 w-full max-w-fit -translate-x-1/2 px-3 md:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative">
        {/* ── Barra transparente que agrupa os botões ────────────── */}
        <nav
          ref={navRef}
          onScroll={handleScroll}
          aria-label="Navegação principal"
          className="no-scrollbar flex max-w-[calc(100vw-2rem)] items-center gap-2.5 overflow-x-auto p-1 sm:gap-2"
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
                  "border backdrop-blur-md transition-all duration-200 active:scale-95",
                  "text-xs font-medium tracking-wide sm:px-4 sm:text-sm",
                  // 1. Base escura unificada para evitar transparência total em páginas vazias
                  "bg-black/50",
                  isActive
                    ? // Ativo: Apenas texto e borda iluminados (o fundo vem do motion.span)
                      "border-primary/30 text-primary"
                    : // Inativo: Borda sutil e estado de hover
                      "text-foreground-muted hover:text-foreground border-white/8 hover:border-white/15 hover:bg-black/70",
                ].join(" ")}
              >
                {/* Indicador deslizante que acompanha o item ativo */}
                {isActive && (
                  <motion.span
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    // 2. Realce da cor primária posicionado atrás do texto (-z-10),
                    // mas sobreposto ao fundo bg-black/50 do Link
                    className="bg-primary/15 absolute inset-0 -z-10 rounded-lg"
                  />
                )}

                <Icon className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap select-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ── Setinha de "há mais itens" (só aparece no mobile) ─── */}
        <AnimatePresence>
          {!reachedEnd && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-10 items-center justify-end pr-1 sm:hidden"
            >
              <FiChevronRight className="text-primary/80 h-5 w-5 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
