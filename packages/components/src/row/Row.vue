<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:02:36
 * @FilePath: /viking-ui/packages/components/src/row/Row.vue
-->
<script lang="ts">
import { computed, defineComponent, provide } from 'vue'
import { rowProps } from './types'
export default defineComponent({
  name: 'VikRow',
  props: rowProps,
  setup(props) {
    provide('gutter', props.gutter)

    const gridStyle = computed(() => {
      return {
        padding: `${props.gutter / 2}px`,
        backgroundColor: props.backgroundColor,
      }
    })

    return {
      gridStyle,
    }
  },
})
</script>

<template>
  <div class="viking-grid" :style="gridStyle">
    <slot />
  </div>
</template>
