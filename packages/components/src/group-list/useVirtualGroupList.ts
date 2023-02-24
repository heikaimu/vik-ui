/*
 * @Date: 2022-11-25 10:28:44
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-24 10:29:01
 * @FilePath: /viking-ui/packages/components/src/group-list/useVirtualGroupList.ts
 */
import { computed, ref } from 'vue'
import { getRandomID } from '@vik-ui/utils'
import type { VirtualScroll } from 'vue3-virtual-scroll'
import type { Navigation, PropsType } from './types'

export function useVirtualGroupList(list: any[], listProps: PropsType) {
  // key props
  const idKey = listProps.id || 'id'
  const childrenKey = listProps.children || 'children'
  const titleKey = listProps.label || 'label'

  // 获取扁平数据
  const listAll = ref([])
  function setBodyListAll() {
    listAll.value = list.reduce((prev, cur) => {
      const children: any[] = cur[childrenKey]
      // 如果当前组是奇数，则添加当前组中间的元素，凑成偶数
      if (children.length % 2 === 1) {
        children.push({
          ...children[~~(children.length / 2)],
          blank: true,
        })
      }
      return [
        ...prev,
        ...children,
      ]
    }, [])
      .map((item: any) => ({
        // 添加唯一id，并浅拷贝元素，避免ID重复
        ...item,
        rowId: getRandomID(),
      }))
  }

  // 组相关
  const currentGroupId = ref(list[0][idKey])
  const currentGroupName = computed(() => {
    const group = list.find(item => item[idKey] === currentGroupId.value)
    return group.name || ''
  })

  // 组导航
  const navigation = computed(() => {
    let startIndex = 0
    return list.reduce((prev, cur) => {
      const newArr = [...prev, {
        id: cur[idKey],
        title: cur[titleKey],
        count: cur[childrenKey].length,
        start: startIndex,
        end: startIndex + cur[childrenKey].length - 1,
      }]
      startIndex += cur[childrenKey].length
      return newArr
    }, [])
  })

  // 节点
  const vScroll = ref<InstanceType<typeof VirtualScroll>>()

  // 分组切换
  const changeGroup = (id: string) => {
    currentGroupId.value = id
    const curGroup = navigation.value.find((item: Navigation) => {
      return item.id === id
    })
    scrollToIndex(curGroup.start)
  }

  // 滚动点亮导航
  // 先通过index计算出row，用row来进行位置对比
  const setActiveGroup = (start: number) => {
    const scrollRow = ~~(start / 2)
    const curGroup = navigation.value.find((item: Navigation) => {
      const startRowIndex = ~~(item.start / 2)
      const endRowIndex = ~~(item.end / 2) - 1
      return scrollRow >= startRowIndex && scrollRow <= endRowIndex + 1
    })
    if (curGroup)
      currentGroupId.value = curGroup.id
  }

  // 滚动到索引
  function scrollToIndex(index: number) {
    if (!vScroll.value)
      return

    vScroll.value.scrollToIndex(index, 1)
  }

  // 滚动到索引
  function scrollToPos(y: number) {
    if (!vScroll.value)
      return

    vScroll.value.scrollToPos(y)
  }

  return {
    currentGroupId,
    currentGroupName,
    listAll,
    vScroll,
    navigation,
    changeGroup,
    setActiveGroup,
    setBodyListAll,
    scrollToIndex,
    scrollToPos,
  }
}
