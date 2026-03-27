import {email, z} from "zod";
import { requiredString } from "../utils/util";

export const registerSchema = z.object({
    email: email(),
    displayName: requiredString('Display Name'),
    password: requiredString('Password')
});

export type RegisterSchema = z.input<typeof registerSchema>;