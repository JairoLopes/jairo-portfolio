# Portfólio

Portfólio pessoal desenvolvido com **Next.js**, **TypeScript** e **Tailwind CSS**, com foco em apresentar projetos, habilidades e experiência profissional através de uma interface moderna, responsiva e interativa.

## ✨ Sobre o projeto

Este projeto foi desenvolvido para funcionar como um portfólio profissional e também como um projeto de estudo e demonstração de boas práticas com o ecossistema React/Next.js.

A aplicação utiliza uma abordagem **Mobile First**, componentes reutilizáveis, animações e uma interface visual baseada em **Glassmorphism**, criando uma experiência moderna sem comprometer a responsividade.

Entre os principais elementos estão:

* Apresentação profissional
* Seção de habilidades e tecnologias
* Catálogo de projetos
* Links para repositórios e aplicações publicadas
* Animações e transições de interface
* Layout responsivo para diferentes tamanhos de tela
* Componentes reutilizáveis
* Navegação utilizando o App Router do Next.js

## 🚀 Tecnologias

### Core

* **Next.js 16**
* **React 19**
* **TypeScript 5**
* **Tailwind CSS 4**

### Interface e animações

* **Motion**
* **React Icons**
* Glassmorphism
* CSS animations e transitions
* Design responsivo e Mobile First

### Componentes

* Componentes React reutilizáveis
* Componentes Client e Server
* Componentes de interface animados
* Cards interativos
* Componentes de navegação
* Componentes para apresentação de projetos

### Ferramentas

* ESLint
* Prettier
* Prettier Plugin Tailwind CSS
* PostCSS

## 📂 Estrutura do projeto

O projeto utiliza o **App Router** do Next.js e mantém o código da aplicação dentro de `src`.

```text
.
├── public/
│   └── arquivos estáticos
│
├── src/
│   ├── app/
│   │   ├── history/
│   │   ├── projects/
│   │   ├── ...
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   └── components/
│       ├── animatedComponents/
│       ├── carousel/
│       └── ...
│
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## 🎨 Interface

A interface utiliza uma identidade visual escura, com superfícies translúcidas, bordas sutis, efeitos de glow e elementos de destaque em tons de azul, roxo e magenta.

As principais variáveis visuais são centralizadas no `globals.css`, facilitando a manutenção e a consistência do design.

## 📱 Responsividade

O projeto segue uma abordagem **Mobile First**, adaptando o conteúdo para diferentes tamanhos de tela.

A página de projetos, por exemplo, utiliza um Grid responsivo para organizar os cards:

* **Mobile:** 1 coluna
* **Tablet:** 2 colunas
* **Desktop:** 3 colunas

Os elementos interativos também consideram áreas de toque adequadas para dispositivos móveis.

## 📁 Projetos

A rota `/projects` apresenta um catálogo dos projetos desenvolvidos.

Cada projeto pode apresentar:

* Nome
* Descrição
* Tecnologias utilizadas
* Status
* Link para o código-fonte
* Link para a aplicação publicada
* Informações sobre os principais desafios ou características do projeto

Os projetos são atualmente apresentados a partir de um conjunto estático de dados, mantendo a estrutura preparada para uma futura integração com uma API ou banco de dados.

## ⚙️ Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre no diretório:

```bash
cd <NOME_DO_PROJETO>
```

Instale as dependências:

```bash
npm install
```

## 🧑‍💻 Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

Depois, acesse:

```text
http://localhost:3000
```

A aplicação utiliza o hot reload do Next.js, permitindo visualizar automaticamente as alterações realizadas durante o desenvolvimento.

## 📦 Build

Para gerar uma versão de produção:

```bash
npm run build
```

Depois, execute a aplicação:

```bash
npm start
```

## 🔎 Lint

Para verificar problemas de código:

```bash
npm run lint
```

## 🧹 Formatação

O projeto utiliza **Prettier** em conjunto com `prettier-plugin-tailwindcss` para manter a formatação do código e a ordenação das classes do Tailwind CSS.

## 🌐 Deploy

O projeto pode ser publicado utilizando plataformas compatíveis com aplicações Next.js, como a **Vercel**.

Após configurar o repositório, o deploy pode ser automatizado através da integração com Git.

## 📌 Status

**Em desenvolvimento.**

O projeto continua recebendo melhorias de interface, componentes, animações, responsividade e organização do código.

## 📄 Licença

Este projeto é um portfólio pessoal. O código pode ser utilizado como referência para fins de estudo, mas os conteúdos, textos, imagens e projetos apresentados pertencem aos seus respectivos autores.

---

Desenvolvido com **Next.js + TypeScript + Tailwind CSS**.
