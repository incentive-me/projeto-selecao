"use client";

// IMPORTS
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// SERVICES
import { getUserCookie } from "@/services/session";

// COMPONENTS
import LayoutLogin from "@/components/app/login";
import { LoaderCircleIcon } from "lucide-react";

export default function Home() {
  const { push } = useRouter();
  const userId = getUserCookie();

  useEffect(() => {
    if (userId) {
      push("/payment");
    }
  }, [userId, push]);

  if (userId)
    return (
      <div className="flex h-screen justify-center items-center">
        <LoaderCircleIcon className="h-16 w-16 text-zic-700 animate-spin" />
      </div>
    );

  return <LayoutLogin />;
}
