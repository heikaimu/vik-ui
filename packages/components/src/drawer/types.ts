/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-20 11:16:02
 * @FilePath: /viking-ui/packages/components/src/divider/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const drawerProps = {
  visible: {
    type: Boolean,
    default: false,
  },
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
