<!--
 * @Date: 2022-11-10 15:07:49
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-03 11:53:00
 * @FilePath: /viking-ui/packages/components/src/header/Header.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../icon/Icon.vue'
import { headerProps } from './types'

export default defineComponent({
  name: 'VikHeader',
  components: { Icon },
  props: headerProps,
  setup(props, ctx) {
    const handleClose = () => {
      ctx.emit('close')
    }

    return {
      handleClose,
    }
  },
})
</script>

<template>
  <div class="base-header">
    <span class="base-header__icon" @click="handleClose">
      <Icon :name="iconName" />
    </span>
    <div class="base-header__heading">
      <h2 v-if="title" class="base-header__heading--main">
        {{ title }}
      </h2>
      <p v-if="sub" class="base-header__heading--sub">
        {{ sub }}
      </p>
    </div>
    <slot />
  </div>
</template>
