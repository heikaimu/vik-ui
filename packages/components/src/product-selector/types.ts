import type { PropType } from 'vue'
/*
 * @Date: 2022-10-28 10:24:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-08-23 17:40:14
 * @FilePath: /viking-ui/packages/components/src/product-selector/types.ts
 */
import type { ExtractPropTypes } from 'vue'

export interface Product {
  uuid: string
  title: string
  url: string
  id: string
  hasText: boolean
  noPreview: boolean
  price: number
}

export interface SelectProduct {
  url: string
  uuid: string
  id: string
  hasText: boolean
}

export const productSelectorProps = {
  products: {
    type: Array as PropType<Product[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<SelectProduct[]>,
    default: () => [],
  },
  symbol: {
    type: String,
    default: '$',
  },
}

export type ProductSelectorProps = ExtractPropTypes<typeof productSelectorProps>
