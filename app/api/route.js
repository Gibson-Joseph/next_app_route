import { NextResponse } from "next/server";
import { headers } from "next/headers";
export async function GET(request) {
  const headersList = headers();
  const referer = headersList.get("referer");
//   console.log("--------- request has been sent ---------");
  console.log("referer", referer);
  return NextResponse.json(
    [{ id: 1, firstName: "Gibson", lastName: "Joseph" }],
    {
      status: 200,
      headers: {
        referer: referer,
      },
    }
  );
}
