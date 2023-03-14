<!--
 * @Date: 2023-02-17 11:13:13
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-14 15:27:43
 * @FilePath: /viking-ui/packages/components/src/alert/Alert.vue
-->
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const visible = ref(false)
    let timer: any

    const show = (duration = 3000) => {
      visible.value = true
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        visible.value = false
      }, duration)
    }

    return {
      visible,
      show,
    }
  },
})
</script>

<template>
  <div class="vik-alert">
    <transition name="alert-slide">
      <div v-if="visible" class="vik-alert__content">
        <p class="vik-alert__text">
          <slot />
        </p>
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>
