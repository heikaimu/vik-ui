/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-07-18 13:59:47
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
  showFileStack: {
    type: Boolean,
    default: false
  }
}

export type FileSelectProps = ExtractPropTypes<typeof fileSelectProps>
