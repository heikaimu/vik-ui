<!--
 * @Date: 2022-11-10 15:49:45
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-23 13:12:14
 * @FilePath: /viking-ui/packages/components/src/container/Container.vue
-->
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { containerProps } from './types'

export default defineComponent({
  name: 'VikContainer',
  props: containerProps,
  setup(props) {
    const containerClass = computed(() => {
      return {
        'viking-container--border': props.border,
        'viking-container--shadow': props.shadow,
      }
    })

    const containerStyle = computed(() => {
      return {
        // width: `${props.width}px`,
        // height: `${props.height}px`,
        backgroundColor: props.backgroundColor,
        // borderRadius: `${props.borderRadius}px`,
      }
    })

    return {
      containerClass,
      containerStyle,
    }
  },
})
</script>

<template>
  <div class="viking-container" :class="containerClass" :style="containerStyle">
    <div class="viking-container__header">
      <slot name="header" />
    </div>
    <div class="viking-container__main">
      <slot name="main" />
    </div>
    <div class="viking-container__footer">
      <slot name="footer" />
    </div>
    <transition name="loading-fade">
      <div v-if="loading" class="viking-container__loading">
        <img :src="loadingGif" alt="">
      </div>
    </transition>
  </div>
</template>
