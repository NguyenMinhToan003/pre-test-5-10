import z from "zod";

export const LoginSchema = z.object({
  username: z.string().email('Email không hợp lệ'),
  password: z.string().min(4, 'Mật khẩu phải có ít nhất 4 ký tự'),
})