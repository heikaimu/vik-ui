/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-28 15:12:37
 * @FilePath: /viking-ui/packages/components/src/uploader/types.ts
 */
import type { ExtractPropTypes, PropType } from 'vue'

export interface FileItem {
  name: string
  file: Blob
}

export interface UploadRes {
  [key: string]: string
}

export interface UploadFunParams {
  name: string
  file: Blob
  onSuccess: (val: string) => void
  onError: () => void
}

export const uploaderProps = {
  website: {
    type: String,
    deafult: 'unknown',
  },
  data: {
    type: Array as PropType<FileItem[]>,
    default: () => [],
  },
  gifUrl: {
    type: String,
    default: 'https://cdn.shopifycdn.net/s/files/1/0343/0275/4948/files/01.gif',
  },
  barColor: {
    type: String,
    default: '#FFBA00',
  },
}

export type UploaderProps = ExtractPropTypes<typeof uploaderProps>
