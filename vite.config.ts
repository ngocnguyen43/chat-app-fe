// let config
// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'development') {
//   config = require('./vite.dev.config').default
// } else {
//   config = require('./vite.prod.config').default
// }

// export default config
import { UserConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
const configuration: UserConfig = {
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      external: './test/*',
    },
  },
};

export default configuration;
