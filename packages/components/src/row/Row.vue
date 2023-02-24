<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-17 13:31:11
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
        marginLeft: `${-props.gutter / 2}px`,
        marginRight: `${-props.gutter / 2}px`,
        marginTop: `${-props.gutter / 2}px`,
        marginBottom: `${-props.gutter / 2}px`,
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
