"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BrainCircuit,
  Calculator,
  Check,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Globe2,
  Headphones,
  Leaf,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Phone,
  Settings,
  ShieldCheck,
  Target,
  Truck,
  UserRound,
  Video,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { images } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  arrow: ArrowRight,
  award: Award,
  chart: BarChart3,
  brain: BrainCircuit,
  calculator: Calculator,
  check: Check,
  clock: Clock,
  download: Download,
  eye: Eye,
  file: FileText,
  globe: Globe2,
  headset: Headphones,
  leaf: Leaf,
  lock: LockKeyhole,
  map: MapPin,
  message: MessageCircle,
  monitor: Monitor,
  phone: Phone,
  settings: Settings,
  shield: ShieldCheck,
  target: Target,
  truck: Truck,
  user: UserRound,
  video: Video,
  wrench: Wrench,
};
export function Icon({ name, size = 26 }: { name: string; size?: number }) {
  const Component = icons[name] || Target;
  return <Component size={size} strokeWidth={1.7} aria-hidden="true" />;
}

// CSS windows reuse the supplied visual references without flattening the website into screenshots.
export function Crop({
  src,
  source,
  rect,
  alt,
  className = "",
}: {
  src: string;
  source: [number, number];
  rect: number[];
  alt: string;
  className?: string;
}) {
  const [x, y, w, h] = rect;
  return (
    <div className={`crop ${className}`} style={{ aspectRatio: `${w}/${h}` }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={{
          width: `${(source[0] / w) * 100}%`,
          maxWidth: "none",
          height: "auto",
          left: `${(-x / w) * 100}%`,
          top: 0,
          transform: `translateY(${(-y / source[1]) * 100}%)`,
        }}
      />
    </div>
  );
}
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="JXO — Página inicial">
      <Crop
        src={images.home}
        source={[914, 1600]}
        rect={[24, 16, 216, 73]}
        alt="JXO Selecionadora Eletrônica"
      />
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <Link className={`button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowRight size={19} />
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <a href="#conteudo" className="skip">
        Pular para o conteúdo
      </a>
      <header className="header">
        <div className="header-inner">
          <Logo />
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav
            id="navigation"
            className={open ? "nav open" : "nav"}
            aria-label="Menu principal"
          >
            {[
              ["Produtos", "/produtos"],
              ["Tecnologia", "/tecnologia"],
              ["Aplicações", "/aplicacoes"],
              ["Institucional", "/institucional"],
              ["Notícias", "/noticias"],
              ["Contato", "/contato"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={pathname.startsWith(href) ? "active" : ""}
              >
                {label}
              </Link>
            ))}
            <Link className="button client-button" href="/acesso">
              <UserRound size={20} />
              Área do Cliente
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container value-strip">
        {[
          ["target", "Design premium e moderno"],
          ["monitor", "Experiência intuitiva em qualquer dispositivo"],
          ["chart", "Mais destaque para produtos e soluções"],
          ["shield", "Confiança e credibilidade"],
          ["leaf", "Alinhado ao futuro do agronegócio"],
        ].map(([icon, text]) => (
          <div key={icon}>
            <span className="round-icon">
              <Icon name={icon} size={30} />
            </span>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className="footer-bottom container">
        <Logo />
        <p>Tecnologia que valoriza cada grão.</p>
        <Link href="/colaborador">
          Área do colaborador <ArrowUpRight size={14} />
        </Link>
        <span className="demo-label">Projeto demonstrativo · EWS Tech</span>
      </div>
    </footer>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="conteudo">{children}</main>
      <Footer />
      <Link
        href="/atendimento"
        className="floating-chat"
        aria-label="Abrir atendimento online"
      >
        <MessageCircle size={24} />
        <span>Fale com a JXO</span>
      </Link>
    </>
  );
}
export function Hero({
  title,
  highlight,
  description,
  variant = "grain",
  children,
}: {
  title: string;
  highlight?: string;
  description: string;
  variant?: string;
  children?: React.ReactNode;
}) {
  const config: Record<
    string,
    { src: string; source: [number, number]; rect: number[] }
  > = {
    home: { src: images.home, source: [914, 1600], rect: [490, 110, 424, 420] },
    grain: {
      src: images.contact,
      source: [1122, 1402],
      rect: [495, 85, 627, 262],
    },
    catalog: {
      src: images.catalog,
      source: [900, 1600],
      rect: [448, 90, 450, 248],
    },
    technology: {
      src: images.technology,
      source: [1122, 1402],
      rect: [585, 90, 535, 395],
    },
    portal: {
      src: images.portal,
      source: [1600, 900],
      rect: [450, 207, 392, 207],
    },
    support: {
      src: images.portal,
      source: [1600, 900],
      rect: [1300, 205, 282, 238],
    },
  };
  const c = config[variant] || config.grain;
  return (
    <section className={`hero hero-${variant}`}>
      <div className="hero-art">
        <Crop {...c} alt="Tecnologia JXO para o agronegócio" />
      </div>
      <div className="hero-shade" />
      <div className="container hero-content">
        <span className="eyebrow">JXO · SELECIONADORA ELETRÔNICA</span>
        <h1>
          {title} {highlight && <em>{highlight}</em>}
        </h1>
        <p>{description}</p>
        {children}
      </div>
      <div className="hero-line" />
    </section>
  );
}
export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumb container" aria-label="Navegação estrutural">
      <Link href="/">Início</Link>
      {items.map((item, index) => (
        <span key={index}>
          <ChevronRight size={14} />
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
        </span>
      ))}
    </nav>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="modal"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Fechar janela"
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Callout({
  title = "Tecnologia que valoriza cada grão do seu negócio.",
}: {
  title?: string;
}) {
  return (
    <section className="callout">
      <div className="container">
        <div>
          <span className="eyebrow">MAIS PRODUTIVIDADE. MAIS RESULTADOS.</span>
          <h2>{title}</h2>
          <p>Vamos encontrar a solução ideal para sua operação.</p>
        </div>
        <div className="stack">
          <ButtonLink href="/contato?assunto=Orçamento">
            Solicitar orçamento
          </ButtonLink>
          <ButtonLink href="/atendimento" outline>
            Falar com um especialista
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
export function downloadDemo(name: string) {
  const content = `JXO — DOCUMENTO DEMONSTRATIVO\n\n${name}\n\nEste arquivo foi gerado exclusivamente para apresentar o funcionamento do portal.\nNão contém instruções técnicas oficiais e não deve ser utilizado para operar equipamentos.\n\nNa versão integrada, o download será substituído pelo arquivo oficial cadastrado pela JXO.`;
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/plain;charset=utf-8" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name.replace(/[^\p{L}\p{N} ]/gu, "")}-DEMONSTRACAO.txt`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
