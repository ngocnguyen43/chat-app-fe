import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const configuration: UserConfig = {
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      external: ['./test/*', "react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          'react-dom': "ReactDOM"
        }
      }
    },
  },
};

export default configuration;
