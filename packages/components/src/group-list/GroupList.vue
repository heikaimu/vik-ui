<!--
 * @Date: 2022-11-23 17:19:33
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-06-14 14:13:30
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
  setup(props, ctx) {
    const { vScroll, listAll, currentGroupId, navigation, changeGroup, setActiveGroup } = useGroupList(props)

    const wrapperStyle = computed(() => {
      return {
        padding: '5px',
      }
    })

    const leftStyle = computed(() => {
      return {
        width: `${props.leftWidth}px`,
      }
    })

    // 滚动返回索引
    function handleScroll(start: number, y: number) {
      ctx.emit('scroll', start, y)
      setActiveGroup(start)
    }

    // 修改组
    function handleChangeGroup(id: string, title: string) {
      ctx.emit('changeGroup', id, title)
      changeGroup(id)
    }

    return {
      vScroll,
      listAll,
      currentGroupId,
      navigation,
      wrapperStyle,
      leftStyle,
      changeGroup,
      setActiveGroup,
      handleScroll,
      handleChangeGroup,
    }
  },
})
</script>

<template>
  <div class="group-list">
    <div class="group-list__left" :style="leftStyle">
      <Navigation :value="currentGroupId" :list="navigation" @change="handleChangeGroup" />
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
