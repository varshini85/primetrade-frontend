import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const schema = z.object({ full_name: z.string().optional(), email: z.string().email(), password: z.string().min(6) });

export default function Register() {
const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
const auth = useAuth();
const router = useRouter();

async function onSubmit(data) {
try {
await auth.register(data);
router.push("/dashboard");
} catch (e) {
alert("Register failed: " + (e?.response?.data?.detail || e.message));
}
}

return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<div className="max-w-md w-full p-8 bg-white rounded shadow">
<h1 className="text-2xl font-bold mb-4">Register</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
<input {...register("full_name")} placeholder="Full name (optional)" className="input" />
<input {...register("email")} placeholder="Email" className="input" />
<input {...register("password")} type="password" placeholder="Password" className="input" />
<div className="flex justify-between items-center">
<button type="submit" className="btn">Register</button>
<Link href="/login" className="text-sm text-blue-600">Already have an account?</Link>
</div>
</form>
</div>
</div>
);
}
