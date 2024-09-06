<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="提交作业详情" @ok="handleSubmit" width="70%">
    <div class="flex flex-wrap">
    <div v-for="(item,index) in ImageList" :key="item.url">
      <div>作业图片{{ index+1}}</div>
      <Image :src="item.url" />
    </div>
  </div>
  </BasicModal>

 
 
</template>
<script lang="ts">
import { useI18n } from '/@/hooks/web/useI18n';
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';

import { Image } from 'ant-design-vue'
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal, Image},
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const ImageList = ref([])
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
       const { flies } = data
       ImageList.value = flies
       console.log(ImageList.value)
    })

    return { registerModal, ImageList };
  },
});
</script>
