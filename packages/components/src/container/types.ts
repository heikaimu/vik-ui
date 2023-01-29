/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-10 15:58:27
 * @FilePath: /viking-ui/packages/components/src/container/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const containerProps = {
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 700,
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
  borderRadius: {
    type: Number,
    default: 4,
  },
  border: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
}

export type ContainerProps = ExtractPropTypes<typeof containerProps>
