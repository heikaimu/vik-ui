<!--
 * @Date: 2022-11-10 16:57:28
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-03-29 09:43:13
 * @FilePath: /viking-ui/packages/components/src/uploader/Uploader.vue
-->
<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue'
import { Progress, getRandomID } from '@vik-ui/utils'
import type { FileItem, UploadRes } from './types'
import { uploaderProps } from './types'
import { uploadFile } from './upload'

export default defineComponent({
  name: 'VikUploader',
  props: uploaderProps,
  setup(props, ctx) {
    let progress: Progress
    const percent = ref(2)
    const uploadRes = ref<UploadRes[]>([])
    const timeNow = ref('')

    onMounted(() => {
      if (props.data && props.data.length) {
        getNowTime()
        stepProgress()
        startUpload()
      }
    })

    // 获取当前时间
    function getNowTime() {
      const time = new Date()
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      const monthStr = month < 10 ? `0${month}` : month
      const dayStr = day < 10 ? `0${day}` : day
      timeNow.value = `${year}${monthStr}${dayStr}`
    }

    // 文件上传
    function startUpload() {
      for (const item of (props.data || []))
        upload(item)
    }

    function upload(item: FileItem) {
      const { name, file, url } = item

      // 如果是外网地址，忽略上传，直接返回结果
      if (url) {
        setUploadRes(item, url)
        progress.next()
        return
      }

      // 如果是blob
      if (file) {
        const suffix = file.type.split('/')[1]
        uploadFile({
          file,
          name: `${timeNow.value}_${props.website}_${name}_${getRandomID()}.${suffix}`,
          onSuccess: (url: string) => {
            setUploadRes(item, url)
            progress.next()
          },
          onError: () => {
            progress.next()
          },
        })
      }
    }

    // 设置上传结果
    function setUploadRes(item: FileItem, url: string) {
      uploadRes.value.push({
        id: item.id,
        name: item.name,
        url,
      })
    }

    function stepProgress() {
      progress = new Progress({
        parts: props.data.length,
        speed: 500,
        onProgress: (val) => {
          percent.value = val
        },
        onComplete: () => {
          ctx.emit('complete', toRaw(uploadRes.value))
        },
      })
      progress.start()
    }

    const progressStyle = computed(() => {
      return {
        'width': `${percent.value}%`,
        'background': props.barColor,
        'border-color': `${props.barColor} ${props.barColor} ${props.barColor}`,
        'background-image': `linear-gradient(180deg, ${props.barColor} 0,  ${props.barColor} 70%, ${props.barColor})`,
      }
    })
    return {
      progressStyle,
      percent,
    }
  },
})
</script>

<template>
  <div class="uploader">
    <img class="uploader__gif" :src="gifUrl" alt="" srcset="">
    <div class="uploader__progress-box">
      <div class="progress">
        <span class="progress__line" :style="progressStyle">
          <span class="progress__percent">{{ percent }}%</span>
        </span>
      </div>
    </div>
  </div>
</template>
