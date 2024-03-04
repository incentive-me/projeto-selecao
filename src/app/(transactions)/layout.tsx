import type { Metadata } from "next";
import Header from "@/components/Header/Index";
import Sidebar from "@/components/SideBar/Index";

export const metadata: Metadata = {
  title: "Plataforma de transações",
  description: "Sistema de transações",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Sidebar />
    </>
  );
}
