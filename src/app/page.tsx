"use client";
import { useEffect } from "react";
import Sidebar from "@/components/SideBar/Index";
import Header from "@/components/Header/Index";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    const isTokenValid = !!tokenFromLocalStorage;

    if (isTokenValid) {
      router.push("/saldos");
    }
    router.push("/auth");
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}
