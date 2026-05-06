import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Villakazi Jasiri Scouts",
  description: "Villakazi Rover Crew — Service and Progress",
  icons: {
    icon: "/villakazi.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-100 antialiased scroll-smooth snap-y snap-mandatory">
        <Header />
        <main className="min-h-screen">
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
