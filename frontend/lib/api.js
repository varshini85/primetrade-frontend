import axios from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'


const api = axios.create({ baseURL: API_URL, headers: { 'Content-Type': 'application/json' } })


api.interceptors.request.use(cfg => {
if (typeof window === 'undefined') return cfg
const token = localStorage.getItem('token')
if (token) cfg.headers.Authorization = `Bearer ${token}`
return cfg
})


export default api