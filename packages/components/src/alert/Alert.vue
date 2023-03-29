<!--
 * @Date: 2023-02-17 11:13:13
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-16 10:14:28
 * @FilePath: /viking-ui/packages/components/src/alert/Alert.vue
-->
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const msg = ref('')
    const visible = ref(false)
    let timer: any

    const show = (val: string, duration?: number) => {
      msg.value = val
      visible.value = true
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      timer = setTimeout(() => {
        msg.value = ''
        visible.value = false
      }, duration || 3000)
    }

    return {
      msg,
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
          {{ msg }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style scoped>

</style>
