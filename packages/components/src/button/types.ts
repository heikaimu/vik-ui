/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-15 13:20:50
 * @FilePath: /viking-ui/packages/components/src/button/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const ButtonType = ['primary', 'success', 'warning', 'danger', 'info', '']

export const ButtonSize = ['large', 'normal', 'small', 'mini']

export const buttonProps = {
  type: {
    type: String,
    validator(value: string) {
      return ButtonType.includes(value)
    },
  },
  size: {
    type: String,
    validator(value: string) {
      return ButtonSize.includes(value)
    },
  },
  round: Boolean,
  disabled: Boolean,
  fill: Boolean,
  icon: String,
  iconPosition: String,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
