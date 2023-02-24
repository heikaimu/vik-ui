<!--
 * @Date: 2022-10-28 10:14:59
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2023-02-24 10:27:58
 * @FilePath: /viking-ui/examples/app.vue
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { VikBox, VikButton, VikCard, VikCol, VikContainer, VikCropper, VikDivider, VikFileSelect, VikGroupList, VikHeader, VikIcon, VikPlusCard, VikProductSelector, VikRow, VikTab, VikTabPane, VikUploader } from '../packages/components/index'
import { getObjectUrl } from '../packages/utils'

const cLoading = ref(true)
onMounted(() => {
  setTimeout(() => {
    cLoading.value = false
  }, 3000)
})
function handleClose() {
  alert()
}
function handleSelect(file: string) {
  console.log(file)
}

function handleCancel() {
  alert('取消')
}

// 裁剪
const cropVisible = ref(false)
const cropUrl = ref('')

function handleOpenCrop(e) {
  const file = e.target.files[0]
  cropVisible.value = true
  cropUrl.value = getObjectUrl(file)
}

function confirmCrop(data: string) {
  console.log(data)
}

const list = ref([])
onMounted(() => {
  fetch('./mock/data.json').then(res => res.json()).then((res) => {
    list.value = res.background
  })
})

// 上传
const uploadVisible = ref(false)
const uploadFiles = ref<any[]>([])
function handleOpenUpload(e) {
  const files = e.target.files
  uploadVisible.value = true
  uploadFiles.value = Array.from(files).map((file) => {
    return {
      name: file.name.split('.')[0],
      file,
    }
  })
}
function completeUpload(res: any) {
  uploadVisible.value = false
  console.log(res)
}

// 数据构造
const configure = ref({})
const products = ref([])
const productSelection = ref([])
onMounted(async () => {
  const data = await fetchData('M', 'bg-calendar')
  configure.value = data
  products.value = data.relatedProductConfig.list
})

async function fetchData(website: string, productType: string) {
  const res = await axios('https://sback.globalhotnetwork.com/plugins/api/v1/configure?id=45')
  // const res = await axios('http://192.168.1.250:15000/plugins/api/v1/configure?id=45')
  const { status, data } = res.data
  if (status === '0') {
    const res = generateConifg(JSON.parse(data[0].configure), website, productType)
    return Promise.resolve(res)
  }
}

// 构造参数
function generateConifg(data: any, website: string, productType: string) {
  const configure = data
  const { mainList, relatedProductList, productTypeConfigList } = configure
  const curProductConfig = productTypeConfigList.find((item: any) => {
    return item.productType === productType && item.website.includes(website)
  })

  // 主配置
  const { list, order } = curProductConfig.mainConfig
  const mainIds = order.map((item: any) => item.uuid)
  const curMainList = mainList
    .filter((group: any) => mainIds.includes(group.uuid))
    .map((group: any) => {
      return {
        ...group,
        children: group.children.filter((item: any) => list.includes(item.uuid)),
      }
    })
  delete curProductConfig.mainConfig.order
  curProductConfig.mainConfig.list = curMainList

  // 关联产品
  const productsIds = curProductConfig.relatedProductConfig.list.map((item: any) => item.uuid)
  const curRelatedProducts = relatedProductList
    .filter((item: any) => productsIds.includes(item.uuid))
    .map((item: any) => {
      const id = item.websiteList.find((web: any) => web.website === website).id
      delete item.websiteList
      return {
        id,
        ...item,
      }
    }).filter((item: any) => item.id)
  curProductConfig.relatedProductConfig.list = curRelatedProducts

  return curProductConfig
}

function handleCloseCard() {
  alert()
}

function handleClickCard() {
  alert(2)
}

const posY = ref(200)
function handleScroll(index: number, y: number) {
  posY.value = y
}
</script>

<template>
  <main class="main-wrapper">
    <section>
      <VikDivider>盒子</VikDivider>
      <VikBox :pd="10" :pl="40" :pr="30">
        <div style="width:100px;height:100px;background:red" />
      </VikBox>
    </section>

    <section>
      <VikDivider>关联产品</VikDivider>
      <VikContainer :border="true" :shadow="true">
        <template #header>
          <VikHeader title="Maybe You Like" icon-name="close-bold" @close="handleClose">
            x
          </VikHeader>
        </template>
        <template #main>
          <VikProductSelector v-model:data="productSelection" :products="products" />
        </template>
        <template #footer>
          <VikRow :gutter="20">
            <VikButton fill type="primary">
              CONFIRM
            </VikButton>
          </VikRow>
        </template>
      </VikContainer>
    </section>

    <section>
      <input type="file" multiple @change="handleOpenUpload">
      <VikDivider>文件上传</VikDivider>
      <VikContainer :border="true" :shadow="true">
        <template #header>
          <VikHeader title="Files Upload" icon-name="close-bold" @close="handleClose" />
        </template>
        <template #main>
          <VikUploader
            v-if="uploadVisible" website="M" :data="uploadFiles"
            gif-url="https://cdn.shopifycdn.net/s/files/1/0343/0275/4948/files/01.gif"
            @complete="completeUpload"
          />
        </template>
      </VikContainer>
    </section>

    <section>
      <VikDivider>分组列表</VikDivider>
      <VikContainer :border="true" :shadow="true">
        <template #header>
          <VikHeader title="Photo Crop" icon-name="close-bold" @close="handleClose" />
        </template>
        <template #main>
          <VikGroupList
            v-if="list.length" :data="list" :props="{
              children: 'images',
              label: 'name',
              id: 'id',
            }" :pos="posY" :card-height="100"
            @scroll="handleScroll"
          >
            <template #default="{ data }">
              <div class="test-card" style="height:100px">
                <img :src="data.cover" alt="">
              </div>
            </template>
          </VikGroupList>
        </template>
      </VikContainer>
    </section>

    <section>
      <VikDivider>按钮</VikDivider>
      <VikButton>默认按钮</VikButton>
      <VikButton type="primary">
        主要按钮
      </VikButton>
      <VikButton type="success">
        成功按钮
      </VikButton>
      <VikButton type="info">
        信息按钮
      </VikButton>
      <VikButton type="warning">
        警告按钮
      </VikButton>
      <VikButton type="danger">
        危险按钮
      </VikButton>
      <VikButton type="text">
        文字按钮
      </VikButton>
      <br>
      <br>
      <VikButton round>
        圆角按钮
      </VikButton>
      <VikButton type="primary" round>
        主要按钮
      </VikButton>
      <VikButton type="success" round>
        成功按钮
      </VikButton>
      <VikButton type="info" round>
        信息按钮
      </VikButton>
      <VikButton type="warning" round>
        警告按钮
      </VikButton>
      <VikButton type="danger" round>
        危险按钮
      </VikButton>
      <br>
      <br>
      <VikButton disabled>
        禁用按钮
      </VikButton>
      <VikButton type="primary" disabled>
        主要按钮
      </VikButton>
      <VikButton type="success" disabled>
        成功按钮
      </VikButton>
      <VikButton type="info" disabled>
        信息按钮
      </VikButton>
      <VikButton type="warning" disabled>
        警告按钮
      </VikButton>
      <VikButton type="danger" disabled>
        危险按钮
      </VikButton>
      <br>
      <br>
      <VikButton type="primary" round fill>
        默认按钮
      </VikButton>
      <VikButton type="primary" round>
        默认按钮
      </VikButton>
      <VikButton type="primary" size="medium" round>
        大按钮
      </VikButton>
      <VikButton type="primary" size="small" round>
        小型按钮
      </VikButton>
      <VikButton type="primary" size="mini" round>
        超小按钮
      </VikButton>
      <br>
      <VikButton type="success" icon="arrow-left-bold">
        带图标
      </VikButton>
      <VikButton type="success" icon="close-bold" icon-position="right">
        带图标
      </VikButton>
    </section>

    <section>
      <VikDivider>ICON</VikDivider>
      <VikIcon name="arrow-left-bold" />
      <VikIcon name="close-bold" />
      <VikIcon name="close-bold" dot />
      <VikIcon name="close-bold" dot badge="1" />
    </section>

    <section>
      <VikDivider>头部</VikDivider>
      <VikHeader title="Arrow Photo" icon-name="arrow-left-bold" @close="handleClose" />
      <br>
      <VikHeader title="Close Photo" icon-name="close-bold" @close="handleClose" />
    </section>

    <section>
      <VikDivider>TAB</VikDivider>
      <VikTab>
        <VikTabPane label="color" name="color">
          color
        </VikTabPane>
        <VikTabPane label="composing" name="composing">
          composing
        </VikTabPane>
      </VikTab>
    </section>

    <section>
      <VikDivider>卡片</VikDivider>
      <VikRow :gutter="10">
        <VikCol :span="4">
          <VikPlusCard />
        </VikCol>
        <VikCol :span="4">
          <VikCard shadow src="https://images7.alphacoders.com/126/1265780.jpg" :omits2="true" title="111House of the DragonHouse of the DragonHouse of the Dragon" sub="" />
        </VikCol>
        <VikCol :span="4">
          <VikCard src="https://images7.alphacoders.com/126/1265780.jpg" title="House of the Dragon" sub="" />
        </VikCol>
        <VikCol :span="4">
          <VikCard
            :border="true" src="https://images7.alphacoders.com/126/1265780.jpg" title="House of the Dragon"
            sub=""
          />
        </VikCol>
        <VikCol :span="6">
          <VikCard
            :ratio="1" shadow src="https://images7.alphacoders.com/126/1265780.jpg" title="House of the Dragon"
            sub=""
            closable
            @click="handleClickCard"
            @close="handleCloseCard"
          />
        </VikCol>
        <VikCol :span="6">
          <VikCard
            :border="true" :ratio="1" active fit="contain" radius="50%" shadow src="https://images7.alphacoders.com/126/1265780.jpg"
            sub=""
            @click="handleClickCard"
            @close="handleCloseCard"
          />
        </VikCol>
        <VikCol :span="12">
          <VikCard shadow src="https://images7.alphacoders.com/126/1265780.jpg" title="House of the Dragon" sub="" />
        </VikCol>
      </VikRow>
    </section>

    <section>
      <VikDivider>容器</VikDivider>
      <VikContainer :border="true" :shadow="true" :loading="cLoading">
        <template #header>
          <VikHeader title="Close Photo" sub="只要2.99元，欢乐带回家" icon-name="close-bold" @close="handleClose" />
        </template>
        <template #main>
          main
        </template>
        <template #footer>
          footer
        </template>
      </VikContainer>
    </section>

    <section>
      <VikDivider>文件选择</VikDivider>
      <VikContainer :border="true" :shadow="true" :loading="cLoading">
        <template #header>
          <VikHeader title="Close Photo" sub="只要2.99元，欢乐带回家" icon-name="close-bold" @close="handleClose" />
        </template>
        <template #main>
          <VikFileSelect @select="handleSelect" />
        </template>
        <template #footer>
          <VikRow :gutter="20">
            <VikButton fill @click="handleCancel">
              Cancel
            </VikButton>
          </VikRow>
        </template>
      </VikContainer>
    </section>

    <section>
      <VikDivider>图片裁剪</VikDivider>
      <input type="file" @change="handleOpenCrop">
      <VikContainer v-if="cropVisible" :border="true" :shadow="true" :loading="cLoading">
        <template #header>
          <VikHeader title="Photo Crop" icon-name="close-bold" @close="handleClose" />
        </template>
        <template #main>
          <VikCropper :url="cropUrl" @confirm="confirmCrop" />
        </template>
      </VikContainer>
    </section>
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.main-wrapper {
  background-color: #f2f2f2;

  section {
    width: 400px;
    padding: 20px 20px 20px 20px;
    border-radius: 4px;
    margin: 0 auto;
    background-color: #ffffff;

    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }
}

.test-card {
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
