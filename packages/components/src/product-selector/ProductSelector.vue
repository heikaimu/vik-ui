<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-08-23 17:41:29
 * @FilePath: /viking-ui/packages/components/src/product-selector/ProductSelector.vue
-->
<script lang="ts">
import { defineComponent, onUpdated, ref, watch } from 'vue'
import VikRow from '../row/Row.vue'
import VikCol from '../col/Col.vue'
import Card from '../card/Card.vue'
import Icon from '../icon/Icon.vue'
import type { Product, SelectProduct } from './types'
import { productSelectorProps } from './types'
export default defineComponent({
  name: 'VikProductSelector',
  components: {
    VikRow,
    VikCol,
    Card,
    Icon,
  },
  props: productSelectorProps,

  setup(props, ctx) {
    const selection = ref<string[]>([])

    watch(() => props.data, (val) => {
      selection.value = val.map((item: SelectProduct) => item.uuid)
    }, {
      immediate: true,
    })

    function handleClick(item: Product) {
      if (isExistId(item.uuid)) {
        const index = selection.value.findIndex(id => id === item.uuid)
        selection.value.splice(index, 1)
      }
      else {
        selection.value.push(item.uuid)
      }

      update()
    }

    function update() {
      const newList = selection.value.map((uuid) => {
        const curProduct: Product = props.products.find(item => item.uuid === uuid) as Product
        if (curProduct) {
          return {
            ...curProduct,
          }
        }
        return undefined
      }).filter(item => item)
      ctx.emit('update:data', newList)
    }

    function isExistId(id: string) {
      return selection.value.includes(id)
    }

    function isActive(item: Product) {
      return isExistId(item.uuid)
    }

    return {
      handleClick,
      isActive,
    }
  },
})
</script>

<template>
  <div class="viking-product-selector">
    <VikRow :gutter="10">
      <VikCol v-for="item in products" :key="item.uuid" :span="6">
        <div class="card-wrapper" @click="handleClick(item)">
          <Card :ratio="1" shadow :src="item.url" :title="item.title" sub="" v-bind="$attrs">
            <div class="card-wrapper__bottom">
              <p class="card-wrapper__bottom--price">
                {{ symbol }} {{ item.price }}
              </p>
              <Icon class="float-svg" name="tubiaozhizuomoban-1" />
            </div>
          </Card>
          <div class="card-wrapper__float" :class="{ active: isActive(item) }">
            <Icon class="float-svg" name="select-bold" />
          </div>
        </div>
      </VikCol>
    </VikRow>
  </div>
</template>
