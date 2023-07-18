<!--
 * @Date: 2022-11-25 09:45:30
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-06-14 14:12:21
 * @FilePath: /viking-ui/packages/components/src/group-list/Navigation.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
import { navigationProps } from './types'

export default defineComponent({
  props: navigationProps,

  setup(props, ctx) {
    function handleClick(id: string, title: string) {
      ctx.emit('change', id, title)
    }

    return {
      handleClick,
    }
  },
})
</script>

<template>
  <div class="anchor">
    <ul class="anchor__list">
      <li
        v-for="(item) in list" :key="item.title" class="anchor__item" :class="{ active: item.id === value }"
        @click="handleClick(item.id, item.title)"
      >
        <p class="anchor__text">
          {{ item.title }} <span class="anchor__num">{{ item.count }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>
