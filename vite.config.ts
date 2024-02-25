import { UserConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const configuration: UserConfig = {
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      external: ['./test/*'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return Buffer.from(id.toString().split('node_modules/')[1].split('/')[0].toString()).toString('base64');
          }
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    modulePreload: false,
    minify: true,
  },
  preview: {
    port: 5173,
  },
};

export default configuration;
