"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Download, Search } from "lucide-react";
import { documents, modules } from "@/lib/data";
import { Breadcrumb, ButtonLink, Hero, Icon, Shell, downloadDemo } from "./ui";

type RecordItem = {
  id: string;
  type: string;
  date: string;
  data: Record<string, string>;
};
export function readRecords(): RecordItem[] {
  try {
    return JSON.parse(localStorage.getItem("jxo-records") || "[]");
  } catch {
    return [];
  }
}
function saveRecord(type: string, data: Record<string, string>) {
  const item = {
    id: `JXO-${Date.now().toString().slice(-7)}`,
    type,
    date: new Date().toLocaleString("pt-BR"),
    data,
  };
  localStorage.setItem("jxo-records", JSON.stringify([item, ...readRecords()]));
  return item.id;
}
function Field({
  label,
  name,
  type = "text",
  required = false,
  options,
  value,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  options?: string[];
  value?: string;
}) {
  return (
    <label className={`field ${type === "textarea" ? "full" : ""}`}>
      <span>
        {label}
        {required && <b> *</b>}
      </span>
      {options ? (
        <select name={name} required={required} defaultValue={value || ""}>
          <option value="">Selecione uma opção</option>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          defaultValue={value}
          placeholder={`Informe ${label.toLowerCase()}`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={value}
          min={type === "number" ? 0 : undefined}
          step={type === "number" ? "0.01" : undefined}
          placeholder={label}
        />
      )}
    </label>
  );
}
export function Contact() {
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [initial, setInitial] = useState({ subject: "", product: "" });
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setInitial({
      subject: q.get("assunto") || "",
      product: q.get("produto") || "",
    });
  }, []);
  return (
    <Shell>
      <Hero
        title="Fale"
        highlight="Conosco"
        description="Nossa equipe está pronta para atender você e entender a necessidade do seu negócio."
      />
      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-channels">
            <div className="panel-title">
              <Icon name="phone" />
              Nossos canais de atendimento
            </div>
            <div className="channel-list">
              {[
                [
                  "phone",
                  "Telefone comercial",
                  "+55 (49) 3551-3200",
                  "Fale diretamente com nosso time.",
                ],
                [
                  "message",
                  "WhatsApp",
                  "+55 (49) 9927-5043",
                  "Atendimento rápido e prático.",
                ],
                [
                  "file",
                  "E-mail",
                  "vendas@jxo.com.br",
                  "Envie sua dúvida, solicitação ou orçamento.",
                ],
                [
                  "map",
                  "Endereço",
                  "Rodovia SC 283, Km 158",
                  "Concórdia – SC, Brasil",
                ],
                [
                  "clock",
                  "Horário de atendimento",
                  "Segunda a sexta: 7h30 às 12h e 13h às 17h30",
                  "Sábado: 7h30 às 12h",
                ],
              ].map(([icon, label, title, text]) => (
                <div className="channel" key={label}>
                  <span>
                    <Icon name={icon} size={32} />
                  </span>
                  <div>
                    <small>{label}</small>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
              <small className="reference-note">
                Contatos reproduzidos da referência visual, sujeitos à
                confirmação.
              </small>
            </div>
          </div>
          <div className="contact-form">
            <div className="panel-title">
              <Icon name="message" />
              Envie uma mensagem
            </div>
            {done ? (
              <div className="success">
                <CheckCircle2 size={52} />
                <h2>Mensagem registrada na demonstração</h2>
                <p>
                  Protocolo {done}. Os dados estão salvos apenas neste
                  navegador; nenhum e-mail foi enviado.
                </p>
                <button className="button" onClick={() => setDone("")}>
                  Nova mensagem
                </button>
              </div>
            ) : (
              <form
                key={JSON.stringify(initial)}
                onSubmit={(e) => {
                  e.preventDefault();
                  setError("");
                  try {
                    setDone(
                      saveRecord(
                        "Contato",
                        Object.fromEntries(
                          new FormData(e.currentTarget),
                        ) as Record<string, string>,
                      ),
                    );
                  } catch {
                    setError(
                      "Não foi possível salvar no navegador. Verifique se o armazenamento local está disponível.",
                    );
                  }
                }}
              >
                <Field label="Nome" name="nome" required />
                <Field label="E-mail" name="email" type="email" required />
                <Field label="Telefone" name="telefone" type="tel" required />
                <Field label="Empresa" name="empresa" />
                <Field
                  label="Assunto"
                  name="assunto"
                  required
                  options={[
                    "Orçamento",
                    "Suporte técnico",
                    "Pós-venda",
                    "Informações",
                    "Outros",
                  ]}
                  value={initial.subject}
                />
                <Field
                  label="Mensagem"
                  name="mensagem"
                  type="textarea"
                  required
                  value={
                    initial.product
                      ? `Gostaria de informações sobre ${initial.product}.`
                      : ""
                  }
                />
                <label className="checkbox">
                  <input type="checkbox" required />
                  Estou ciente de que este é um formulário demonstrativo e não
                  envia dados à JXO.
                </label>
                {error && (
                  <p role="alert" className="error">
                    {error}
                  </p>
                )}
                <button className="button" type="submit">
                  Registrar mensagem <ArrowRight size={18} />
                </button>
                <small className="muted">
                  Demonstração local. Use dados fictícios para testar.
                </small>
              </form>
            )}
          </div>
        </div>
        <div className="container location-panel">
          <div>
            <h2>
              <Icon name="map" />
              Nossa localização
            </h2>
            <p>Venha nos visitar e conhecer nossa estrutura de perto.</p>
            <div className="address">
              Rodovia SC 283, Km 158
              <br />
              Concórdia – SC, Brasil
            </div>
            <a
              className="button outline"
              href="https://www.google.com/maps/search/?api=1&query=JXO+Concordia+SC"
              target="_blank"
              rel="noreferrer"
            >
              Pesquisar no Google Maps <ArrowRight size={18} />
            </a>
          </div>
          <div className="map-illustration">
            <div className="map-road" />
            <Icon name="map" size={60} />
            <strong>JXO Selecionadora Eletrônica</strong>
            <span>Concórdia · Santa Catarina</span>
            <small>Localização ilustrativa</small>
          </div>
        </div>
      </section>
      <section className="container support-strip">
        <div>
          <h2>
            Atendimento técnico e comercial
            <br />
            <em>em todo o Brasil</em>
          </h2>
          <p>Agilidade, conhecimento e foco em resultados.</p>
        </div>
        {[
          ["user", "Equipe especializada"],
          ["headset", "Suporte técnico dedicado"],
          ["globe", "Atendimento nacional"],
          ["shield", "Parceria de longo prazo"],
        ].map(([icon, title]) => (
          <div key={title}>
            <Icon name={icon} size={36} />
            <strong>{title}</strong>
          </div>
        ))}
      </section>
    </Shell>
  );
}
export function Access() {
  const router = useRouter();
  const [role, setRole] = useState("Colaborador");
  return (
    <Shell>
      <div className="access-page">
        <div className="access-intro">
          <span className="eyebrow">CONECTADOS AO SEU NEGÓCIO</span>
          <h1>
            Tecnologia e pessoas.
            <br />
            <em>Juntas, mais longe.</em>
          </h1>
          <p>
            Acesse documentos, organize atendimentos e acompanhe suas atividades
            em um só lugar.
          </p>
          <div className="mini-benefits">
            <span>
              <Icon name="file" />
              Documentos
            </span>
            <span>
              <Icon name="headset" />
              Atendimento
            </span>
          </div>
        </div>
        <div className="access-card">
          <Icon name="lock" size={40} />
          <h2>Acesso ao portal</h2>
          <p>Explore a experiência da JXO.</p>
          <div className="filter-tabs">
            {["Colaborador", "Cliente"].map((r) => (
              <button
                key={r}
                className={r === role ? "active" : ""}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="notice">
            Modo de apresentação: não é necessário criar uma conta ou informar
            senha.
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const name = String(
                new FormData(e.currentTarget).get("nome") || "Visitante",
              );
              try {
                sessionStorage.setItem("jxo-demo-name", name);
              } catch {}
              router.push(
                role === "Colaborador" ? "/colaborador" : "/atendimento",
              );
            }}
          >
            <Field label="Como podemos chamar você?" name="nome" />
            <button className="button" type="submit">
              Entrar na demonstração <ArrowRight size={18} />
            </button>
          </form>
          <small className="muted">
            Autenticação e controle de acesso serão integrados na etapa de
            backend.
          </small>
        </div>
      </div>
    </Shell>
  );
}
export function Portal() {
  const [name, setName] = useState("Visitante");
  const [records, setRecords] = useState<RecordItem[]>([]);
  useEffect(() => {
    try {
      setName(sessionStorage.getItem("jxo-demo-name") || "Visitante");
    } catch {}
    setRecords(readRecords());
  }, []);
  return (
    <Shell>
      <Hero
        title="Área do"
        highlight="Colaborador"
        description="Acesse seus documentos, arquivos técnicos, formulários e relatórios de forma rápida e organizada."
        variant="portal"
      >
        <span className="user-chip">
          <Icon name="user" size={18} />
          Olá, {name} · Ambiente de demonstração
        </span>
      </Hero>
      <section className="container section">
        <div className="module-grid">
          {modules.map((m) => (
            <Link key={m.slug} href={`/colaborador/${m.slug}`}>
              <Icon name={m.icon} size={40} />
              <h3>{m.title}</h3>
              <p>{m.description}</p>
              <span className="button">
                {m.action}
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
        <div className="portal-columns">
          <div className="panel">
            <div className="section-heading">
              <h3>
                <Icon name="file" />
                Arquivos recentes
              </h3>
              <Link href="/colaborador/documentos">Ver todos →</Link>
            </div>
            <DocumentTable items={documents} />
          </div>
          <div className="panel">
            <h3>
              <Icon name="calculator" />
              Formulários rápidos
            </h3>
            <div className="quick-grid">
              {modules.slice(2).map((m) => (
                <Link key={m.slug} href={`/colaborador/${m.slug}`}>
                  <Icon name={m.icon} />
                  <strong>{m.title}</strong>
                  <span>Preencher formulário →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="section-heading">
            <h3>
              <Icon name="clock" />
              Meus registros nesta demonstração
            </h3>
            <span className="pill">{records.length} registros</span>
          </div>
          {records.length ? (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Protocolo</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Resumo</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.type}</td>
                      <td>{r.date}</td>
                      <td>
                        {r.data.cliente ||
                          r.data.nome ||
                          r.data.destino ||
                          "Registro local"}
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          aria-label={`Exportar ${r.id}`}
                          onClick={() => {
                            const url = URL.createObjectURL(
                              new Blob([JSON.stringify(r, null, 2)], {
                                type: "application/json",
                              }),
                            );
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${r.id}.json`;
                            a.click();
                            setTimeout(() => URL.revokeObjectURL(url), 1000);
                          }}
                        >
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty">
              Seus formulários preenchidos aparecerão aqui. Os registros ficam
              apenas neste navegador.
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}
function DocumentTable({ items }: { items: typeof documents }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Nome do arquivo</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.name}>
              <td>
                <span className={`file-badge type-${d.type}`}>{d.type}</span>
                {d.name}
              </td>
              <td>{d.category}</td>
              <td>{d.date}</td>
              <td>
                <button
                  className="icon-button"
                  aria-label={`Baixar exemplo de ${d.name}`}
                  onClick={() => downloadDemo(d.name)}
                >
                  <Download size={19} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Documents({ machines = false }: { machines?: boolean }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const base = machines
    ? documents.filter(
        (d) =>
          d.category === "Arquivos das máquinas" || d.category === "Manuais",
      )
    : documents;
  const filtered = base.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "Todos" || d.category === category),
  );
  return (
    <Shell>
      <Breadcrumb
        items={[
          { label: "Colaborador", href: "/colaborador" },
          { label: machines ? "Arquivos das máquinas" : "Documentos" },
        ]}
      />
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow green">CENTRAL DE ARQUIVOS</span>
            <h1>{machines ? "Arquivos das máquinas" : "Documentos"}</h1>
            <p>Encontre os materiais necessários para sua rotina.</p>
          </div>
          <ButtonLink href="/colaborador">Voltar ao portal</ButtonLink>
        </div>
        <div className="notice">
          Os arquivos são exemplos. O download gera um documento de texto
          demonstrativo, sem conteúdo técnico oficial.
        </div>
        <div className="toolbar">
          <label className="search">
            <Search size={20} />
            <input
              placeholder="Pesquisar arquivo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Pesquisar arquivo"
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Categoria de arquivo"
          >
            {["Todos", ...Array.from(new Set(base.map((d) => d.category)))].map(
              (c) => (
                <option key={c}>{c}</option>
              ),
            )}
          </select>
        </div>
        <div className="panel">
          <DocumentTable items={filtered} />
          {!filtered.length && (
            <p className="empty">Nenhum arquivo encontrado para este filtro.</p>
          )}
        </div>
      </section>
    </Shell>
  );
}
export function PortalForm({ type }: { type: string }) {
  const module = modules.find((m) => m.slug === type)!;
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  return (
    <Shell>
      <Breadcrumb
        items={[
          { label: "Colaborador", href: "/colaborador" },
          { label: module.title },
        ]}
      />
      <section className="container form-page">
        <div className="section-heading">
          <div>
            <span className="eyebrow green">PORTAL DO COLABORADOR</span>
            <h1>{module.title}</h1>
            <p>{module.description}</p>
          </div>
          <Icon name={module.icon} size={48} />
        </div>
        <div className="notice">
          Preencha com dados fictícios. Os registros são salvos apenas neste
          navegador e podem ser consultados no portal.
        </div>
        {done ? (
          <div className="panel success">
            <CheckCircle2 size={56} />
            <h2>Registro salvo com sucesso</h2>
            <p>Protocolo {done}. Disponível no histórico local do portal.</p>
            <div className="actions">
              <button className="button" onClick={() => setDone("")}>
                Novo registro
              </button>
              <ButtonLink href="/colaborador">Ver meus registros</ButtonLink>
            </div>
          </div>
        ) : (
          <form
            className="panel form-grid"
            onSubmit={(e) => {
              e.preventDefault();
              setError("");
              const data = Object.fromEntries(
                new FormData(e.currentTarget),
              ) as Record<string, string>;
              if (data.retorno && data.saida && data.retorno < data.saida) {
                setError(
                  "A data de retorno deve ser igual ou posterior à data de saída.",
                );
                return;
              }
              try {
                setDone(saveRecord(module.title, data));
              } catch {
                setError(
                  "Não foi possível salvar. Verifique a disponibilidade do armazenamento do navegador.",
                );
              }
            }}
          >
            <h2 className="full">
              {type === "viagem" ? "Dados da viagem" : "Dados do atendimento"}
            </h2>
            <Field label="Responsável" name="responsavel" required />
            <Field label="Cliente / Empresa" name="cliente" required />
            {type === "orcamento" && (
              <>
                <Field
                  label="E-mail do cliente"
                  name="email"
                  type="email"
                  required
                />
                <Field label="Telefone" name="telefone" type="tel" required />
                <Field
                  label="Equipamento / Solução"
                  name="equipamento"
                  required
                  options={[
                    "JXO Café 3000",
                    "Classificadora por Cor",
                    "Selecionadora de Sementes",
                    "Selecionadora de Multigrãos",
                    "Limpadora de Grãos",
                    "Solução completa",
                    "Outro",
                  ]}
                />
                <Field label="Cultura / Produto" name="cultura" required />
                <Field
                  label="Capacidade desejada (kg/h)"
                  name="capacidade"
                  type="number"
                />
                <Field label="Cidade / UF" name="cidade" required />
                <Field
                  label="Necessidade do cliente"
                  name="necessidade"
                  type="textarea"
                  required
                />
              </>
            )}
            {type === "viagem" && (
              <>
                <Field label="Origem" name="origem" required />
                <Field label="Destino" name="destino" required />
                <Field
                  label="Data de saída"
                  name="saida"
                  type="date"
                  required
                />
                <Field
                  label="Data de retorno"
                  name="retorno"
                  type="date"
                  required
                />
                <Field
                  label="Meio de transporte"
                  name="transporte"
                  required
                  options={[
                    "Veículo da empresa",
                    "Veículo próprio",
                    "Avião",
                    "Ônibus",
                    "Outro",
                  ]}
                />
                <Field
                  label="Despesa prevista (R$)"
                  name="despesa"
                  type="number"
                />
                <Field
                  label="Objetivo da viagem"
                  name="objetivo"
                  type="textarea"
                  required
                />
              </>
            )}
            {type === "venda" && (
              <>
                <Field
                  label="Data da visita"
                  name="data"
                  type="date"
                  required
                />
                <Field label="Pessoa de contato" name="contato" required />
                <Field
                  label="Equipamento de interesse"
                  name="equipamento"
                  required
                />
                <Field
                  label="Etapa da negociação"
                  name="etapa"
                  required
                  options={[
                    "Primeiro contato",
                    "Levantamento técnico",
                    "Proposta solicitada",
                    "Em negociação",
                    "Sem interesse no momento",
                  ]}
                />
                <Field label="Próximo contato" name="retorno" type="date" />
                <Field label="Valor estimado (R$)" name="valor" type="number" />
                <Field
                  label="Resumo da visita e próximos passos"
                  name="resumo"
                  type="textarea"
                  required
                />
              </>
            )}
            {type === "pos-venda" && (
              <>
                <Field
                  label="Data do atendimento"
                  name="data"
                  type="date"
                  required
                />
                <Field label="Equipamento" name="equipamento" required />
                <Field label="Número de série" name="serie" />
                <Field
                  label="Tipo de atendimento"
                  name="tipo"
                  required
                  options={[
                    "Instalação",
                    "Treinamento",
                    "Manutenção preventiva",
                    "Manutenção corretiva",
                    "Acompanhamento",
                  ]}
                />
                <Field
                  label="Situação"
                  name="situacao"
                  required
                  options={[
                    "Concluído",
                    "Aguardando peça",
                    "Aguardando retorno",
                    "Nova visita necessária",
                  ]}
                />
                <Field label="Próximo atendimento" name="retorno" type="date" />
                <Field
                  label="Problema relatado"
                  name="problema"
                  type="textarea"
                  required
                />
                <Field
                  label="Serviços realizados e orientações"
                  name="servicos"
                  type="textarea"
                  required
                />
              </>
            )}
            <Field
              label="Observações adicionais"
              name="observacoes"
              type="textarea"
            />
            {error && (
              <p className="error full" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions full">
              <Link href="/colaborador" className="button secondary">
                Cancelar
              </Link>
              <button className="button" type="submit">
                Salvar registro <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}
      </section>
    </Shell>
  );
}
