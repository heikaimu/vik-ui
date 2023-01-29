<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:05:23
 * @FilePath: /viking-ui/packages/components/src/divider/Divider.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'VikDivider',
  setup(props) {
    return {

    }
  },
})
</script>

<template>
  <div class="viking-divider">
    <div class="viking-divider__text">
      <slot />
    </div>
  </div>
</template>
