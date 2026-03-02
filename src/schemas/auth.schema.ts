import { z } from "zod";

export const AuthSchema = z.object({
  email: z.email(),
  password: z.string().nonempty("Mật khẩu không được để trống!"),
});
