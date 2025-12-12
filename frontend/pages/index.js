
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";

export default function Home() {
const router = useRouter();
const { user, loading } = useAuth();
const [status, setStatus] = useState("");

useEffect(() => {
if (!loading && user) {
router.push("/dashboard");
}
}, [loading, user]);

return (
<div className="min-h-screen flex items-center justify-center bg-gray-50">
<div className="max-w-md w-full text-center p-8 bg-white rounded shadow">
<h1 className="text-2xl font-bold mb-4">Scalable Web App — Frontend</h1>
<p className="mb-6">Login or register to see the dashboard.</p>
<div className="flex gap-4 justify-center">
<Link href="/login" className="btn">Login</Link>
<Link href="/register" className="btn">Register</Link>
</div>
<div className="mt-4 text-sm text-gray-600">{status}</div>
</div>
</div>
);
}
