<!--
 * @Date: 2022-11-07 16:58:46
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:10:35
 * @FilePath: /viking-ui/packages/components/src/icon/Icon.vue
-->
<script lang="ts">
import './font/iconfont.js'
import { computed, defineComponent } from 'vue'
import { iconProps } from './types'

export default defineComponent({
  name: 'VikIcon',
  props: iconProps,
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.name}`
    })
    const styleDot = computed(() => {
      return {
        'vik-icon__info--dot': props.dot && !props.badge,
      }
    })
    const badge = computed(() => {
      return props.badge
    })
    return {
      iconName,
      styleDot,
      badge,
    }
  },
})
</script>

<template>
  <div class="vik-icon">
    <svg class="vik-icon__icon" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
    <span v-if="dot" class="vik-icon__info" :class="styleDot">
      {{ badge }}
    </span>
  </div>
</template>
