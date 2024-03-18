"use client";

// IMPORTS

// SERVICES
import { useUser } from "@/context/UserContext";

// COMPONENTS
import {
  CircleDollarSignIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  WalletIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

export default function Header() {
  const pathname = usePathname();
  const { logOutUser } = useUser();
  const [toggleResponsive, setToggleResponsive] = useState(false);

  const items = [
    {
      name: "Pagamentos",
      href: "/payment",
      onClick: () => setToggleResponsive(!toggleResponsive),
      icon: <CircleDollarSignIcon className="h-6 w-6" />,
    },
    {
      name: "Saldos",
      href: "/balance",
      onClick: () => setToggleResponsive(!toggleResponsive),
      icon: <WalletIcon className="h-6 w-6" />,
    },
    {
      name: "Sair da conta",
      href: "/login",
      onClick: () => {
        logOutUser();
        setToggleResponsive(!toggleResponsive);
      },
      icon: <LogOutIcon className="h-6 w-6" />,
    },
  ];

  return (
    <header className="flex flex-col bg-zinc-700 text-white p-4 items-center justify-between">
      <div className="flex flex-wrap w-full items-center justify-between">
        <h1 className="text-xl md:text-4xl font-bold">Payments</h1>

        <Button
          onClick={() => setToggleResponsive(!toggleResponsive)}
          variant="ghost"
          type="button"
          className="block md:hidden text-white"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden md:block">
            <UserIcon className="h-8 w-8 md:h-10 md:w-10 bg-zinc-50 text-zinc-700 rounded-full" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logOutUser}>Deslogar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {toggleResponsive && (
        <div className="flex-shrink-0 w-full  text-white ">
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
      )}
    </header>
  );
}
