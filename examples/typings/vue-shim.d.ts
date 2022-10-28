/*
 * @Date: 2022-10-28 10:15:25
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-10-28 10:15:28
 * @FilePath: /viking-ui/examples/typings/vue-shim.d.ts
 */
declare module '*.vue' {
  import type { DefineComponent } from "vue";
  const component:DefineComponent<{},{},any>
}
