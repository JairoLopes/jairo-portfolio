"use client";

// Navegação inferior com ícones, rótulos e efeito neon.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { FiBriefcase, FiClock, FiCode, FiFolder, FiHome } from "react-icons/fi";

// Rotas, nomes e ícones da navegação.
const NAV_ITEMS = [
  { label: "Início", path: "/", icon: FiHome },
  { label: "Conhecimentos", path: "/skills", icon: FiCode },
  { label: "Projetos", path: "/projects", icon: FiFolder },
  { label: "Serviços", path: "/job", icon: FiBriefcase },
  { label: "Histórico", path: "/history", icon: FiClock },
] as const;

export default function BottomSheetNav() {
  // Identifica a página atual para destacar o item correspondente.
  const pathname = usePathname();

  return (
    // Dock fixo, centralizado e compatível com a área segura do celular.
    <div
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-3 md:bottom-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Cápsula escura com transparência, borda e sombra. */}
      <nav
        aria-label="Navegação principal"
        className="flex w-max max-w-[calc(100vw-1.5rem)] items-center gap-1 rounded-2xl border border-white/10 bg-[#080711]/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            // Link com ícone e nome, organizados verticalmente.
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
              className={`group focus-visible:ring-primary relative flex h-14 min-w-11 flex-col items-center justify-center gap-1 rounded-xl px-1 transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none active:scale-95 sm:min-w-[68px] sm:px-2 ${
                isActive
                  ? "text-primary"
                  : "text-foreground-subtle hover:text-foreground"
              }`}
            >
              {/* Halo luminoso atrás do ícone ativo. */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="bg-primary/10 absolute inset-x-1 top-1 h-8 rounded-lg shadow-[0_0_18px_rgba(125,211,252,0.12)]"
                />
              )}

              {/* Ícone com brilho ciano na rota selecionada. */}
              <Icon
                aria-hidden="true"
                className={`relative z-10 size-5 transition-[filter,color] duration-200 ${
                  isActive
                    ? "drop-shadow-[0_0_7px_rgba(125,211,252,0.95)]"
                    : "group-hover:drop-shadow-[0_0_5px_rgba(125,211,252,0.35)]"
                }`}
              />

              {/* Nome da página abaixo do ícone. */}
              <span
                className={`relative z-10 text-[8px] leading-tight whitespace-nowrap sm:text-[10px] ${
                  isActive ? "font-semibold" : "font-medium"
                }`}
              >
                {item.label}
              </span>

              {/* Traço neon animado que acompanha a rota ativa. */}
              {isActive && (
                <motion.span
                  layoutId="navIndicator"
                  aria-hidden="true"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="bg-primary absolute bottom-0.5 left-1/2 z-10 h-[3px] w-5 -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(125,211,252,0.95),0_0_16px_rgba(125,211,252,0.55)]"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
