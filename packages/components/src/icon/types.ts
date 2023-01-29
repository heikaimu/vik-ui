/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 15:50:19
 * @FilePath: /viking-ui/packages/components/src/icon/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const iconProps = {
  name: {
    type: String,
  },
  dot: {
    type: Boolean,
  },
  badge: {
    type: String,
  },
}

export type IconProps = ExtractPropTypes<typeof iconProps>
