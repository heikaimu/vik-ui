/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 17:01:31
 * @FilePath: /viking-ui/packages/components/src/tab/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const tabProps = {
  activeName: {
    type: String,
    default: '',
  },
}

export type TabProps = ExtractPropTypes<typeof tabProps>
