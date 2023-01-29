<!--
 * @Date: 2022-11-10 16:57:28
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:13:12
 * @FilePath: /viking-ui/packages/components/src/tab/Tab.vue
-->
<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { tabProps } from './types'

export default defineComponent({
  name: 'VikTab',
  props: tabProps,
  setup(props, ctx) {
    const currentName = ref(props.activeName)

    const changeTabName = (val: string) => {
      currentName.value = val
      ctx.emit('update:activeName', val)
    }

    provide('changeTabName', changeTabName)

    provide('currentName', currentName)

    return {}
  },
})
</script>

<template>
  <div class="viking-tabs">
    <slot />
  </div>
</template>
