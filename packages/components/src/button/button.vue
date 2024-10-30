<!--
 * @Date: 2022-10-28 10:21:23
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-10 13:25:19
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
  setup(props, ctx) {
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

    // 图标尺寸
    const iconSizeMap: Record<string, number> = {
      large: 18,
      small: 14,
      mini: 12,
    }
    const iconSize = computed(() => {
      const sizeStr = props.size as string
      const sizeValue = iconSizeMap[sizeStr]
      return {
        fontSize: `${(sizeValue || 16) * 1.6}px`,
      }
    })

    const handleClick = () => {
      if (props.disabled)
        return

      ctx.emit('click')
    }

    return {
      styleClass,
      iconFont,
      iconSize,
      handleClick,
    }
  },
})
</script>

<template>
  <button class="vik-button" :class="styleClass" :disabled="disabled">
    <Icon v-if="iconFont.iconName && iconFont.position !== 'right'" :name="iconFont.iconName" class="vik-button__icon" :style="iconSize" />
    <span class="vik-button__text"><slot /></span>
    <Icon v-if="iconFont.position === 'right' && iconFont.iconName" :name="iconFont.iconName" class="vik-button__icon" :style="iconSize" />
  </button>
</template>
