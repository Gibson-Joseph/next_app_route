import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request) {
  console.log("--------- request ---------");
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("----- token ----", token);
  return NextResponse.json([{ id: 42, firstName: "Vijay", lastName: "T" }], {
    status: 200,
    headers: {
      "Set-Cookie": "token=ieuf89e8urbhr94hrb",
    },
  });
}
