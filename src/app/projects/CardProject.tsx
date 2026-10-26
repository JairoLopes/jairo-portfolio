"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import {
  RiExternalLinkLine,
  RiGithubFill,
  RiLockLine,
  RiFolderLine,
  RiSparklingLine,
  RiTimeLine,
} from "react-icons/ri";

// ============================================================
// TIPAGEM DOS PROJETOS
// ============================================================

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly tags: readonly string[];

  /** URLs opcionais para projetos ainda não publicados. */
  readonly liveUrl?: string;
  readonly githubUrl?: string;

  /** Define se o projeto recebe o destaque visual. */
  readonly isFeatured?: boolean;

  /** Controla o estado do desenvolvimento e o acesso ao código. */
  readonly isCompleted: boolean;
  readonly isOpenSource: boolean;
}

interface CardProjectProps {
  readonly project: Project;
  readonly index: number;
}

// ============================================================
// COMPONENTE
// ============================================================

export default function CardProject({ project, index }: CardProjectProps) {
  const displayIndex = String(index + 1).padStart(2, "0");
  const isInDevelopment = !project.isCompleted;
  const isFeatured = project.isFeatured === true;

  return (
    <article aria-label={`Projeto: ${project.title}`} className="h-full w-full">
      <Card
        className={`glass-panel group relative flex h-full min-h-100 flex-col gap-0 overflow-hidden rounded-2xl border p-0 ring-0 transition-all duration-300 hover:-translate-y-1 ${
          isFeatured
            ? "border-accent-magenta/40 ring-accent-magenta/20 hover:border-accent-magenta/70 shadow-[0_0_28px_rgba(217,70,239,0.12)] ring-1 hover:shadow-[0_0_34px_rgba(217,70,239,0.2)]"
            : isInDevelopment
              ? "border-amber-400/30 hover:border-amber-300/60 hover:shadow-[0_0_25px_rgba(251,191,36,0.14)]"
              : "hover:border-border-glow border-white/5 hover:shadow-[0_0_25px_rgba(56,189,248,0.15)]"
        }`}
      >
        {/* Brilho de fundo do projeto em destaque. */}
        {isFeatured && (
          <div
            aria-hidden="true"
            className="from-accent-magenta/10 pointer-events-none absolute inset-0 z-0 bg-linear-to-b via-transparent to-transparent"
          />
        )}

        {/* Linha superior colorida conforme o estado do projeto. */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 z-20 h-px ${
            isFeatured
              ? "via-accent-magenta/80 bg-linear-to-r from-transparent to-transparent"
              : isInDevelopment
                ? "bg-linear-to-r from-transparent via-amber-400/70 to-transparent"
                : "via-primary/40 bg-linear-to-r from-transparent to-transparent"
          }`}
        />

        {/* Cantos decorativos. */}
        <span
          aria-hidden="true"
          className={`absolute top-3 left-3 z-20 h-3 w-3 border-t border-l transition-colors ${
            isFeatured
              ? "border-accent-magenta/60"
              : "border-primary/40 group-hover:border-primary"
          }`}
        />
        <span
          aria-hidden="true"
          className={`absolute right-3 bottom-3 z-20 h-3 w-3 border-r border-b transition-colors ${
            isFeatured
              ? "border-accent-magenta/60"
              : "border-primary/40 group-hover:border-primary"
          }`}
        />

        {/* ================================================== */}
        {/* FAIXA VISUAL                                      */}
        {/* ================================================== */}

        <div className="relative z-10 flex h-24 shrink-0 items-center justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className={`absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full blur-3xl ${
              isFeatured ? "bg-accent-magenta/20" : "bg-primary/15"
            }`}
          />

          <span
            aria-hidden="true"
            className="text-foreground-subtle/30 group-hover:text-primary/40 absolute top-2 left-8 font-mono text-[10px] tracking-widest transition-colors"
          >
            {displayIndex}
          </span>

          {/* Badge avisando que está em desenvolvimento */}
          {isInDevelopment && (
            <Badge
              variant="outline"
              className="absolute top-2 right-2 z-20 gap-1 rounded-full border-amber-400/30 bg-amber-400/10 px-2 py-0 text-[9px] font-semibold tracking-wide text-amber-300"
            >
              <RiTimeLine className="h-2.5 w-2.5" />
              EM DESENVOLVIMENTO
            </Badge>
          )}

          <div
            className={`glass-panel relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
              isFeatured
                ? "border-accent-magenta/40 bg-accent-magenta/10 shadow-[0_0_20px_rgba(217,70,239,0.12)]"
                : "border-border group-hover:border-primary/40"
            }`}
          >
            <RiFolderLine
              className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${
                isFeatured ? "text-accent-magenta" : "text-primary"
              }`}
            />
          </div>

          <span
            aria-hidden="true"
            className="absolute bottom-2 left-3 flex h-2.5 w-2.5"
          >
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                isInDevelopment ? "bg-amber-400" : "bg-emerald-400"
              }`}
            />
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                isInDevelopment ? "bg-amber-500" : "bg-emerald-500"
              }`}
            />
          </span>
        </div>

        {/* ================================================== */}
        {/* CONTEÚDO                                          */}
        {/* ================================================== */}
        <div className="relative z-10 flex flex-1 flex-col justify-between gap-3 px-5 pt-4 pb-5">
          <CardHeader className="gap-2.5 p-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/10 text-primary rounded-full px-2 py-0 text-[10px] font-medium tracking-wide"
              >
                {project.category}
              </Badge>

              {isFeatured && (
                <Badge className="border-accent-magenta/30 bg-accent-magenta/15 text-accent-magenta gap-1 rounded-full border px-2 py-0 text-[10px] font-semibold tracking-wider">
                  <RiSparklingLine className="h-2.5 w-2.5" />
                  DESTAQUE
                </Badge>
              )}
            </div>

            <CardTitle className="flex items-baseline gap-1.5 text-base font-semibold tracking-tight">
              <span className="text-foreground-subtle font-mono text-xs font-normal">
                ~/
              </span>
              <span className="text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </span>
            </CardTitle>

            {/* Descrição completa, sem clamp e sem botão de expansão. */}
            <p className="text-foreground-muted text-xs leading-relaxed">
              {project.description}
            </p>
          </CardHeader>

          {/* ================================================= */}
          {/* TECNOLOGIAS — SCROLL HORIZONTAL (shadcn ScrollArea) */}
          {/* ================================================= */}
          <div className="flex flex-col gap-3">
            <span className="from-primary via-primary-glow to-accent-purple bg-linear-to-r bg-clip-text font-mono text-[10px] font-semibold tracking-wider text-transparent uppercase">
              Tecnologias usadas
            </span>
            <CardContent className="min-w-0 p-0">
              {/*
              O ScrollArea cuida do overflow e da scrollbar de forma
              cross-browser. Uma única lista de tags é renderizada —
              sem duplicatas, sem animação e sem loop.
            */}
              <ScrollArea
                className="w-full whitespace-nowrap"
                aria-label={`Tecnologias utilizadas em ${project.title}`}
              >
                {/* pb-2 reserva espaço para a scrollbar horizontal. */}
                <div className="flex gap-1 pb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-accent-purple hover:text-foreground hover:border-primary/40 inline-flex shrink-0 items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] whitespace-nowrap transition-colors duration-150"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>

            <Separator className="bg-white/5" />
          </div>

          <CardFooter className="gap-2 border-0 bg-transparent p-0">
            {project.liveUrl ? (
              <Button
                size="lg"
                className="from-primary to-primary-glow text-primary-foreground hover:shadow-primary/40 h-11 min-w-0 flex-1 gap-1.5 rounded-xl bg-linear-to-r px-3 text-xs font-semibold shadow-md transition-all duration-200"
                nativeButton={false}
                render={
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <span>Preview</span>
                <RiExternalLinkLine className="h-3.5 w-3.5" />
              </Button>
            ) : (
              <Button
                size="lg"
                disabled
                className="from-primary to-primary-glow text-primary-foreground h-11 min-w-0 flex-1 gap-1.5 rounded-xl bg-linear-to-r px-3 text-xs font-semibold shadow-md"
              >
                <span>Preview em breve</span>
                <RiTimeLine className="h-3.5 w-3.5" />
              </Button>
            )}

            {!project.isOpenSource ? (
              <div
                role="status"
                aria-label="Código-fonte privado"
                title="Código-fonte privado"
                className="text-foreground-muted flex h-11 min-w-0 flex-1 cursor-default items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-medium"
              >
                <RiLockLine className="h-4 w-4 shrink-0" />
                <span>Código fechado</span>
              </div>
            ) : project.githubUrl ? (
              <Button
                variant="outline"
                size="lg"
                className="text-foreground-muted hover:text-foreground hover:border-border-glow h-11 min-w-0 flex-1 gap-1.5 rounded-xl border-white/10 bg-white/5 px-3 text-xs font-medium transition-all duration-200"
                nativeButton={false}
                render={
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <RiGithubFill className="h-4 w-4" />
                <span>Código</span>
              </Button>
            ) : null}
          </CardFooter>
        </div>
      </Card>
    </article>
  );
}
