"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Play, Search, Plus, CalendarDays } from "lucide-react";
import { products, news, images, modules } from "@/lib/data";
import {
  Breadcrumb,
  ButtonLink,
  Callout,
  Crop,
  Hero,
  Icon,
  Modal,
  Shell,
  downloadDemo,
} from "./ui";

export function Home() {
  const [video, setVideo] = useState(false);
  return (
    <Shell>
      <Hero
        title="Tecnologia inteligente para"
        highlight="seleção de grãos e sementes"
        description="Inteligência artificial, padrão internacional de qualidade e inovação para um agronegócio mais produtivo e competitivo."
        variant="home"
      >
        <div className="actions">
          <ButtonLink href="/produtos">Conheça nossos produtos</ButtonLink>
          <ButtonLink href="/contato?assunto=Orçamento" outline>
            Peça um orçamento
          </ButtonLink>
        </div>
      </Hero>
      <section className="stats">
        <div className="container">
          {[
            ["award", "+20", "anos de experiência"],
            ["chart", "+1.000", "equipamentos em operação"],
            ["globe", "30 países", "presença internacional"],
            ["leaf", "Tecnologia", "comprovada em campo"],
          ].map(([icon, value, label]) => (
            <div key={icon}>
              <Icon name={icon} size={42} />
              <p>
                <strong>{value}</strong>
                <span>{label}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container section centered">
        <span className="eyebrow green">DO CAMPO AO FUTURO</span>
        <h2>
          Soluções completas para
          <br />
          beneficiamento de grãos e sementes
        </h2>
        <p className="section-description">
          Equipamentos de alta performance que unem tecnologia, robustez e
          inteligência
          <br className="desktop" /> para entregar mais qualidade ao seu produto
          final.
        </p>
        <ButtonLink href="/produtos">Veja todos os produtos</ButtonLink>
        <div className="solution-grid">
          {[
            ["settings", "Selecionadoras Eletrônicas", "Selecionadoras"],
            ["shield", "Limpeza e Classificação", "Limpeza"],
            ["chart", "Transporte e Elevação", "Transporte e Elevação"],
            ["calculator", "Ensacamento e Dosagem", "Ensaque e Dosagem"],
            ["globe", "Soluções completas", "Todos"],
          ].map(([icon, label, category]) => (
            <Link
              href={`/produtos?categoria=${encodeURIComponent(category)}`}
              className="solution-card"
              key={label}
            >
              <Icon name={icon} size={54} />
              <h3>{label}</h3>
              <span className="circle-arrow">
                <ArrowRight size={20} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="video-banner">
        <div className="video-photo">
          <Crop
            src={images.home}
            source={[914, 1600]}
            rect={[0, 1150, 405, 246]}
            alt="Grãos selecionados"
          />
        </div>
        <div className="container video-content">
          <button
            className="play-button"
            aria-label="Apresentação institucional"
            onClick={() => setVideo(true)}
          >
            <Play size={36} fill="currentColor" />
          </button>
          <div>
            <h2>
              INTELIGÊNCIA
              <br />
              QUE VALORIZA
              <br />
              <em>CADA GRÃO</em>
            </h2>
            <button className="button outline" onClick={() => setVideo(true)}>
              Assista ao vídeo institucional
            </button>
          </div>
        </div>
      </section>
      {video && (
        <Modal title="Conheça a JXO" onClose={() => setVideo(false)}>
          <Crop
            src={images.home}
            source={[914, 1600]}
            rect={[490, 110, 424, 420]}
            alt="Selecionadora JXO"
          />
          <p>
            O vídeo institucional oficial será disponibilizado nesta área.
            Explore agora as soluções e a tecnologia da JXO.
          </p>
          <ButtonLink href="/tecnologia">Conheça nossa tecnologia</ButtonLink>
        </Modal>
      )}
    </Shell>
  );
}
export function Catalog() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("relevance");
  // Query initialization happens only in the browser; the first render remains stable for hydration.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("categoria");
    if (value) setCategory(value);
  }, []);
  const categories = [
    "Todos",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];
  const filtered = products
    .filter(
      (p) =>
        (category === "Todos" || p.category === category) &&
        `${p.name} ${p.description}`
          .toLocaleLowerCase("pt-BR")
          .includes(search.toLocaleLowerCase("pt-BR")),
    )
    .sort((a, b) =>
      sort === "az"
        ? a.name.localeCompare(b.name)
        : sort === "za"
          ? b.name.localeCompare(a.name)
          : 0,
    );
  return (
    <Shell>
      <Hero
        title="Nossos"
        highlight="Produtos"
        description="Soluções completas para todas as etapas do beneficiamento de grãos e sementes."
        variant="catalog"
      >
        <div className="mini-benefits">
          <span>
            <Icon name="award" />
            Tecnologia comprovada em campo
          </span>
          <span>
            <Icon name="leaf" />
            Mais produtividade e qualidade
          </span>
          <span>
            <Icon name="chart" />
            Soluções para sua operação
          </span>
        </div>
      </Hero>
      <div className="container catalog-layout section">
        <aside>
          <div className="panel category-panel">
            <h3>Filtrar por categoria</h3>
            {categories.map((c) => (
              <button
                key={c}
                className={category === c ? "selected" : ""}
                onClick={() => setCategory(c)}
              >
                {c === "Todos" ? "Todos os produtos" : c}
                <span>
                  {c === "Todos"
                    ? products.length
                    : products.filter((p) => p.category === c).length}
                </span>
              </button>
            ))}
          </div>
          <div className="side-promo">
            <span className="eyebrow">
              TECNOLOGIA PARA UM AGRONEGÓCIO MAIS FORTE
            </span>
            <h2>
              Equipamentos que <em>entregam mais valor para cada grão.</em>
            </h2>
            {[
              "Alta performance",
              "Mais pureza",
              "Menor perda",
              "Maior rentabilidade",
            ].map((t) => (
              <p key={t}>
                <Icon name="check" size={20} />
                {t}
              </p>
            ))}
          </div>
        </aside>
        <div>
          <div className="toolbar">
            <label className="search">
              <Search size={20} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produtos, linhas ou palavras-chave..."
                aria-label="Buscar produtos"
              />
            </label>
            <select
              aria-label="Ordenar produtos"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Mais relevantes</option>
              <option value="az">Nome: A a Z</option>
              <option value="za">Nome: Z a A</option>
            </select>
          </div>
          <p className="result-count" aria-live="polite">
            {filtered.length} equipamentos encontrados
          </p>
          <div className="product-grid">
            {filtered.map((p) => (
              <Link
                className="product-card"
                key={p.slug}
                href={`/produtos/${p.slug}`}
              >
                <Crop
                  src={images.catalog}
                  source={[900, 1600]}
                  rect={p.crop}
                  alt={p.name}
                />
                <div>
                  <h3>{p.name}</h3>
                  <small>Linha JXO</small>
                  <p>{p.description}</p>
                  <span className="circle-arrow">
                    <Plus size={21} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {!filtered.length && (
            <div className="empty">
              <Search size={36} />
              <h3>Nenhum produto encontrado</h3>
              <p>Tente outro termo ou escolha outra categoria.</p>
              <button
                className="button"
                onClick={() => {
                  setSearch("");
                  setCategory("Todos");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
          <div className="catalog-cta">
            <h3>
              Soluções completas
              <br />
              <em>para o seu negócio</em>
            </h3>
            <ButtonLink href="/atendimento">
              Fale com um especialista
            </ButtonLink>
          </div>
        </div>
      </div>
    </Shell>
  );
}
const specs = [
  ["Capacidade", "Até 3.000 kg/h"],
  ["Canais", "Até 540 canais"],
  ["Tecnologia de detecção", "RGB + Infravermelho + UV"],
  ["Alimentação elétrica", "380 V | 50/60 Hz"],
  ["Consumo médio", "8,5 kW"],
  ["Dimensões (C × L × A)", "2,6 × 1,7 × 2,4 m"],
  ["Peso", "1.800 kg"],
];
export function ProductDetail({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug)!;
  const [tab, setTab] = useState("Visão geral");
  const [photo, setPhoto] = useState(0);
  const coffee = slug === "jxo-cafe-3000";
  const gallery = [
    [36, 109, 435, 377],
    [75, 501, 98, 83],
    [187, 501, 110, 83],
    [310, 501, 115, 83],
    [440, 501, 133, 83],
    [590, 501, 120, 83],
    [853, 501, 159, 83],
  ];
  return (
    <Shell>
      <Breadcrumb
        items={[
          { label: "Produtos", href: "/produtos" },
          { label: product.name },
        ]}
      />
      <section className="container product-hero">
        <div>
          {coffee ? (
            <Crop
              src={images.product}
              source={[1086, 1448]}
              rect={gallery[photo]}
              alt={`${product.name} — vista ${photo + 1}`}
              className="machine-detail"
            />
          ) : (
            <Crop
              src={images.catalog}
              source={[900, 1600]}
              rect={product.crop}
              alt={product.name}
              className="machine-detail"
            />
          )}
        </div>
        <div>
          <span className="eyebrow green">PRECISÃO EM CADA DETALHE</span>
          <h1>
            {coffee ? "Selecionadora de Café" : product.name}
            <em>{coffee ? "JXO Café 3000" : "Linha JXO"}</em>
          </h1>
          <p className="lead">{product.description}</p>
          <p>
            Uma solução que une tecnologia, produtividade e confiabilidade para
            elevar o padrão de qualidade do seu produto.
          </p>
          <div className="stack">
            <ButtonLink
              href={`/contato?assunto=Orçamento&produto=${encodeURIComponent(product.name)}`}
            >
              Solicitar orçamento
            </ButtonLink>
            <ButtonLink href="/atendimento" outline>
              Falar com um especialista
            </ButtonLink>
          </div>
        </div>
      </section>
      {coffee && (
        <div className="container gallery">
          {gallery.map((rect, i) => (
            <button
              key={i}
              onClick={() => setPhoto(i)}
              className={photo === i ? "selected" : ""}
              aria-label={`Ver imagem ${i + 1}`}
              aria-pressed={photo === i}
            >
              <Crop
                src={images.product}
                source={[1086, 1448]}
                rect={rect}
                alt=""
              />
            </button>
          ))}
        </div>
      )}
      <section className="container feature-strip">
        {[
          ["chart", "Maior produtividade"],
          ["brain", "Inteligência artificial"],
          ["target", "Alta precisão"],
          ["leaf", "Baixo consumo"],
          ["settings", "Múltiplas aplicações"],
          ["monitor", "Software próprio"],
          ["globe", "Controle remoto"],
          ["wrench", "Assistência técnica"],
        ].map(([icon, text]) => (
          <div key={text}>
            <Icon name={icon} size={36} />
            <strong>{text}</strong>
          </div>
        ))}
      </section>
      <section className="container product-info">
        <div
          className="tabs"
          role="tablist"
          aria-label="Informações do produto"
        >
          {[
            "Visão geral",
            "Especificações técnicas",
            "Benefícios",
            "Aplicações",
            "Downloads",
          ].map((t) => (
            <button
              key={t}
              role="tab"
              id={`tab-${t}`}
              aria-selected={tab === t}
              aria-controls="product-panel"
              onClick={() => setTab(t)}
              className={tab === t ? "active" : ""}
            >
              {t}
            </button>
          ))}
        </div>
        <div
          className="panel tab-panel"
          role="tabpanel"
          id="product-panel"
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "Visão geral" && (
            <div className="two-columns">
              <div>
                <h2>
                  Máxima qualidade {coffee ? "no seu café" : "na sua produção"}
                </h2>
                <p>
                  A {product.name} foi desenvolvida para entregar um alto padrão
                  de qualidade, unindo tecnologia, produtividade e
                  confiabilidade.
                </p>
                <p>
                  Mais uniformidade, redução de perdas e valorização do produto
                  final em todas as etapas do beneficiamento.
                </p>
              </div>
              <Crop
                src={images.product}
                source={[1086, 1448]}
                rect={[565, 781, 475, 160]}
                alt="Grãos de café selecionados"
              />
            </div>
          )}
          {tab === "Especificações técnicas" && (
            <>
              <h2>Especificações técnicas</h2>
              {coffee ? (
                <SpecTable />
              ) : (
                <p>
                  As especificações deste equipamento serão cadastradas após a
                  validação da ficha técnica oficial pela JXO.
                </p>
              )}
            </>
          )}
          {tab === "Benefícios" && <Benefits />}
          {tab === "Aplicações" && <ApplicationsGrid />}
          {tab === "Downloads" && (
            <>
              <h2>Materiais do equipamento</h2>
              <p>Arquivos de exemplo para demonstração do fluxo de download.</p>
              {[
                "Catálogo comercial",
                "Ficha técnica",
                "Manual de operação",
              ].map((name) => (
                <button
                  className="download-row"
                  key={name}
                  onClick={() => downloadDemo(`${name} — ${product.name}`)}
                >
                  <Icon name="file" />
                  {name}
                  <Icon name="download" />
                </button>
              ))}
            </>
          )}
        </div>
        {tab === "Visão geral" && (
          <>
            <div className="two-columns section-small">
              <div className="panel">
                <h3>
                  <Icon name="settings" />
                  Especificações técnicas
                </h3>
                {coffee ? (
                  <SpecTable />
                ) : (
                  <p>
                    Consulte a equipe para definir a configuração ideal para sua
                    operação.
                  </p>
                )}
              </div>
              <div className="panel">
                <Benefits />
              </div>
            </div>
            <div className="panel">
              <h3>Aplicações</h3>
              <ApplicationsGrid />
            </div>
          </>
        )}
      </section>
      <Callout />
    </Shell>
  );
}
function SpecTable() {
  return (
    <>
      <table className="spec-table">
        <tbody>
          {specs.map(([label, value]) => (
            <tr key={label}>
              <th>{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <small className="muted">
        Dados ilustrativos da referência; sujeitos à validação técnica da JXO.
      </small>
    </>
  );
}
function Benefits() {
  return (
    <>
      <h3>
        <Icon name="shield" />
        Principais benefícios
      </h3>
      <ul className="benefit-list">
        {[
          "Remoção precisa de impurezas e defeitos",
          "Mais uniformidade e qualidade do produto",
          "Maior valor comercial",
          "Redução de perdas",
          "Produtividade para sua operação",
        ].map((t) => (
          <li key={t}>
            <Icon name="check" size={21} />
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}
export function ApplicationsGrid() {
  return (
    <div className="applications-grid">
      {[
        "Café cereja",
        "Café beneficiado",
        "Café especial",
        "Café industrial",
      ].map((label, i) => (
        <div key={label}>
          <Crop
            src={images.product}
            source={[1086, 1448]}
            rect={[38 + i * 256, 1239, 240, 56]}
            alt={label}
          />
          <strong>{label}</strong>
        </div>
      ))}
    </div>
  );
}
export function Technology() {
  return (
    <Shell>
      <Hero
        title="A nossa tecnologia trabalha pelo futuro"
        highlight="do seu negócio"
        description="Visão inteligente, controle de processo e automação para um beneficiamento mais seguro, produtivo e sustentável, com base em dados e alta performance."
        variant="technology"
      >
        <div className="mini-benefits">
          <span>
            <Icon name="leaf" />
            Mais produtividade
          </span>
          <span>
            <Icon name="shield" />
            Operação segura
          </span>
          <span>
            <Icon name="globe" />
            Resultados sustentáveis
          </span>
        </div>
      </Hero>
      <div className="container">
        <section className="technology-cards">
          {[
            [
              "eye",
              "Visão Artificial",
              "Identificação precisa de defeitos e impurezas com inteligência artificial.",
            ],
            [
              "chart",
              "Alta Performance",
              "Resultados com mais produtividade, menor perda e maior rendimento.",
            ],
            [
              "shield",
              "Qualidade do Produto Final",
              "Grãos e sementes mais limpos, uniformes e com maior valor comercial.",
            ],
            [
              "globe",
              "Padrão Internacional",
              "Tecnologia desenvolvida para atender aos mais altos níveis de exigência.",
            ],
          ].map(([icon, title, text]) => (
            <article key={title}>
              <Icon name={icon} size={56} />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>
        <section className="collaborator-banner">
          <div className="section-heading">
            <div>
              <h2>
                <Icon name="user" size={36} />
                Área do colaborador
              </h2>
              <p>
                Acesse conteúdos, documentos e relatórios de forma organizada.
              </p>
            </div>
            <ButtonLink href="/acesso">Acesso demonstrativo</ButtonLink>
          </div>
          <div className="module-grid compact">
            {modules.map((m) => (
              <Link key={m.slug} href={`/colaborador/${m.slug}`}>
                <Icon name={m.icon} size={38} />
                <div>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
                <ArrowRight size={20} />
              </Link>
            ))}
          </div>
        </section>
        <section className="vision">
          <Crop
            src={images.technology}
            source={[1122, 1402]}
            rect={[19, 1140, 370, 248]}
            alt="Visão artificial"
          />
          <div>
            <h2>
              VISÃO ARTIFICIAL
              <br />
              QUE ENXERGA
              <br />
              <em>MAIS VALOR.</em>
            </h2>
            <p>
              Dados, precisão e sustentabilidade para um agronegócio melhor.
            </p>
            <ButtonLink href="/produtos">Conheça nossas soluções</ButtonLink>
          </div>
          <ul>
            <li>
              <Icon name="chart" />
              <span>
                <strong>Dados em tempo real</strong>Decisões mais precisas.
              </span>
            </li>
            <li>
              <Icon name="leaf" />
              <span>
                <strong>Mais sustentabilidade</strong>Menos desperdício.
              </span>
            </li>
            <li>
              <Icon name="award" />
              <span>
                <strong>Resultados mais rentáveis</strong>Mais valor para o seu
                negócio.
              </span>
            </li>
          </ul>
        </section>
      </div>
      <Callout />
    </Shell>
  );
}
export function News() {
  const [filter, setFilter] = useState("Todos");
  return (
    <Shell>
      <Hero
        title="Notícias,"
        highlight="Feiras e Eventos"
        description="Acompanhe nossas novidades, participe dos nossos eventos e fique por dentro do mundo da seleção de grãos e sementes."
      />
      <section className="news-section">
        <div className="container">
          <div className="filter-tabs">
            {["Todos", "Notícias", "Feiras e Eventos", "Agronegócio"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={f === filter ? "active" : ""}
                >
                  {f}
                </button>
              ),
            )}
          </div>
          <div className="news-grid">
            {news
              .filter((n) => filter === "Todos" || n.category === filter)
              .map((n) => (
                <article className="news-card" key={n.slug}>
                  <div className="news-photo">
                    <Crop
                      src={images.news}
                      source={[1086, 1448]}
                      rect={n.crop}
                      alt={n.title}
                    />
                    <span className="tag">
                      {n.category === "Feiras e Eventos" ? "EVENTO" : "NOTÍCIA"}
                    </span>
                  </div>
                  <div className="news-copy">
                    <small>
                      <CalendarDays size={15} />
                      {n.date}
                    </small>
                    <h2>{n.title}</h2>
                    <p>{n.description}</p>
                    <Link href={`/noticias/${n.slug}`}>
                      Leia mais <ArrowRight size={20} />
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
      <Callout title="Conhecimento que impulsiona o agronegócio." />
    </Shell>
  );
}
export function NewsArticle({ slug }: { slug: string }) {
  const article = news.find((n) => n.slug === slug)!;
  return (
    <Shell>
      <Breadcrumb
        items={[
          { label: "Notícias", href: "/noticias" },
          { label: article.title },
        ]}
      />
      <article className="container article">
        <span className="eyebrow green">
          {article.category} · {article.date}
        </span>
        <h1>{article.title}</h1>
        <p className="lead">{article.description}</p>
        <Crop
          src={images.news}
          source={[1086, 1448]}
          rect={article.crop}
          alt={article.title}
        />
        <p>
          A tecnologia de seleção de grãos aproxima qualidade e produtividade.
          Conheça soluções para diferentes culturas, etapas de beneficiamento e
          necessidades da sua operação.
        </p>
        <div className="notice">
          Conteúdo demonstrativo baseado nas referências visuais. Datas e
          informações editoriais aguardam validação da JXO.
        </div>
        <ButtonLink href="/contato">Converse com nossa equipe</ButtonLink>
      </article>
    </Shell>
  );
}
export function Institutional() {
  return (
    <Shell>
      <Hero
        title="Tradição que inspira."
        highlight="Tecnologia que transforma."
        description="Soluções em seleção de grãos e sementes para um agronegócio mais forte, produtivo e sustentável."
        variant="catalog"
      />
      <section className="container section two-columns">
        <div>
          <span className="eyebrow green">CONHEÇA A JXO</span>
          <h2>
            Mais valor para cada grão.
            <br />
            Mais futuro para o campo.
          </h2>
          <p className="lead">
            Tecnologia, qualidade e proximidade com quem produz.
          </p>
          <p>
            A JXO apresenta soluções para o beneficiamento de grãos e sementes,
            conectando equipamentos, conhecimento técnico e atendimento
            especializado.
          </p>
          <ButtonLink href="/contato">Fale com a nossa equipe</ButtonLink>
        </div>
        <Crop
          src={images.contact}
          source={[1122, 1402]}
          rect={[303, 407, 294, 395]}
          alt="Estrutura JXO na referência visual"
        />
      </section>
      <section className="container institutional-values">
        {[
          [
            "target",
            "Nossa missão",
            "Contribuir para a qualidade e produtividade do agronegócio.",
          ],
          [
            "eye",
            "Nossa visão",
            "Transformar tecnologia em resultados para quem produz.",
          ],
          [
            "shield",
            "Nossos valores",
            "Qualidade, compromisso, inovação e parceria.",
          ],
        ].map(([icon, title, text]) => (
          <div className="panel" key={title}>
            <Icon name={icon} size={40} />
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>
      <Callout />
    </Shell>
  );
}
export function Applications() {
  return (
    <Shell>
      <Hero
        title="A solução certa para"
        highlight="cada aplicação"
        description="Tecnologia de seleção para café, grãos e sementes. Mais qualidade da recepção ao produto final."
        variant="technology"
      />
      <section className="container section">
        <h2>Qualidade em diferentes culturas</h2>
        <ApplicationsGrid />
        <div className="solution-grid">
          {["Café", "Soja", "Milho", "Feijão", "Sementes"].map((name) => (
            <Link
              className="solution-card"
              key={name}
              href={`/contato?assunto=Orçamento&produto=${name}`}
            >
              <Icon name="leaf" size={42} />
              <h3>{name}</h3>
              <p>Encontre a configuração ideal para sua produção.</p>
              <span className="circle-arrow">
                <ArrowRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Callout />
    </Shell>
  );
}
