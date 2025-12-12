import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const schema = z.object({ email: z.string().email(), password: z.string().min(6) });

export default function LoginPage() {
const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });
const auth = useAuth();
const router = useRouter();

async function onSubmit(data) {
try {
await auth.login(data);
router.push("/dashboard");
} catch (e) {
alert("Login failed: " + (e?.response?.data?.detail || e.message));
}
}

return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<div className="max-w-md w-full p-8 bg-white rounded shadow">
<h1 className="text-2xl font-bold mb-4">Login</h1>
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
<input {...register("email")} placeholder="Email" className="input" />
<input {...register("password")} type="password" placeholder="Password" className="input" />
<div className="flex justify-between items-center">
<button type="submit" className="btn">Login</button>
<Link href="/register" className="text-sm text-blue-600">Create account</Link>
</div>
</form>
</div>
</div>
);
}
