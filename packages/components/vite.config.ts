/*
 * @Date: 2022-10-28 10:27:29
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 14:13:16
 * @FilePath: /viking-ui/packages/components/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig(
  {
    build: {
      outDir: 'lib',
      lib: {
        entry: './index.ts',
        name: 'VikUI',
        fileName: (format: any) => `vik-ui.${format}.js`,
        formats: ['cjs', 'es'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    plugins: [
      vue(),
      dts({
        tsConfigFilePath: './tsconfig.json',
      }),
    ],
  },
)
