<!--
 * @Date: 2022-11-10 16:57:28
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-12-29 11:13:25
 * @FilePath: /viking-ui/packages/components/src/tab-pane/TabPane.vue
-->
<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import Icon from '../icon/Icon.vue'
import type { ChangeTabNameFun, CurrentName } from './types'
import { tabPaneProps } from './types'

export default defineComponent({
  name: 'VikTabPane',
  components: { Icon },
  props: tabPaneProps,
  setup(props, ctx) {
    const currentName = inject('currentName') as CurrentName
    const changeTabName = inject('changeTabName') as ChangeTabNameFun

    const active = computed(() => {
      const active = currentName.value === (props.name)
      return active
    })

    function handleClick() {
      if (!changeTabName)
        return

      if (!active.value)
        changeTabName(props.name)
      else
        changeTabName('')
    }

    const target = ref(null)
    onMounted(() => {
      onClickOutside(target, (event) => {
        if (changeTabName && active.value)
          changeTabName('')
      })
    })
    return {
      target,
      active,
      handleClick,
    }
  },
})
</script>

<template>
  <div ref="target" class="viking-tab-pane">
    <div class="viking-tab-pane__title" :class="{ 'viking-tab-pane__title--active': active }" @click="handleClick">
      {{ label }}
      <div class="viking-tab-pane__icon" :class="{ 'viking-tab-pane__icon--active': active }">
        <Icon :name="active ? 'arrow-up-bold' : 'arrow-down-bold'" />
      </div>
    </div>
    <div v-if="active" class="viking-tab-pane__content">
      <slot />
    </div>
  </div>
</template>
