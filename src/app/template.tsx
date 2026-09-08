"use client";

/**
 * @Responsabilidade: Orquestrar transições direcionais animadas (slide horizontal nativo) entre rotas durante a navegação no Next.js App Router.
 * @Fluxo: Captura pathname atual -> Calcula delta vetorial comparando índice atual com índice anterior -> Define direção no eixo X -> Renderiza container animado com Motion.
 * @Entradas: children (React.ReactNode representando a página da rota atual).
 * @Saídas: Container animado (motion.div) com entrada direcional fluida e quase instantânea (0.25s).
 * @Dependencias: react (useEffect, useState), next/navigation (usePathname), motion/react (motion).
 * @Regras_de_negocio: Transição rápida (0.2s a 0.3s) com easing easeOut, sem atrasos (delays), respeitando a ordem linear: Início (0) -> Skills (1) -> Projetos (2) -> Histórico (3).
 * @Limitacoes: Executa no lado do cliente ("use client") para cálculo de estado e execução do loop de animação gráfica.
 * @Edge_cases: Rotas não mapeadas assumem índice padrão 0 para evitar cálculo com NaN e preservar animação suave.
 * @Arquivos_relacionados: src/app/layout.tsx, src/components/navigation/BottomSheetNav.tsx.
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

// Variável de módulo persistente na sessão SPA para registrar a rota de origem
let globalLastRouteIndex = 0;

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const currentRouteIndex = ROUTE_INDEX_MAP[pathname] ?? 0;

  // Lógica Matemática de Direção:
  // Se currentRouteIndex >= globalLastRouteIndex, o usuário está avançando na árvore (direção +1: entra da direita).
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
      key={pathname}
      initial={{
        opacity: 0,
        x: slideDirection * 35,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="flex flex-1 flex-col"
    >
      {children}
    </motion.div>
  );
}
