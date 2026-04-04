import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ministère du Tourisme du Niger",
    template: "%s | Ministère du Tourisme du Niger",
  },
  description:
    "Plateforme officielle du Ministère du Tourisme du Niger — découvrez les destinations, circuits et événements du Sahara au Sahel.",
  openGraph: {
    title: "Ministère du Tourisme du Niger",
    description:
      "Découvrez les trésors du Niger — désert de l'Aïr, fleuves, culture touareg et patrimoine UNESCO.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
