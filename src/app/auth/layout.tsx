import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Acesso | Registro",
    description: "Sistema de pagamentos | Acesso | Registro",
  };

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return <div>
      {children}
  </div>;
};

export default AuthLayout;
