<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="提交作业详情" @ok="handleSubmit" width="70%">
    <div class="flex flex-wrap">

      <Card title="图片:" style="width: 100%">
        <div v-for="(item, index) in ImageList" :key="item.url" style="display:flex">
          <div>作业图片{{ index + 1 }}</div>
          <Image :src="item.url" :width="200" :height="200" />
        </div>
      </Card>
      <Card title="视频:" style="width: 100%" v-if="videoUrl">
        <video :src="videoUrl" controls></video>
      </Card>
      <Card title="语音:" style="width: 100%" v-if="audioUrl">
        <audio class="audio-item" ref="audio" controls :src="audioUrl" />
      </Card>
      <BasicForm @register="registerForm"></BasicForm>
    </div>
  </BasicModal>



</template>
<script lang="ts">
import { useI18n } from '/@/hooks/web/useI18n';
import { defineComponent, ref, computed, unref,h } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { Tinymce } from '/@/components/Tinymce';
import {
  editorHeight,
  tinymcePlugins,
  tinymceToolbar
} from "/@/components/Subjects/subject.constant";
import { Image, Card } from 'ant-design-vue'
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal, Image, Card, Tinymce, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const ImageList = ref([])
    const audioUrl = ref('')
    const videoUrl = ref('')
    const formSchema = [
        {
          label: '作业描述',
          field: 'desc',
          component: 'Input',
          componentProps: {
            readonly: false,
          },
          render: ({ model, field }) => {
            return h(Tinymce, {
              value: model[field],
              height: 500,
              width: 1000,
              plugins: tinymcePlugins,
              toolbar: tinymceToolbar,
              onChange: (value: string) => {
                model[field] = value;
              },
            });
          },
        },
      ]
    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
    });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      const { imageList, audioUrl: audioData, videoUrl: videoData,desc } = data
      console.log(data)
      ImageList.value = imageList
      audioUrl.value = audioData
      videoUrl.value = videoData
     
    let otherData= {
      desc,
    }
    setFieldsValue({...otherData});
  })

return { registerModal,registerForm, ImageList, audioUrl, videoUrl, };
  },
});
</script>
