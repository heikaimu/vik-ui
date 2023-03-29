<!--
 * @Date: 2023-03-24 11:12:59
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-24 11:17:10
 * @FilePath: /viking-ui/packages/components/src/transition/Transition.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
import { transitionProps } from './types'
export default defineComponent({
  props: transitionProps,
  setup() {
    return {}
  },
})
</script>

<template>
  <transition :name="name" :mode="mode" />
</template>

<style scoped>

</style>
