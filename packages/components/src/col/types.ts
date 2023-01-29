/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 16:45:46
 * @FilePath: /viking-ui/packages/components/src/col/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const colProps = {
  span: {
    type: Number,
    default: 12,
  },
}

export type ColProps = ExtractPropTypes<typeof colProps>
