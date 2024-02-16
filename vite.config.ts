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
    port: 5173
  }
};

export default configuration;
