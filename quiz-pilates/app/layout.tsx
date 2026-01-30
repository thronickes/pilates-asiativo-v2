import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pilates Asiático para Menopausa | Quiz Personalizado",
  description: "Obtenha um Programa de Pilates Asiático personalizado para mulheres na menopausa para apoiar a perda de peso, a força, a flexibilidade e o equilíbrio. Comece sua jornada de condicionamento físico com um simples teste de 1 minuto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.pixelId = "695bd2ea74fac6599182d362";
              var a = document.createElement("script");
              a.setAttribute("async", "");
              a.setAttribute("defer", "");
              a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
              document.head.appendChild(a);
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <QuizProvider>{children}</QuizProvider>
        <script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
        ></script>
      </body>
    </html>
  );
}
