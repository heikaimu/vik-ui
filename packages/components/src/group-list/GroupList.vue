<!--
 * @Date: 2022-11-23 17:19:33
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-01-04 14:10:35
 * @FilePath: /viking-ui/packages/components/src/group-list/GroupList.vue
-->
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { VirtualScroll } from 'vue3-virtual-scroll'
import Navigation from './Navigation.vue'
import { groupListProps } from './types'
import { useGroupList } from './useGroupList'

export default defineComponent({
  name: 'VikGroupList',
  components: { Navigation, VirtualScroll },
  props: groupListProps,
  setup(props) {
    const { vScroll, listAll, currentGroupId, navigation, changeGroup, setActiveGroup } = useGroupList(props)

    const wrapperStyle = computed(() => {
      return {
        padding: '5px',
      }
    })

    // 滚动返回索引
    function handleScroll(start: number) {
      setActiveGroup(start)
    }

    return {
      vScroll,
      listAll,
      currentGroupId,
      navigation,
      wrapperStyle,
      changeGroup,
      setActiveGroup,
      handleScroll,
    }
  },
})
</script>

<template>
  <div class="group-list">
    <div class="group-list__left">
      <Navigation :value="currentGroupId" :list="navigation" @change="changeGroup" />
    </div>
    <div class="group-list__right">
      <VirtualScroll
        ref="vScroll" row-key="rowId" :list="listAll" :grid="2" :wrapper-style="wrapperStyle"
        :col-space="colSpace" :row-space="rowSpace" :height="cardHeight" @scroll="handleScroll"
      >
        <template #default="{ item }">
          <slot :data="item" />
        </template>
      </VirtualScroll>
    </div>
  </div>
</template>
