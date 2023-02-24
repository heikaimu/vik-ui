<!--
 * @Date: 2023-02-17 11:13:13
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-17 13:16:30
 * @FilePath: /viking-ui/packages/components/src/box/Box.vue
-->
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { boxProps } from './types'

export default defineComponent({
  props: boxProps,
  setup(props) {
    const boxStyle = computed(() => {
      return {
        padding: `${props.pd}px`,
        paddingTop: `${props.pt || props.pd}px`,
        paddingRight: `${props.pr || props.pd}px`,
        paddingBottom: `${props.pb || props.pd}px`,
        paddingLeft: `${props.pl || props.pd}px`,
      }
    })

    return {
      boxStyle,
    }
  },
})
</script>

<template>
  <div :style="boxStyle">
    <slot />
  </div>
</template>

<style scoped>

</style>
