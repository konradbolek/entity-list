import "./globals.css";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-quartz.css";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { ApolloWrapper } from "@/lib/Apollo-provider";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Vertuoza Exercice - Konrad Bolek",
  description: "Created by Konrad Bolek Polcode. Interview application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className="bg-slate-400 flex flex-col min-h-screen">
        <ApolloWrapper>
          <Header />
          {children}
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
