import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";


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
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen snap-y snap-mandatory scroll-smooth">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
