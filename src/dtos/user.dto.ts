import z, { date } from "zod";
import { UserSchema } from "../types/user.type";

export const CreateUserDTO = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  username: true,
  password: true,
})
  .extend(
    //add new attribute
    {
      confirmPassword: z.string().min(6),
    }
  )
  .refine(
    // extra validation for confimPassword
    (data) => data.password === data.confirmPassword,
    {
      message: "Password do not match",
      path: ["confimPassword"],
    }
  );
export type CreateUserDTO = z.infer<typeof CreateUserDTO>;
