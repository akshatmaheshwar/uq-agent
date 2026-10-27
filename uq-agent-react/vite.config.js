import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// manifest.json and icons/ live in public/, which Vite copies into dist/ automatically.
// The content script is not imported by the popup, so it is copied into dist/ as-is.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-content-script',
      async closeBundle() {
        await fs.mkdir('dist', { recursive: true });
        await fs.copyFile('src/contentScript.js', 'dist/contentScript.js');
      }
    }
  ],
  build: {
    rollupOptions: {
      input: { main: fileURLToPath(new URL('./index.html', import.meta.url)) }
    }
  }
});
