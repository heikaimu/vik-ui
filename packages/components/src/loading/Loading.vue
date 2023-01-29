<!--
 * @Date: 2022-11-10 15:07:49
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:11:50
 * @FilePath: /viking-ui/packages/components/src/loading/Loading.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
import { loadingProps } from './types'

export default defineComponent({
  name: 'VikLoading',
  props: loadingProps,
  setup(props, ctx) {
    const handleClose = () => {
      ctx.emit('close')
    }

    return {
      handleClose,
    }
  },
})
</script>

<template>
  <div class="viking-loading">
    <div class="viking-loading__icon">
      <!-- SPINNING SQUARES -->
      <div class="spinner-box">
        <div class="configure-border-1">
          <div class="configure-core" />
        </div>
        <div class="configure-border-2">
          <div class="configure-core" />
        </div>
      </div>
    </div>
    <p v-if="text" class="viking-loading__text">
      {{ text }}
    </p>
  </div>
</template>
