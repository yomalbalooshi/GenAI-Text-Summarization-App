import axios from 'axios'

export const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const Headers = { 'x-api-key': import.meta.env.VITE_API_ACCESS_KEY }

const Client = axios.create({ baseURL: BASE_URL, headers: Headers })

export default Client
