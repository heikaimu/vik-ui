<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:05:23
 * @FilePath: /viking-ui/packages/components/src/divider/Divider.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
import { drawerProps } from './types'
export default defineComponent({
  name: 'VikDrawer',
  props: drawerProps,
  setup(props, ctx) {
    function handleClose() {
      ctx.emit('update:visible', false)
    }

    return {
      handleClose,
    }
  },
})
</script>

<template>
  <div class="viking-drawer">
    <div v-if="visible" class="viking-drawer__blank" />
    <div v-if="visible" class="viking-drawer__content">
      <div class="viking-drawer__content-item">
        <slot />
      </div>
      <div class="viking-drawer__content-item">
        <button class="viking-drawer__button viking-drawer__button--bold" @click="handleClose">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
