<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfólio pessoal — Jairo Lopes

Este arquivo é o guia permanente para pessoas e agentes de IA que trabalharem neste repositório.
Leia-o antes de alterar código e preserve as decisões arquiteturais descritas aqui.

## 1. O que é o projeto

Portfólio pessoal de desenvolvedor, escrito em português do Brasil, feito com Next.js (App Router).
O site apresenta:

- perfil profissional e stack principal;
- serviços oferecidos;
- histórico de carreira;
- habilidades, tecnologias e formação acadêmica;
- projetos publicados, com links para preview e repositório;
- links de contato (WhatsApp, GitHub e LinkedIn).

Rotas existentes:

| Rota | Conteúdo |
|---|---|
| `/` | Apresentação, foto, stack em destaque e links de contato |
| `/job` | Serviços e soluções oferecidos |
| `/history` | Linha do tempo profissional |
| `/skills` | Abas de habilidades e formação acadêmica |
| `/projects` | Catálogo de projetos |

Todo o conteúdo é estático e está definido em constantes no próprio arquivo da página.
Não existem banco de dados, API, autenticação, CMS, formulários ou dados por requisição.

## 2. Stack tecnológica

Versões conforme o `package.json`. Não presuma que uma dependência instalada está em uso.

| Tecnologia | Versão | Uso no projeto |
|---|---|---|
| Next.js | 16.3.4 | App Router, SSG, Metadata API |
| React / React DOM | 19.2.8 | Server e Client Components |
| TypeScript | ^5 | Tipagem estrita |
| Tailwind CSS | ^4 | Estilos utilitários, configurado via CSS (`@theme`) |
| Motion | ^13.2.0 | Animações de entrada, transições e indicador da navegação |
| GSAP | ^3.15.1 | Animação da fase do shader do background |
| Three.js | ^0.187.0 | Canvas WebGL do background |
| Base UI | ^1.8.0 | Primitivas de UI (Button, Tabs, Avatar, ScrollArea, Separator, Badge) |
| React Icons | ^5.7.0 | Ícones (Remix, Simple Icons, Feather e Tabler) |
| class-variance-authority | ^0.7.1 | Variantes de estilo dos componentes de UI |
| `cn` | ^0.4.0 | Junção/merge de classes Tailwind |
| shadcn | ^4.21.0 | Importa `shadcn/tailwind.css` em `globals.css` |
| tw-animate-css | ^1.4.0 | Animações utilitárias importadas em `globals.css` |
| ESLint | ^9 | Lint com `eslint-config-next` 16.3.4 |
| Prettier | ^3.9.6 | Formatação, com `prettier-plugin-tailwindcss` |
| PostCSS | via `@tailwindcss/postcss` | Processamento do Tailwind |

Observações:

- O `components.json` declara `"iconLibrary": "lucide"`. Se algum componente futuro do shadcn precisar de ícones, o `lucide-react` deverá ser instalado novamente.

## 3. Estrutura do projeto

```text
src/
├── app/
│   ├── layout.tsx              # Root Layout (Server Component)
│   ├── template.tsx            # Transições entre rotas (Client Component)
│   ├── globals.css             # Tema, tokens e utilitários globais
│   ├── page.tsx                # /
│   ├── job/page.tsx            # /job
│   ├── history/page.tsx        # /history
│   ├── skills/page.tsx         # /skills
│   └── projects/
│       ├── page.tsx            # /projects
│       └── CardProject.tsx     # Card de projeto (Server Component)
│
├── components/
│   ├── animatedComponents/     # Títulos, subtítulos e variants do Motion
│   ├── background/             # Background WebGL (Three.js + GSAP)
│   ├── navigation/             # Dock de navegação inferior
│   └── ui/                     # Wrappers de UI no estilo shadcn/base-nova
│
└── lib/
    └── utils.ts                # Reexporta `cn` do pacote "cn"
```

`public/` guarda a foto de perfil e ícones estáticos.

Detalhes importantes:

- `CardProject.tsx` fica junto da rota porque é específico de `/projects`.
- Os dados estáticos (`CORE_STACK`, `PROJECTS_MOCK`, `CAREER_HISTORY`, `SERVICES_OFFERED`, etc.) ficam no arquivo da própria página. Não os mova para o cliente nem crie uma pasta `data` sem necessidade real.
- Os wrappers de `ui/` seguem o estilo `base-nova` do shadcn e importam `cn` diretamente do pacote `"cn"`, exceto `skills/page.tsx`, que usa o reexport de `@/lib/utils`.

## 4. Arquitetura de renderização

### Server Components por padrão

Layouts e páginas são Server Components. Regras:

- não adicione `"use client"` em `src/app/layout.tsx`;
- não adicione `"use client"` em páginas;
- mantenha textos, listas e dados estáticos no servidor;
- use Client Components apenas para estado, eventos, hooks de cliente ou APIs do navegador.

### SSG (Static Site Generation)

As cinco páginas são pré-renderizadas no build. O resultado esperado de `npm run build` é:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /history
├ ○ /job
├ ○ /projects
└ ○ /skills

○  (Static)  prerendered as static content
```

Cada página exporta:

```tsx
// Garante no build que esta rota continue estática.
// Se alguma API de requisição for adicionada no futuro, o build falhará.
export const dynamic = "error";
```

Isso é uma trava de segurança: `dynamic = "error"` faz o build falhar se alguém introduzir `cookies()`, `headers()`, `searchParams` ou dados não cacheados na rota. Não remova essa linha sem entender o motivo.

> Observação de versão: `dynamic` pertence ao modelo de cache anterior ao Cache Components. Se `cacheComponents` for habilitado no futuro, essa opção deixa de valer e a estratégia precisa ser revista na documentação local do Next.js.

### SSG não é Static Export

O projeto usa a pré-renderização normal do Next.js. Não configure `output: "export"` nem transforme a aplicação em HTML estático limitado.

### Client Islands

As ilhas de cliente são pequenas e isoladas. O conteúdo renderizado no servidor é passado como `children` para elas — por exemplo, os cards dentro de `Tabs` e as tags dentro de `ScrollArea`. Não transforme a página inteira em Client Component por causa de uma interação.

`template.tsx` é Client Component, mas recebe `children` do servidor. Isso não torna as páginas clientes.

## 5. Client Components existentes

| Componente | Responsabilidade | Por que precisa do cliente |
|---|---|---|
| `app/template.tsx` | Transição direcional entre rotas | `usePathname`, `useState`, `useEffect` e Motion |
| `background/CodeFlowBg.tsx` | Background WebGL com código em scroll | Three.js, GSAP, canvas, `window`, `document`, `ResizeObserver` |
| `navigation/BottomSheetNav.tsx` | Dock de navegação e rota ativa | `usePathname` e indicador animado com `layoutId` |
| `animatedComponents/TitleAnimated.tsx` | Animação de entrada do título | `whileInView` / IntersectionObserver |
| `animatedComponents/SubTitleAnimated.tsx` | Animação de entrada do subtítulo | `whileInView` / IntersectionObserver |
| `ui/avatar.tsx` | Avatar com fallback | Estado de carregamento da imagem no Base UI |
| `ui/tabs.tsx` | Abas de habilidades | Estado, teclado e ARIA |
| `ui/scroll-area.tsx` | Scroll horizontal das tecnologias | Medição de overflow, thumb e scrollbar |
| `ui/separator.tsx` | Linha divisória | Client Component por decisão do projeto; o HTML é apenas um `div` estático |
| `ui/button.tsx` | Botões e links estilizados | O wrapper não tem diretiva, mas a primitiva `@base-ui/react/button` é cliente |

Componentes que **não** são clientes:

- `Card`, `Badge` e as páginas são renderizados no servidor.
- `Badge` usa `useRender` do Base UI, mas a biblioteca pula os hooks quando `document` não existe; por isso funciona em Server Components.
- `CardProject` é Server Component; `ScrollArea` e `Button` dentro dele continuam ilhas de cliente.

### CodeFlowBg

Não altere a aparência, os shaders, as cores ou a velocidade. O componente já possui:

- `import()` dinâmico de `three` e `gsap`;
- pausa quando a aba está oculta (`visibilitychange`);
- respeito a `prefers-reduced-motion` com frame estático;
- limites de `devicePixelRatio` e FPS por perfil (mobile/desktop);
- limpeza de animação, contexto GSAP, observers, listeners, textura, geometria, material e renderer.

## 6. Regras para futuras implementações

1. Novas páginas devem ser Server Components por padrão.
2. Dados estáticos devem permanecer no servidor.
3. Use `"use client"` apenas com um motivo concreto.
4. Mantenha interações isoladas em componentes pequenos.
5. Nunca adicione `"use client"` ao Root Layout.
6. Evite APIs de requisição sem necessidade real.
7. Preserve a possibilidade de SSG e a trava `dynamic = "error"`.
8. Não habilite cache ou renderização dinâmica sem entender os efeitos.
9. Preserve integralmente textos, imagens, links, cores, gradientes, espaçamentos, animações, responsividade e identidade visual.
10. Não aproveite uma refatoração para fazer melhorias estéticas.
11. Consulte `node_modules/next/dist/docs/` antes de usar APIs do Next.js.
12. Não adicione dependências sem necessidade comprovada.
13. Não remova animações nem troque bibliotecas para “reduzir bundle” sem medir e sem autorização.
14. Se precisar adicionar metadata por rota no futuro, use apenas informações que já existem no conteúdo do site.
15. Mantenha o bloco `nextjs-agent-rules` no topo deste arquivo; ele é gerenciado pelo `next dev`.

## 7. Padrão obrigatório de código

- Comentários em português do Brasil, explicando **por que** algo existe e como funciona quando não é óbvio.
- Componentes pequenos e com responsabilidade clara.
- Tipagem explícita em props e parâmetros importantes.
- `readonly` quando o dado não deve ser alterado.
- Proibido `any`, `@ts-ignore` e tipagem frouxa.
- Evite abstrações, hooks personalizados e dependências desnecessárias.
- Evite ternários aninhados e lógica compactada demais.
- Atualize comentários que ficarem desatualizados por uma mudança arquitetural.
- Prefira código legível e fácil de estudar a micro-otimizações.

## 8. Validação

Antes de concluir qualquer alteração, execute:

```bash
npm run build
npm run lint
npx tsc --noEmit
```

Resultados esperados:

- build sem erros e com as cinco rotas marcadas como `○ (Static)`;
- ESLint sem erros e sem avisos;
- TypeScript sem erros.

O projeto não possui script de formatação no `package.json`. O Prettier está configurado apenas via `.prettierrc`, com o plugin do Tailwind.

## 9. Observações conhecidas

- `README.md` pode estar desatualizado em relação à estrutura atual.
- `.directory` não faz parte do código da aplicação.
- Não remova esses itens sem autorização explícita.
