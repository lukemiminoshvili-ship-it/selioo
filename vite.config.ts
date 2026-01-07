import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';

// __dirname-ის უფრო საიმედო ალტერნატივა
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: ['sitqvebis-t-amashi.onrender.com'] 
    },
    preview: {
      port: 10000,
      host: '0.0.0.0',
      allowedHosts: ['sitqvebis-t-amashi.onrender.com'] 
    },
    plugins: [react()],
    define: {
      // API Key-ს გადაცემის სამივე შესაძლო გზა, რომ ჩატბოტმა აუცილებლად დაინახოს
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        // პროექტის ძირეული საქაღალდის მითითება
        '@': path.resolve(__dirname, './src'),
      }
    }
  };
});
