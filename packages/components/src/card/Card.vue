<!--
 * @Date: 2022-11-10 16:34:21
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-14 13:28:07
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
  setup(props) {
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

    return {
      ratioStyle,
      cardClass,
      cardStyle,
    }
  },
})
</script>

<template>
  <div class="viking-card" :class="cardClass" :style="cardStyle">
    <div v-if="closable" class="viking-card__close">
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
        <img class="ratio-image__source" :src="src" alt="">
      </div>
    </div>
    <div class="viking-card__info">
      <p v-if="title" class="viking-card__title">
        {{ title }}
      </p>
      <slot />
    </div>
  </div>
</template>
