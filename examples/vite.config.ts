/*
 * @Date: 2022-10-28 10:14:33
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-10-28 10:23:25
 * @FilePath: /viking-ui/examples/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins:[vue()],
    server: {
        port: 3009,
        open: true
    }
})
