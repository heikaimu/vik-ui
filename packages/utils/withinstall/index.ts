/*
 * @Date: 2022-11-04 15:35:31
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-07 13:19:40
 * @FilePath: /viking-ui/packages/utils/withinstall/index.ts
 */
import type { App, Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin
export default <T>(comp: T) => {
  (comp as SFCWithInstall<T>).install = (app: App) => {
    // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
    // 所以要加上这个条件
    const name = (comp as any).name || (comp as any).__name
    // 注册组件
    app.component(name, comp as SFCWithInstall<T>)
  }
  return comp as SFCWithInstall<T>
}
