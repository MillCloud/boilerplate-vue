<template>
  <el-container>
    <el-aside>
      <div class="toolbar">
        <div class="toolbar-content">
          <div class="title">boilerplate-vue</div>
        </div>
      </div>
      <div class="el-aside-border"></div>
    </el-aside>
    <el-header class="toolbar">
      <div class="toolbar-content">
        <span class="mr-8 title">boilerplate-vue</span>
        <router-link to="/" exact>Index</router-link>
        <router-link to="/home" exact class="ml-2">Home</router-link>
      </div>
    </el-header>
    <router-view />
    <el-footer class="justify-center">
      <a
        class="mx-2"
        href="https://github.com/MillCloud/boilerplate-vue#readme"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      <a
        class="mx-2"
        href="https://gitee.com/MillCloud/boilerplate-vue#readme"
        target="_blank"
        rel="noopener noreferrer"
      >
        Gitee
      </a>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout',
});
</script>
