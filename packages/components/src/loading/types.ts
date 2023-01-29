/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 16:25:43
 * @FilePath: /viking-ui/packages/components/src/loading/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const loadingProps = {
  text: {
    type: String,
  },
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
