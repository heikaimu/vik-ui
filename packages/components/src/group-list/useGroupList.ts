import { nextTick } from 'vue'
/*
 * @Description:
 * @Version: 2.0
 * @Author: Yaowen Liu
 * @Date: 2021-08-04 14:27:42
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-25 15:35:56
 */
import { onMounted } from 'vue'
import type { GroupListProps } from './types'
import { useVirtualGroupList } from './useVirtualGroupList'

export function useGroupList(props: GroupListProps) {
  // 分组虚拟滚动
  const {
    currentGroupId,
    currentGroupName,
    listAll,
    vScroll,
    navigation,
    changeGroup,
    setActiveGroup,
    setBodyListAll,
    scrollToIndex,
  } = useVirtualGroupList(props.data, props.props)

  onMounted(() => {
    setBodyListAll()
    nextTick(() => {
      props.posKey && scrollTo()
    })
  })

  // 滚动到对应位置
  function scrollTo() {
    const index = listAll.value.findIndex((item) => {
      return item[props.posKey as string] === props.posValue
    })
    scrollToIndex(index)
  }

  return {
    vScroll,
    navigation,
    listAll,
    currentGroupName,
    currentGroupId,
    changeGroup,
    setActiveGroup,
  }
}
