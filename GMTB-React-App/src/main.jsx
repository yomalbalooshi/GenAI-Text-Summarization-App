import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PrimeReactProvider } from 'primereact/api'
const root = createRoot(document.getElementById('root'))

root.render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>
)
