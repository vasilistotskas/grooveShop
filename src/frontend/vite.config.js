import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
    plugins: [vue()],
    build: {
        outDir: './dist/',
        assetsDir: './backend/static/js'
    },
    server: {
        port: 8011,
        host: true
    },
    define: {
        'process.env': {}
    }
});
