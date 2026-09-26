import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BottomSheetNav from "@/components/navigation/BottomSheetNav";
import "./globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#08090d",
  colorScheme: "dark",
};

/**
 * @Responsabilidade: Prover a casca estrutural global da aplicação (Root Layout), carregando fontes tipográficas, estilização base, camadas de iluminação de fundo e a barra de navegação persistente.
 * @Fluxo: Injeta variáveis de fonte no elemento html -> Renderiza luzes ambientais de fundo -> Provê área central para páginas filhas -> Renderiza navegação global BottomSheetNav.
 * @Entradas: children (React.ReactNode contendo o template e a página da rota atual).
 * @Saídas: Estrutura HTML/Body completa com Server Component First, sem remontagem do menu ao navegar.
 * @Dependencias: next/font/google (Geist, Geist_Mono), BottomSheetNav (@/components/navigation/BottomSheetNav), globals.css.
 * @Regras_de_negocio: O layout é estritamente um Server Component; a navegação deve persistir sem re-renderizações desnecessárias e o conteúdo principal deve possuir espaçamento inferior para não ser coberto pelo dock.
 * @Limitacoes: Não manipula estados locais diretamente (responsabilidade delegada aos Client Components isolados).
 * @Edge_cases: Telas de alta densidade de pixels ou ultrawide são limitadas com max-w e centralização para preservar a ergonomia visual.
 * @Arquivos_relacionados: src/components/navigation/BottomSheetNav.tsx, src/app/template.tsx, src/app/globals.css.
 */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jairo | Desenvolvedor Next.js",
  description:
    "Portfólio de desenvolvimento de software moderno focado em alta performance, Next.js, React, TypeScript, Tailwind CSS e arquitetura SaaS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="bg-background text-foreground selection:bg-primary/25 selection:text-primary relative flex min-h-full flex-col overflow-x-hidden font-sans">
        {/* ─────────────────────────────────────────────────────────
      Véu cósmico — gradiente radial fixo atrás de tudo.
      Substitui o background-image que antes vivia no html
      com background-attachment: fixed (que repintava a cada
      frame de scroll). Fixo por viewport + z-index negativo
      = camada isolada, zero repaint durante a rolagem.
      ───────────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_100%_80%_at_50%_30%,#1e0b4a_0%,#0d0326_50%,#03000a_100%)]"
        />

        {/* Camada de Iluminação Ambiente (Glow Effects sutis em background) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          {/* Luz superior ciano / azul */}
          <div className="bg-primary/10 absolute -top-40 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full blur-[130px] sm:h-150 sm:w-150" />
          {/* Luz secundária magenta sutil no rodapé */}
          <div className="bg-accent-magenta/10 absolute right-10 -bottom-40 h-100 w-100 rounded-full blur-[140px]" />
        </div>

        {/* Container Principal com espaçamento inferior de compensação do Bottom Sheet */}
        <main className="relative z-10 flex flex-1 flex-col pb-24 md:pb-28">
          {children}
        </main>

        {/* Barra de Navegação Persistente */}
        <BottomSheetNav />
      </body>
    </html>
  );
}
