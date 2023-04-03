/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-29 11:01:45
 * @FilePath: /viking-ui/packages/components/src/uploader/types.ts
 */
import type { ExtractPropTypes, PropType } from 'vue'

export interface FileItem {
  id?: string
  name: string
  file?: Blob
  url?: string
}

export interface UploadRes {
  id?: string
  url: string
  name: string
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
