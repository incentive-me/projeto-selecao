"use client";

// IMPORTS
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

// SERVICES
import { useUser } from "@/context/UserContext";

// COMPONENTS
import { Separator } from "../ui/separator";
import { CircleDollarSignIcon, LogOutIcon, WalletIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function NavigationMenu() {
  const pathname = usePathname();
  const { logOutUser } = useUser();

  const items = [
    {
      name: "Pagamentos",
      href: "/payment",
      onClick: () => {},
      icon: <CircleDollarSignIcon className="h-6 w-6" />,
    },
    {
      name: "Saldos",
      href: "/balance",
      onClick: () => {},
      icon: <WalletIcon className="h-6 w-6" />,
    },
    {
      name: "Sair da conta",
      href: "/login",
      onClick: () => logOutUser,
      icon: <LogOutIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex-shrink-0 w-64 bg-zinc-800 text-white hidden md:block">
      <ul className="py-4">
        {items.map(({ href, name, onClick, icon }, index) => (
          <React.Fragment key={index}>
            <li
              className={`flex items-center gap-4 ${
                pathname === href && "bg-slate-500/50"
              } p-4`}
            >
              {icon}

              {href === "login" ? (
                <Button
                  onClick={onClick}
                  variant="link"
                  className="text-base block text-white"
                >
                  {name}
                </Button>
              ) : (
                <Link
                  onClick={onClick}
                  href={href}
                  className="text-base block text-white"
                >
                  {name}
                </Link>
              )}
            </li>
            {items.length - 1 !== index && (
              <Separator className="bg-zinc-950" />
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
