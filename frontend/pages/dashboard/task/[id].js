import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";

export default function TaskDetail() {
const router = useRouter();
const { id } = router.query;
const { user, loading } = useAuth();

const [task, setTask] = useState(null);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [completed, setCompleted] = useState(false);
const [saving, setSaving] = useState(false);

useEffect(() => {
if (!loading && !user) router.push("/login");
}, [loading, user]);

useEffect(() => {
if (!id) return;
load();
}, [id]);

async function load() {
try {
const res = await api.get(`/tasks/${id}`);
setTask(res.data);
setTitle(res.data.title || "");
setDescription(res.data.description || "");
setCompleted(Boolean(res.data.completed));
} catch (err) {
console.error("Load failed:", err);
alert("Load failed: " + (err?.response?.data ? JSON.stringify(err.response.data) : err.message));
}
}

async function save() {
if (!id) return alert("Missing task id");
setSaving(true);

try {
const payload = { title, description, completed };
console.log("PUT payload:", payload);
const res = await api.put(`/tasks/${id}`, payload);
console.log("Save success:", res);
alert("Saved");
router.push("/dashboard");
} catch (err) {
console.error("Save failed:", err);
const status = err?.response?.status;
const data = err?.response?.data;
alert(
"Save failed\n\nStatus: " +
(status || "no response") +
"\n\nBody: " +
(data ? JSON.stringify(data) : (err.message || "unknown"))
);
} finally {
setSaving(false);
}
}

if (!task) return <div className="p-6">Loading...</div>;

return (
<div className="min-h-screen p-6 bg-gray-50">
<div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-bold mb-4">Edit Task</h2>

<div className="space-y-3">
<input
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Title"
className="input"
/>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Description"
className="input h-32"
/>
<label className="flex items-center gap-2">
<input
type="checkbox"
checked={completed}
onChange={(e) => setCompleted(e.target.checked)}
/>
<span>Completed</span>
</label>

<div className="flex gap-2">
<button onClick={save} className="btn" disabled={saving}>
{saving ? "Saving..." : "Save"}
</button>
<button onClick={() => router.push("/dashboard")}>Cancel</button>
</div>
</div>
</div>
</div>
);
}
