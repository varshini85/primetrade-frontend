import { z } from 'zod'
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) })
export const registerSchema = z.object({ full_name: z.string().optional(), email: z.string().email(), password: z.string().min(6) })