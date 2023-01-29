/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 16:35:18
 * @FilePath: /viking-ui/packages/components/src/row/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const rowProps = {
  gutter: {
    type: Number,
    default: 0,
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
}

export type RowProps = ExtractPropTypes<typeof rowProps>
