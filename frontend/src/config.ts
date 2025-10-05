import z from "zod";

const schemaConfig = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string().url(),
})
export default function envConfig() {
  const parsed = schemaConfig.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  })
  if (!parsed.success) {
    console.error("Lỗi biến môi trường", parsed.error.format())
    throw new Error("Lỗi biến môi trường")
  }
  return parsed.data
}
