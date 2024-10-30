<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:05:23
 * @FilePath: /viking-ui/packages/components/src/divider/Divider.vue
-->
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { drawerProps } from './types'
export default defineComponent({
  name: 'VikDrawer',
  props: drawerProps,
  setup(props, ctx) {
    function handleClose() {
      ctx.emit('update:visible', false)
      ctx.emit('close')
    }

    const drawerVisible = ref(false)
    let timer: any

    watch(() => props.visible, (val) => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      if (val) {
        drawerVisible.value = val
      }
      else {
        timer = setTimeout(() => {
          drawerVisible.value = val
        }, 300)
      }
    }, {
      immediate: true,
    })

    return {
      drawerVisible,
      handleClose,
    }
  },
})
</script>

<template>
  <div class="viking-drawer" :class="{ 'viking-drawer--full': drawerVisible }">
    <Transition name="drawer-fade">
      <div v-if="visible" class="viking-drawer__blank" />
    </Transition>
    <Transition name="drawer-slide-down">
      <div v-if="visible" class="viking-drawer__content">
        <div class="viking-drawer__content-item">
          <slot />
        </div>
        <div class="viking-drawer__content-item">
          <button class="viking-drawer__button viking-drawer__button--bold" @click="handleClose">
            {{ cancelText }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
