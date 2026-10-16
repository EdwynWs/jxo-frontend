import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "JXO | Tecnologia que valoriza cada grão",
    template: "%s | JXO",
  },
  description:
    "Soluções em seleção de grãos e sementes. Conheça os equipamentos, a tecnologia e o portal da JXO.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
