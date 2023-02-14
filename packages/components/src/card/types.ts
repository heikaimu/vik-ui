/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-14 13:25:05
 * @FilePath: /viking-ui/packages/components/src/card/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const cardProps = {
  src: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  radius: {
    type: String,
    default: '4px',
  },
  shadow: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false,
  },
  ratio: {
    type: [Number, String],
    default: 'auto',
  },
  active: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
}

export type CardProps = ExtractPropTypes<typeof cardProps>
