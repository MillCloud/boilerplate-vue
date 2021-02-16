<template>
  <el-main>
    <el-row class="align-center justify-center">
      <h6 class="text-h6">这里是主页</h6>
    </el-row>
    <el-image
      class="mx-auto logo"
      alt="Vue logo"
      src="https://cn.vuejs.org/images/logo.png"
      lazy
    ></el-image>
    <HelloWorld msg="Welcome to Your Vue.js v3 App" />
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
});
</script>

<style lang="scss" scoped>
.logo {
  display: block;
  width: 200px;
  height: 200px;
}
</style>
