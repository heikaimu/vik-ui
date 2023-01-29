/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-23 16:58:48
 * @FilePath: /viking-ui/packages/components/src/cropper/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const cropperProps = {
  url: {
    type: String,
    default: '',
  },
  // 裁剪比例
  ratio: {
    type: Number,
    default: undefined,
  },
}

export type CropperProps = ExtractPropTypes<typeof cropperProps>
