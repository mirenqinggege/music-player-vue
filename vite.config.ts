import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import electron, {Configuration} from 'vite-plugin-electron'
import electronRenderer from 'vite-plugin-electron-renderer'

const srcPath = resolve(__dirname, 'src')
// https://vitejs.dev/config/

const electronConfig: Configuration[] = [
  {entry: './electron/main.ts'},
  {entry: './electron/preload.ts'},
]

export default defineConfig({
  plugins: [vue(), electron(electronConfig), electronRenderer()],
  resolve: {
    alias: {
      '@/': `${srcPath}/`
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        math: 'always',
        globalVars: {
          mainColor: 'red'
        }
      }
    }
  },
  optimizeDeps: {}
})
