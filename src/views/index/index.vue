<template>
  <el-main>
    <el-row class="align-center justify-center">
      <h6 class="text-h6">这里是首页</h6>
    </el-row>
    <el-row v-if="isElectron" class="align-center justify-center">
      <el-button class="mt-2" @click="handleCloseElectronWindow">
        Electron 环境 - 关闭应用
      </el-button>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useAxios } from '@/composables';

export default defineComponent({
  name: 'Index',
  setup() {
    const store = useStore();
    const isElectron = computed(() => store.state.isElectron);
    if (isElectron.value) {
      return {
        isElectron: computed(() => store.state.isElectron),
        handleCloseElectronWindow: () => {
          window.ipcRenderer.send('window-closed');
        },
      };
    }

    return {
      isElectron,
    };
  },
});
</script>
