<template>
  <el-row>
    <el-col>
      <h3 class="text-h3 text-center">{{ msg }}</h3>
    </el-col>
    <el-col class="mt-2">
      <p class="text-center">
        For a guide and recipes on how to configure / customize this project,
        check out the
        <a
          href="https://next.cli.vuejs.org/zh/"
          target="_blank"
          rel="noopener noreferrer"
          >vue-cli documentation</a
        >
      </p>
    </el-col>
    <el-col>
      <h6 class="text-h6 text-center">Installed CLI Plugins</h6>
    </el-col>
    <el-col class="text-center">
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript"
        target="_blank"
        rel="noopener noreferrer"
        >typescript</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
        target="_blank"
        rel="noopener noreferrer"
        >babel</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
        target="_blank"
        rel="noopener noreferrer"
        >router</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
        target="_blank"
        rel="noopener noreferrer"
        >vuex</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
        target="_blank"
        rel="noopener noreferrer"
        >eslint</a
      >
      <a
        class="mx-2"
        href="https://github.com/intlify/vue-cli-plugin-i18n#readme"
        target="_blank"
        rel="noopener noreferrer"
        >i18n</a
      >
      <a
        v-if="isElectron"
        class="mx-2"
        href="https://github.com/nklayman/vue-cli-plugin-electron-builder#readme"
        target="_blank"
        rel="noopener noreferrer"
        >electron-builder</a
      >
      <a
        class="mx-2"
        href="https://github.com/element-plus/vue-cli-plugin-element-plus#readme"
        target="_blank"
        rel="noopener noreferrer"
        >element-plus</a
      >
    </el-col>
    <el-col>
      <h6 class="text-h6 text-center">Ecosystem</h6>
    </el-col>
    <el-col class="text-center">
      <a
        class="mx-2"
        href="https://v3.cn.vuejs.org"
        target="_blank"
        rel="noopener noreferrer"
        >vue</a
      >
      <a
        class="mx-2"
        href="https://next.router.vuejs.org/zh/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-router</a
      >
      <a
        class="mx-2"
        href="https://next.vuex.vuejs.org/"
        target="_blank"
        rel="noopener noreferrer"
        >vuex</a
      >
      <a
        class="mx-2"
        href="https://vueuse.js.org/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-use</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/vue-devtools#readme"
        target="_blank"
        rel="noopener noreferrer"
        >vue-devtools</a
      >
      <a
        class="mx-2"
        href="https://vue-loader.vuejs.org/zh/"
        target="_blank"
        rel="noopener noreferrer"
        >vue-loader</a
      >
      <a
        class="mx-2"
        href="https://element-plus.org/"
        target="_blank"
        rel="noopener noreferrer"
        >element-plus</a
      >
      <a
        class="mx-2"
        href="https://github.com/vuejs/awesome-vue#readme"
        target="_blank"
        rel="noopener noreferrer"
        >awesome-vue</a
      >
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: () => '',
    },
  },
  setup() {
    const store = useStore();
    return {
      isElectron: computed(() => store.state.isElectron),
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* stylelint-disable declaration-no-important */
.el-col {
  padding: 12px;
}

ul {
  padding: 0 !important;
  list-style-type: none;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
