/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-17 13:16:10
 * @FilePath: /viking-ui/packages/components/src/box/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const boxProps = {
  pd: {
    type: Number,
    default: 0,
  },
  pt: {
    type: Number,
  },
  pr: {
    type: Number,
  },
  pb: {
    type: Number,
  },
  pl: {
    type: Number,
  },
}

export type BoxProps = ExtractPropTypes<typeof boxProps>
