
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

export default function Dashboard() {
const router = useRouter();
const { user, loading, logout } = useAuth();

const [tasks, setTasks] = useState([]);
const [q, setQ] = useState("");

async function loadTasks() {
try {
const res = await api.get("/tasks", { params: { search: q } });
setTasks(res.data || []);
} catch (err) {
console.error("loadTasks error", err);
}
}

async function createTask() {
try {
const res = await api.post("/tasks", { title: "New task", description: "" });
setTasks((prev) => [res.data, ...prev]);
} catch (err) {
console.error("createTask error", err);
}
}

async function deleteTask(id) {
try {
await api.delete(`/tasks/${id}`);
setTasks((prev) => prev.filter((t) => t.id !== id));
} catch (err) {
console.error("deleteTask error", err);
}
}

useEffect(() => {
if (!loading && !user) {
router.push("/login");
}
}, [loading, user]);

useEffect(() => {
if (user) loadTasks();
}, [user]);

return (
<div className="min-h-screen p-6 bg-gray-50">
<div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
<div className="flex justify-between items-center">
<h2 className="text-2xl font-bold">Dashboard</h2>

<div>
<button className="mr-3" onClick={() => router.push("/")}>
Home
</button>
<button onClick={logout}>Logout</button>
</div>
</div>

<div className="mt-4 flex gap-2">
<input
value={q}
onChange={(e) => setQ(e.target.value)}
placeholder="Search"
className="input"
/>
<button onClick={loadTasks} className="btn">
Search
</button>
<button onClick={createTask} className="btn">
Create
</button>
</div>

<ul className="mt-6">
{tasks.map((t) => (
<li
key={t.id}
className="border rounded p-3 mb-3 flex justify-between items-center"
>
<div>
<div className="font-semibold">{t.title}</div>
<div className="text-sm text-gray-600">{t.description}</div>
</div>
<div className="flex gap-2">
<button onClick={() => router.push(`/dashboard/task/${t.id}`)}>
Edit
</button>
<button onClick={() => deleteTask(t.id)} className="text-red-600">
Delete
</button>
</div>
</li>
))}
</ul>
</div>
</div>
);
}
