import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server:{
    proxy:{
      "/api":{
        target:"https://mern-yap-backend.onrender.com",
        changeOrigin: true,        // <-- this helps with CORS
        secure: false,  
      }
    }
  }
})
