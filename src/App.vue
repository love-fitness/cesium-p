<template>
  <el-config-provider>
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>
<script setup lang='ts'>
/** 阻止默认的拖拽事件 */
document.body.ondrop = function (event) {
  event.preventDefault()
  event.stopPropagation()
}
</script>

<style lang='scss' scoped>
</style>