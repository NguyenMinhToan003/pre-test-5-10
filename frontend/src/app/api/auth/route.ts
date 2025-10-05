import { LoginResponseType } from "@/types/auth";


export async function POST(request: Request) {
  const body = await request.json() as LoginResponseType;
  return Response.json(
    {
      accessToken: body.accessToken,
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `accessToken=${body.accessToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`,
      }
    }
  )
}
