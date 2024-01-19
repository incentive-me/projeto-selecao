"use client";
import Sidebar from "@/components/SideBar/Index";
import Header from "@/components/Header/Index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");

    const isTokenValid = !!tokenFromLocalStorage;

    isTokenValid ? router.push("/saldos") : router.push("/auth");
  }, [router]);
  return (
    <>
      <Header />
      <Sidebar />
    </>
  );
}
