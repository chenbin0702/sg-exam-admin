<template>
  <BasicModal v-bind="$attrs" @register="registerModal" width="70%" title="修改图片" :defaultFullscreen="true" 
    :showCancelBtn="false" :showOkBtn="false">
    <SignImage :imgUrl="imageUrl" @getNewImageInfo="getNewImageInfo"></SignImage>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import {SignImage} from '/@/components/SignImage/index';
import { useMessage } from "/@/hooks/web/useMessage";
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal,SignImage},
  emits: ['success'],
  setup(_, { emit }) {
    const imageUrl = ref('')
    const { createMessage } = useMessage();
    const [registerModal, {  closeModal }] = useModalInner(async (data) => {
      imageUrl.value = data.imageUrl
    })
    const getNewImageInfo = (data) => {
      console.log(data)
      let newData={
        url:data.result.url,
        name:data.result.attachName
      }
      createMessage.success('保存成功')
      emit('success',newData)
      closeModal()
    }
    return { registerModal,imageUrl,getNewImageInfo};
  },
});
</script>
