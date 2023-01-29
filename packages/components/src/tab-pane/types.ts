/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 17:23:50
 * @FilePath: /viking-ui/packages/components/src/tab-pane/types.ts
 */
import type { ExtractPropTypes, Ref } from 'vue'

export const tabPaneProps = {
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
}

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export type ChangeTabNameFun = (val: string) => void

export type CurrentName = Ref<string>
