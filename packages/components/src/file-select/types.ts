/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-06 13:08:41
 * @FilePath: /viking-ui/packages/components/src/file-select/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const fileSelectProps = {
  text1: {
    type: String,
    default: 'Choose from your album',
  },
  text2: {
    type: String,
    default: 'Take A Photo',
  },
  text3: {
    type: String,
    default: 'Choose from Online Services',
  },
}

export type FileSelectProps = ExtractPropTypes<typeof fileSelectProps>
