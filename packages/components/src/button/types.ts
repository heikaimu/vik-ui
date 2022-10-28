/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-10-28 10:24:46
 * @FilePath: /viking-ui/packages/components/src/button/types.ts
 */
import { ExtractPropTypes } from 'vue'


export const ButtonType = ['default', 'primary', 'success', 'warning', 'danger']

export const ButtonSize = ['large', 'normal', 'small', 'mini'];


export const buttonProps = {
  type: {
    type: String,
    values: ButtonType
  },
  size: {
    type: String,
    values: ButtonSize
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
