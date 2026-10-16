import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <strong>404</strong>
      <h1>Página não encontrada</h1>
      <p>Vamos encontrar o caminho de volta.</p>
      <Link className="button" href="/">
        Voltar para o início →
      </Link>
    </main>
  );
}
