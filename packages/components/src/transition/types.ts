import type { PropType } from 'vue'
/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-24 11:29:24
 * @FilePath: /viking-ui/packages/components/src/transition/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export const nameType = ['fade', 'slide-left', 'slide-right', 'slide-up', 'slide-down']
export const modeType = ['out-in', 'default', 'in-out', undefined]
type Mode = 'out-in' | 'default' | 'in-out' | undefined

export const transitionProps = {
  name: {
    type: String,
    validator(value: string) {
      return nameType.includes(value)
    },
    default: 'fade',
  },
  mode: {
    type: String as PropType<Mode>,
    validator(value: Mode) {
      return modeType.includes(value)
    },
    default: 'default',
  },
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>
