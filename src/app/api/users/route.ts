import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await fetch("https://tan-wide-eyed-llama.cyclic.app", {
    method: "POST",
    body: JSON.stringify(request.body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ message: "Erro interno do servidor" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  const data = await res.json();
  console.log("data" + data);

  return NextResponse.json({ data });
}
