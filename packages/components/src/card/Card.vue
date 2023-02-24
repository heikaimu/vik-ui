<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-22 16:19:25
 * @FilePath: /viking-ui/packages/components/src/card/Card.vue
-->
<script lang="ts">
import { computed, defineComponent } from 'vue'
import Icon from '../icon/Icon.vue'
import { cardProps } from './types'
export default defineComponent({
  name: 'VikCard',
  components: {
    Icon,
  },
  props: cardProps,
  setup(props, ctx) {
    const ratioStyle = computed(() => {
      return {
        'padding-bottom': `${props.ratio as number * 100}%`,
        'border-radius': props.radius,
      }
    })

    const cardClass = computed(() => {
      return {
        'viking-card--shadow': props.shadow,
        'viking-card--border': props.border,
        'viking-card--active': props.active,
      }
    })

    const cardStyle = computed(() => {
      return {
        'border-radius': props.radius,
      }
    })

    const handleClose = () => {
      ctx.emit('close')
    }

    return {
      ratioStyle,
      cardClass,
      cardStyle,
      handleClose,
    }
  },
})
</script>

<template>
  <div class="viking-card" :class="cardClass" :style="cardStyle">
    <div v-if="closable" class="viking-card__close" @click.stop="handleClose">
      <Icon name="close-bold" />
    </div>
    <div v-if="active" class="viking-card__active">
      <Icon name="select-bold" />
    </div>
    <div v-if="ratio === 'auto'" class="viking-card__cover">
      <img :src="src" alt="">
    </div>
    <div v-else class="ratio-image" :style="ratioStyle">
      <div class="ratio-image__box">
        <img class="ratio-image__source" :style="{ objectFit: fit }" :src="src" alt="">
      </div>
    </div>
    <div class="viking-card__info">
      <p v-if="title" class="viking-card__title" :class="{ 'viking-card__title--omits2': omits2 }">
        {{ title }}
      </p>
      <slot />
    </div>
  </div>
</template>
