<!--
 * @Date: 2023-02-13 09:39:19
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-13 10:00:58
 * @FilePath: /viking-ui/packages/components/src/card-plus/Card.vue
-->
<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '../icon'
export default defineComponent({
  components: { Icon },
  setup() {
    return {}
  },
})
</script>

<template>
  <div class="viking-plus-card">
    <div class="ratio-image">
      <div class="ratio-image__box">
        <div class="viking-plus-card__content">
          <Icon name="add" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
