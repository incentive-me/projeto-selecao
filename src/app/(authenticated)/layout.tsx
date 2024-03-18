"use client";

// IMPORTS
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// SERVICES
import { getUserCookie } from "@/services/session";
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import Header from "@/components/app/header";
import NavigationMenu from "@/components/app/navigation-menu";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const { getBalanceByUserId } = useBalance();
  const userCookie = getUserCookie();

  console.log("userCookie ", userCookie);
  useEffect(() => {
    if (!userCookie) {
      push("login");
    }
  }, [push, userCookie]);

  useEffect(() => {
    getBalanceByUserId();
  }, []);

  return (
    <div className="flex flex-col h-screen ">
      <Header />

      <div className="flex flex-1">
        <NavigationMenu />

        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
