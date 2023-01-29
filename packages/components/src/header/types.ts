/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 15:44:57
 * @FilePath: /viking-ui/packages/components/src/header/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const headerProps = {
  title: {
    type: String,
  },
  sub: {
    type: String,
  },
  iconName: {
    type: String,
    default: 'close-bold',
  },
}

export type HeaderProps = ExtractPropTypes<typeof headerProps>
