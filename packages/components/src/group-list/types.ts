/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-24 10:26:54
 * @FilePath: /viking-ui/packages/components/src/group-list/types.ts
 */
import type { ExtractPropTypes, PropType } from 'vue'

export const groupListProps = {
  data: {
    type: Array,
    default: () => [],
  },
  props: {
    type: Object as PropType<PropsType>,
    default: () => ({
      children: 'children',
      label: 'label',
      id: 'id',
    }),
  },
  leftWidth: {
    type: Number,
    default: 80,
  },
  activeName: {
    type: String,
  },
  posKey: {
    type: String,
  },
  posValue: {
    type: [String, Number],
  },
  pos: {
    type: Number,
    default: 0,
  },
  cardHeight: {
    type: Number,
    default: 200,
  },
  colSpace: {
    type: Number,
    default: 10,
  },
  rowSpace: {
    type: Number,
    default: 10,
  },
}

export type GroupListProps = ExtractPropTypes<typeof groupListProps>

export interface Navigation {
  title: string
  id: string
  count: number
  start: number
  end: number
}

export interface PropsType {
  label?: string
  id?: string
  children?: string
}

export const navigationProps = {
  list: {
    type: Array as PropType<Navigation[]>,
    default: () => [],
  },
  value: {
    type: String,
    deafult: '',
  },
}
