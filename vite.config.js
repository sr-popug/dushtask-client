import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		'process.env': {},
	},
	  server: {
    origin: 'http://5.35.90.111:8080',
  },
})
