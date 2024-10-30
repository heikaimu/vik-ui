/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-21 14:18:53
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
    default: 750,
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
  loadingGif: {
    type: String,
    default: 'https://cdn.shopifycdn.net/s/files/1/0343/0275/4948/files/01.gif',
  },
}

export type ContainerProps = ExtractPropTypes<typeof containerProps>
