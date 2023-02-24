<!--
 * @Date: 2022-11-18 16:00:35
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-23 11:07:43
 * @FilePath: /viking-ui/packages/components/src/cropper/Cropper.vue
-->
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Cropper from 'cropperjs'
import VikButton from '../button/Button.vue'
import Icon from '../icon/Icon.vue'
import { cropperProps } from './types'

export default defineComponent({
  name: 'VikCropper',
  components: {
    VikButton,
    Icon,
  },
  props: cropperProps,
  setup(props, ctx) {
    // 裁剪对象
    let cropper: Cropper | null = null

    // 初始化
    function initialize() {
      const el = document.getElementById('cropImage') as HTMLImageElement
      cropper = new Cropper(el, {
        viewMode: 1, // 定义裁剪器的视图模式。如果将viewMode设置为0，则裁剪框可以延伸到画布外部，而值为1、2或3将限制裁剪框的大小为画布的大小。viewMode为2或3会将画布限制为容器。请注意，如果画布和容器的比例相同，则2和3之间没有差别。
        dragMode: 'move', // 定义的拖动模式裁剪器.canvas和容器一样，2和3没有区别。move:移动画布 crop:创建新的裁剪框（默认） none:什么也不做
        aspectRatio: props.ratio, // 定义裁剪框的固定纵横比。默认情况下，裁剪框为自由比率。
        autoCropArea: 0.7, // 定义0到1之间的fA编号。定义自动裁剪区域大小（百分比）。默认0.8
        cropBoxMovable: true, // 允许通过拖动移动裁剪框。默认true
        cropBoxResizable: true, // 以通过拖动来调整裁剪框的大小 默认true
        background: true, // 显示容器的网格背景
        movable: false, // 移动图像
      })
    }

    onMounted(() => {
      initialize()
    })

    // 缩放
    function handleZoom(val: number) {
      if (cropper)
        cropper.zoom(val)
    }

    // 重置
    function handleReset() {
      if (cropper)
        cropper.reset()
    }

    // 保存
    function handleConfirm() {
      if (cropper) {
        const cropURL: string = cropper.getCroppedCanvas().toDataURL('image/jpeg')
        ctx.emit('confirm', cropURL)
      }
    }

    return {
      handleZoom,
      handleReset,
      handleConfirm,
    }
  },
})
</script>

<template>
  <div class="vik-crop">
    <div class="vik-crop__content">
      <img id="cropImage" class="vik-crop__image" :src="url" alt="">
    </div>
    <div class="vik-crop__operators">
      <div class="vik-crop__operators--left">
        <p @click="handleZoom(0.1)">
          <Icon name="zengjia" />
        </p>
        <p @click="handleZoom(-0.1)">
          <Icon name="jianshao" />
        </p>
        <p @click="handleReset">
          <Icon name="shuaxin" />
        </p>
      </div>
      <div class="vik-crop__operators--right">
        <VikButton type="primary" @click="handleConfirm">
          Confirm
        </VikButton>
      </div>
    </div>
  </div>
</template>
