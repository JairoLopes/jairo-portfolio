"use client";

/**
 * @Responsabilidade: Prover componente de carrossel interativo de alto desempenho baseado em Embla Carousel React, suportando gestos touch, botões acessíveis e indicadores de paginação (dots).
 * @Fluxo: Inicializa hook useEmblaCarousel com alinhamento start -> Registra listeners externos de eventos (select, reInit) -> Sincroniza estado de navegação de forma assíncrona -> Renderiza viewport deslizante com classes nativas do Tailwind.
 * @Entradas: items (React.ReactNode[] representando os slides/cards), title e subtitle opcionais.
 * @Saídas: Interface de carrossel fluida com suporte a drag em dispositivos móveis, navegação por teclado/botões e feedback de índice ativo.
 * @Dependencias: react (useEffect, useState), embla-carousel-react (useEmblaCarousel), react-icons/ri.
 * @Regras_de_negocio: Botões de avanço e recuo devem respeitar área mínima de 44px (h-11 w-11); proibido o uso de valores arbitrários em colchetes; eliminação de renderizações em cascata no useEffect; touch-pan-y para preservar o scroll vertical nativo.
 * @Limitacoes: Executa no cliente ("use client") para cálculo de dimensões da viewport e captura de eventos de arrasto/toque.
 * @Edge_cases: Carrossel com item único desativa controles de navegação; desmontagem limpa todos os listeners e timers pendentes.
 * @Arquivos_relacionados: src/app/projects/page.tsx, src/app/globals.css.
 */

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface ProjectCarouselProps {
  readonly items: readonly React.ReactNode[];
  readonly title?: string;
  readonly subtitle?: string;
}

export default function ProjectCarousel({
  items,
  title,
  subtitle,
}: ProjectCarouselProps) {
  // Inicialização do Embla com física suave e rolagem alinhada ao início
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<readonly number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Ações de navegação do carrossel
  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  // Sincronização de estado sem disparar cascading renders síncronos no corpo do effect
  useEffect(() => {
    if (!emblaApi) return;

    const syncEmblaState = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    // Inscrição aos eventos da API do Embla
    emblaApi.on("select", syncEmblaState);
    emblaApi.on("reInit", syncEmblaState);

    // Inicialização assíncrona deferida (evita setState síncrono durante a renderização do effect)
    const timeoutId = setTimeout(syncEmblaState, 0);

    return () => {
      clearTimeout(timeoutId);
      emblaApi.off("select", syncEmblaState);
      emblaApi.off("reInit", syncEmblaState);
    };
  }, [emblaApi]);

  const hasMultipleItems = items.length > 1;

  return (
    <div className="w-full">
      {/* Header com Título e Botões de Controle (Prev / Next com touch target h-11 w-11 = 44px) */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          {title && (
            <h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-foreground-muted mt-1 text-xs sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        {/* Botões de Ação com Escala Nativa do Tailwind (h-11 w-11 = 44px) */}
        {hasMultipleItems && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Slide anterior"
              className="glass-panel text-foreground-muted hover:text-primary hover:border-border-glow flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <RiArrowLeftSLine className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Próximo slide"
              className="glass-panel text-foreground-muted hover:text-primary hover:border-border-glow flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <RiArrowRightSLine className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Viewport do Embla Carousel (touch-pan-y para não travar scroll vertical) */}
      <div
        ref={emblaRef}
        className="no-scrollbar cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <div className="flex touch-pan-y gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              className="min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores de Paginação (Dots com área de toque acessível h-11 w-6) */}
      {hasMultipleItems && scrollSnaps.length > 1 && (
        <div
          role="tablist"
          aria-label="Controle de slides"
          className="mt-8 flex items-center justify-center gap-2"
        >
          {scrollSnaps.map((_, index) => {
            const isCurrent = index === selectedIndex;
            return (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Ir para o slide ${index + 1}`}
                onClick={() => scrollTo(index)}
                className="relative flex h-11 w-6 items-center justify-center transition-all duration-300 focus:outline-none"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isCurrent
                      ? "from-primary to-accent-magenta shadow-primary/50 h-2 w-7 bg-linear-to-r shadow-md"
                      : "h-2 w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
