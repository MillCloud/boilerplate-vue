<template>
  <el-main class="align-center justify-center">
    <el-row>
      <el-col>
        <h6 class="text-h6 text-center">404 Not Found</h6>
      </el-col>
      <el-col class="text-center">
        <el-button @click="handleGoBack">{{ t('hint.back') }}</el-button>
        <el-button class="mx-2" @click="handleToIndex">
          {{ t('hint.index') }}
        </el-button>
        <el-button @click="handleToHome">{{ t('hint.home') }}</el-button>
      </el-col>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const router = useRouter();
    const handleGoBack = () => {
      router.go(-1);
    };
    const handleToIndex = () => {
      router.replace({ name: 'Index' });
    };
    const handleToHome = () => {
      router.replace({ name: 'Home' });
    };

    const { t } = useI18n();
    return {
      handleGoBack,
      handleToIndex,
      handleToHome,
      t,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-main {
  display: flex;
}
</style>
