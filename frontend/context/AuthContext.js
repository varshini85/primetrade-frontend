import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
const [user, setUser] = useState(null)
const [loading, setLoading] = useState(true)
async function loadMe() {
const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
if (!token) { setLoading(false); return }
try {
const res = await api.get('/auth/me')
setUser(res.data)
} catch (e) {
console.error('me', e)
localStorage.removeItem('token')
setUser(null)
} finally { setLoading(false) }
}

useEffect(() => { loadMe() }, [])

async function login({ email, password }) {
const form = new URLSearchParams()
form.append('username', email)
form.append('password', password)
const res = await api.post('/auth/token', form.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
const token = res.data.access_token
localStorage.setItem('token', token)
await loadMe()
}

async function register(payload) {
await api.post('/auth/register', payload)
await login({ email: payload.email, password: payload.password })
}

function logout() {
localStorage.removeItem('token')
setUser(null)
}

return (
<AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
)
}
export const useAuth = () => useContext(AuthContext)