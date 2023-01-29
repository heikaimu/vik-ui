<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:02:14
 * @FilePath: /viking-ui/packages/components/src/col/Col.vue
-->
<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { colProps } from './types'
export default defineComponent({
  name: 'VikCol',
  props: colProps,
  setup(props) {
    const gutter = inject('gutter') as number

    const colStyle = computed(() => {
      return {
        width: `${100 / 12 * props.span}%`,
        padding: `${gutter / 2}px`,
      }
    })

    return {
      colStyle,
    }
  },
})
</script>

<template>
  <div class="viking-col" :style="colStyle">
    <slot />
  </div>
</template>
