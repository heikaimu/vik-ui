<!--
 * @Date: 2022-10-28 10:21:23
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:00:20
 * @FilePath: /viking-ui/packages/components/src/button/Button.vue
-->
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Icon from '../icon/Icon.vue'
import { buttonProps } from './types'
export default defineComponent({
  name: 'VikButton',
  components: { Icon },
  props: buttonProps,
  setup(props) {
    // 主样式
    const styleClass = computed(() => {
      return {
        [`vik-button--${props.type}`]: props.type,
        'is-round': props.round,
        'is-disabled': props.disabled,
        'is-fill': props.fill,
        [`vik-button--${props.size}`]: props.size,
      }
    })

    // 图标
    const iconFont = computed(() => {
      const iconName = props.icon
      const position = props.iconPosition
      return {
        iconName,
        position,
      }
    })

    return {
      styleClass,
      iconFont,
    }
  },
})
</script>

<template>
  <button class="vik-button" :class="styleClass">
    <Icon v-if="iconFont.iconName && iconFont.position !== 'right'" class="icon" :name="iconFont.iconName" />
    <slot />
    <Icon v-if="iconFont.position === 'right' && iconFont.iconName" class="icon" :name="iconFont.iconName" />
  </button>
</template>
