"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Send,
  Video,
  VideoOff,
} from "lucide-react";
import { Hero, Icon, Modal, Shell } from "./ui";

type Message = { text: string; own: boolean; time: string };
const team = [
  { name: "Fernanda Lima", role: "Comercial", initials: "FL" },
  { name: "Rodrigo Alves", role: "Suporte técnico", initials: "RA" },
  { name: "Mariana Costa", role: "Pós-venda", initials: "MC" },
];
const initialMessages: Message[] = [
  {
    text: "Olá! Bem-vindo à demonstração da JXO 👋",
    own: false,
    time: "Agora",
  },
  {
    text: "Como podemos ajudar hoje? Escolha uma opção ou digite sua mensagem.",
    own: false,
    time: "Agora",
  },
];
export function Support() {
  const [agent, setAgent] = useState(0);
  const [threads, setThreads] = useState<Message[][]>(
    team.map(() => [...initialMessages]),
  );
  const [input, setInput] = useState("");
  const [call, setCall] = useState("");
  const [typing, setTyping] = useState(false);
  const [muted, setMuted] = useState(false);
  const [camera, setCamera] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [threads, agent, typing]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function send(text: string) {
    if (!text.trim() || typing) return;
    const index = agent;
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setThreads((prev) =>
      prev.map((thread, i) =>
        i === index
          ? [...thread, { text: text.trim(), own: true, time }]
          : thread,
      ),
    );
    setInput("");
    setTyping(true);
    timer.current = setTimeout(() => {
      const answer = /orçamento|preço|valor/i.test(text)
        ? "Podemos organizar sua solicitação no formulário de orçamento. Informe a cultura, a capacidade desejada e o equipamento de interesse. Esta é uma resposta automática de demonstração."
        : /suporte|problema|manutenção/i.test(text)
          ? "Para o atendimento técnico, tenha em mãos o modelo e o número de série. Na versão integrada, nossa equipe poderá acompanhar sua solicitação. Esta conversa é demonstrativa."
          : "Obrigado pela mensagem! Este chat demonstra a experiência de atendimento. Na versão conectada, um profissional da JXO responderá aqui em tempo real.";
      setThreads((prev) =>
        prev.map((thread, i) =>
          i === index
            ? [...thread, { text: answer, own: false, time }]
            : thread,
        ),
      );
      setTyping(false);
    }, 700);
  }
  return (
    <Shell>
      <Hero
        title="Atendimento online. Fale com a"
        highlight="JXO em tempo real"
        description="Tire suas dúvidas com nossa equipe especializada. Conheça a experiência de chat, áudio e videochamada."
        variant="support"
      >
        <div className="mini-benefits">
          <span>
            <Icon name="message" />
            Chat online
          </span>
          <span>
            <Icon name="phone" />
            Áudio
          </span>
          <span>
            <Icon name="video" />
            Videochamada
          </span>
        </div>
      </Hero>
      <section className="container section">
        <div className="notice">
          Atendimento demonstrativo: perfis e respostas são simulados. Nenhuma
          pessoa real está conectada e nenhuma ligação será realizada.
        </div>
        <div className="chat-layout">
          <aside className="team">
            <h3>Nossa equipe</h3>
            <small>
              <span className="status-dot" />
              Demonstração disponível
            </small>
            {team.map((person, i) => (
              <button
                key={person.name}
                className={agent === i ? "selected" : ""}
                onClick={() => setAgent(i)}
              >
                <span className={`avatar avatar-${i}`}>{person.initials}</span>
                <span>
                  <strong>{person.name}</strong>
                  <small>{person.role}</small>
                  <small className="online">Perfil demonstrativo</small>
                </span>
              </button>
            ))}
          </aside>
          <div className="chat">
            <div className="chat-header">
              <span className={`avatar avatar-${agent}`}>
                {team[agent].initials}
              </span>
              <div>
                <strong>{team[agent].name}</strong>
                <small>{team[agent].role} · Demonstração</small>
              </div>
              <div className="chat-controls">
                <button
                  className="button secondary"
                  onClick={() => setCall("Áudio")}
                >
                  <Phone size={17} />
                  <span>Áudio</span>
                </button>
                <button
                  className="button secondary"
                  onClick={() => setCall("Vídeo")}
                >
                  <Video size={17} />
                  <span>Vídeo</span>
                </button>
              </div>
            </div>
            <div
              className="messages"
              role="log"
              aria-label="Mensagens da demonstração"
              aria-live="polite"
            >
              <span className="chat-date">Hoje · Ambiente demonstrativo</span>
              {threads[agent].map((message, i) => (
                <div key={i} className={`bubble ${message.own ? "own" : ""}`}>
                  <p>{message.text}</p>
                  <small>
                    {message.time}
                    {message.own && " ✓✓"}
                  </small>
                </div>
              ))}
              {typing && (
                <span className="typing">
                  Preparando resposta demonstrativa…
                </span>
              )}
              <div ref={end} />
            </div>
            <div className="chat-suggestions">
              {["Quero um orçamento", "Preciso de suporte"].map((t) => (
                <button disabled={typing} key={t} onClick={() => send(t)}>
                  {t}
                </button>
              ))}
            </div>
            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                aria-label="Sua mensagem"
                maxLength={2000}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Enviar mensagem"
              >
                <Send size={21} />
              </button>
            </form>
          </div>
        </div>
        <div className="video-call-banner">
          <Icon name="video" size={48} />
          <div>
            <h2>Atendimento por videochamada</h2>
            <p>
              Veja como será a experiência de atendimento ao vivo com nossos
              especialistas.
            </p>
          </div>
          <button className="button" onClick={() => setCall("Vídeo")}>
            Experimentar chamada <Icon name="arrow" size={18} />
          </button>
        </div>
      </section>
      {call && (
        <Modal
          title={`${call === "Vídeo" ? "Videochamada" : "Chamada de áudio"} — demonstração`}
          onClose={() => setCall("")}
        >
          <div className="call-screen">
            <span className={`avatar avatar-${agent}`}>
              {team[agent].initials}
            </span>
            <h2>{team[agent].name}</h2>
            <p>Prévia da interface · Nenhuma chamada ativa</p>
            <div className="call-preview">
              {camera ? <Video size={40} /> : <VideoOff size={40} />}
              <small>
                {camera ? "Câmera simulada ativada" : "Câmera desligada"}
              </small>
            </div>
            <div className="call-controls">
              <button
                onClick={() => setMuted(!muted)}
                aria-label={
                  muted
                    ? "Ativar microfone simulado"
                    : "Silenciar microfone simulado"
                }
                aria-pressed={muted}
              >
                {muted ? <MicOff /> : <Mic />}
              </button>
              {call === "Vídeo" && (
                <button
                  onClick={() => setCamera(!camera)}
                  aria-label="Alternar câmera simulada"
                  aria-pressed={camera}
                >
                  {camera ? <Video /> : <VideoOff />}
                </button>
              )}
              <button
                className="hangup"
                onClick={() => setCall("")}
                aria-label="Encerrar demonstração"
              >
                <PhoneOff />
              </button>
            </div>
          </div>
          <p className="muted">
            Câmera e microfone reais não são acessados. A conexão entre
            participantes será implementada com o backend.
          </p>
        </Modal>
      )}
    </Shell>
  );
}
