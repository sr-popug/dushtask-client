import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			less: {
				math: 'always',
				relativeUrls: true,
				javascriptEnabled: true,
			},
		},
	},
	define: {
		'process.env': {},
	},
	server: {
		port: 3002,
	},
})
