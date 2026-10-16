# JXO — Front-end de apresentação

Projeto em **Next.js + React + TypeScript**, preparado para demonstração na Vercel. Não depende de backend, banco de dados ou variáveis de ambiente.

## Executar no computador

Use Node.js 22 ou superior. Dentro da pasta que contém `package.json`:

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

Para testar a versão de produção:

```bash
npm run build
npm start
```

## Subir no GitHub e na Vercel

1. Extraia o ZIP. A pasta `jxo-frontend` contém o projeto.
2. Crie um repositório no GitHub e envie **o conteúdo dessa pasta**, incluindo `package.json`, `package-lock.json`, `app`, `components`, `lib` e `public`.
3. Não envie `node_modules`, `.next` ou arquivos `.env`. O `.gitignore` já os exclui.
4. Importe o repositório na Vercel com o framework **Next.js**.
5. Se você enviou a pasta inteira em vez de seu conteúdo, selecione `jxo-frontend` como Root Directory. Caso contrário, use a raiz do repositório.
6. Utilize `npm run build` como comando de build e mantenha a saída padrão do Next.js. Não configure `dist`.
7. Nenhuma variável de ambiente é necessária nesta versão.
8. Depois do deploy, compartilhe o endereço gerado com a JXO.

Este pacote não foi publicado automaticamente nem enviado a um repositório.

## Páginas e funcionalidades

| Caminho | Conteúdo |
| --- | --- |
| `/` | Home, categorias, indicadores e apresentação institucional |
| `/produtos` | Catálogo com busca, filtros por categoria e ordenação |
| `/produtos/jxo-cafe-3000` | Galeria, abas, ficha demonstrativa e materiais |
| `/produtos/[slug]` | Páginas individuais dos equipamentos |
| `/tecnologia` | Diferenciais, visão artificial e atalhos para o portal |
| `/aplicacoes` | Aplicações por cultura |
| `/institucional` | Apresentação institucional |
| `/noticias` | Notícias e eventos com filtros |
| `/noticias/[slug]` | Conteúdo individual das notícias |
| `/contato` | Canais de contato e formulário demonstrativo |
| `/acesso` | Entrada de demonstração para cliente ou colaborador |
| `/colaborador` | Painel, arquivos recentes, atalhos e histórico local |
| `/colaborador/documentos` | Busca, categorias e downloads de exemplo |
| `/colaborador/arquivos` | Materiais dos equipamentos |
| `/colaborador/orcamento` | Solicitação de orçamento |
| `/colaborador/viagem` | Registro de viagem com validação de datas |
| `/colaborador/venda` | Relatório de visita comercial |
| `/colaborador/pos-venda` | Relatório de atendimento pós-venda |
| `/atendimento` | Chat simulado e interface de áudio/videochamada |

## Roteiro para apresentar ao cliente

1. Abra a home e navegue para o catálogo.
2. Busque por **café** e abra **JXO Café 3000**.
3. Explore as fotos e as abas. Clique em **Solicitar orçamento**: o produto aparece preenchido na mensagem de contato.
4. Entre em **Área do Cliente**, escolha **Colaborador** e informe um nome fictício.
5. Abra um formulário, preencha e salve. Volte ao portal para consultar o registro e exportar seu JSON.
6. Abra a área de documentos e baixe um exemplo.
7. Em **Fale com a JXO**, envie uma mensagem e experimente a interface simulada de chamada.
8. Redimensione a janela ou acesse no celular para avaliar a versão responsiva.

## O que é real e o que é demonstrativo

- Navegação, filtros, busca, ordenação, abas, modais, validação de formulários e downloads de exemplos são implementados no front-end.
- Formulários são salvos em `localStorage`, sob a chave `jxo-records`. Permanecem somente no navegador utilizado, até a limpeza dos dados do site.
- O nome do visitante é mantido em `sessionStorage`, sob a chave `jxo-demo-name`.
- Chat utiliza respostas automáticas locais. Não há atendentes conectados.
- Áudio e vídeo apresentam a interface; não acessam câmera ou microfone e não conectam participantes.
- A entrada no portal é uma demonstração, sem senha ou proteção real. Não coloque documentos internos reais no diretório `public`.
- Downloads geram arquivos `.txt` identificados como exemplos; não são manuais, planilhas ou desenhos técnicos oficiais.
- O modal institucional aguarda o vídeo oficial. Nenhum vídeo foi fornecido.
- O catálogo lista os equipamentos implementados e calcula os contadores reais; não reproduz contagens fictícias de itens ausentes na referência.
- Contatos, indicadores, especificações e notícias foram transcritos das imagens e precisam de validação antes de uso comercial definitivo. As próprias referências possuem divergências de endereço e telefone.
- O conteúdo institucional adicional é uma sugestão editorial, a ser aprovado pela JXO.
- Indexação por buscadores está desabilitada nos metadados enquanto o site for uma demonstração.

## Estrutura e manutenção

- `app/`: rotas do App Router e estilos responsivos.
- `components/ui.tsx`: cabeçalho, rodapé, banners, ícones, modal e componentes compartilhados.
- `components/marketing.tsx`: páginas institucionais, produtos e notícias.
- `components/forms.tsx`: contato, acesso, portal e formulários.
- `components/support.tsx`: experiência de atendimento demonstrativo.
- `lib/data.ts`: catálogo, notícias, módulos e documentos de exemplo.
- `public/images/`: as oito referências fornecidas.

As imagens dos equipamentos e os fundos são janelas visuais das referências, posicionadas pelo componente `Crop` com CSS. Os títulos, textos, menus, cards e formulários são componentes HTML reais. Como as fotografias originais isoladas não foram fornecidas, sua resolução é limitada aos recortes dos mockups. Substitua por fotos oficiais em alta resolução antes da versão final. A reconstrução preserva a direção visual, com adaptações para responsividade, mas não constitui cópia pixel a pixel.

Cores principais em `app/globals.css`: verde profundo `#001e17`, verde `#002f23`, dourado `#ffda65`, fundo claro `#f6f8f6`.

## Próxima etapa: integração

Substituir a persistência local por API, adicionar autenticação e autorização no servidor, cadastrar arquivos reais com acesso controlado, conectar contatos e orçamentos ao fluxo comercial e integrar chat/chamadas a um serviço de comunicação. Os perfis e conteúdos devem vir do backend nessa etapa.

## Verificação

- Build de produção com geração das rotas.
- Verificação TypeScript com `npm run typecheck`.
- Conferência dos caminhos internos e das referências locais no artefato compilado.
- A verificação visual e interativa em navegador não foi executada neste ambiente; deve ser feita no preview da Vercel antes da apresentação final.
