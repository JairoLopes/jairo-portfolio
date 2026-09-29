"use client";

/**
 * @Responsabilidade: Orquestrar transições direcionais animadas (slide horizontal suave) entre rotas durante a navegação no Next.js App Router.
 * @Fluxo: Captura pathname atual -> Calcula delta vetorial comparando índice atual com índice anterior -> Define direção no eixo X -> Renderiza container animado com Motion sem provocar 'blink' visual.
 * @Entradas: children (React.ReactNode representando a página da rota atual).
 * @Saídas: Container animado (motion.div) com entrada direcional fluida.
 * @Dependencias: react (useEffect, useState), next/navigation (usePathname), motion/react (motion).
 */

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

// Mapeamento linear de pesos de rota para computação vetorial
const ROUTE_INDEX_MAP: Record<string, number> = {
  "/": 0,
  "/job": 1,
  "/skills": 1,
  "/projects": 2,
  "/history": 3,
};

// Registrador do índice da rota anterior no ciclo de navegação SPA
let globalLastRouteIndex = 0;

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const currentRouteIndex = ROUTE_INDEX_MAP[pathname] ?? 0;

  // Lógica Matemática de Direção:
  // Se currentRouteIndex >= globalLastRouteIndex, o usuário está avançando (direção +1: entra da direita).
  // Se currentRouteIndex < globalLastRouteIndex, o usuário está retrocedendo (direção -1: entra da esquerda).
  const [slideDirection] = useState<number>(() => {
    const delta = currentRouteIndex - globalLastRouteIndex;
    return delta >= 0 ? 1 : -1;
  });

  // Atualiza o índice global após o registro da transição
  useEffect(() => {
    globalLastRouteIndex = currentRouteIndex;
  }, [currentRouteIndex]);

  return (
    <motion.div
      initial={{
        opacity: 0.9,
        x: slideDirection * 28,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
