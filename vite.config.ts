import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const base = process.env.NODE_ENV === 'production' ? '/silence/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
    base: base,
    plugins: [vue()]
})
