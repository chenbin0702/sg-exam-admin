<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="批改作业" @ok="handleSubmit" width="70%"
    :defaultFullscreen="true">
    <div class="flex flex-wrap">
        <Card title="图片:" style="width: 100%">
          <div class="flex">
            <div v-for="(item, index) in ImageList" :key="item.url" style="display:flex">
              <div class="flex flex-col m-3">
                <div>作业图片{{ index + 1 }}</div>
                <Image :src="item.url" :width="200" :height="200" />
                <a-button type="primary" @click="handleCorrect(item)">批改作业</a-button>
              </div>
            </div>
          </div>
        </Card>
        <Card title="批改作业图片" style="width: 100%" v-if="NewImageList.length > 0">
          <div class="flex">
            <div v-for="(item, index) in NewImageList" :key="item.url">
              <div class="flex flex-col m-3">
                <div>批改作业图片{{ index + 1 }}</div>
                <Image :src="item.url" :width="200" :height="200" />
                <!-- 删除 -->
                <a-button type="primary" @click="handleRemoveItem(item)" danger>删除</a-button>
              </div>

            </div>
          </div>
        </Card>
      </div>
      <EditHomeWorkModal @register="registerEidtModal" @success="addNewImage"></EditHomeWorkModal>
  </BasicModal>



</template>
<script lang="ts">
import { useI18n } from '/@/hooks/web/useI18n';
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner, useModal } from '/@/components/Modal';
import EditHomeWorkModal from './EditHomeWorkModal.vue'
import { homeworkSaveOrUpdate } from '/@/api/homework/index'
import { Image, Card } from 'ant-design-vue'
import { useMessage } from "/@/hooks/web/useMessage";
import { add } from '../../components/Form/src/componentMap';
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal, Image, Card, EditHomeWorkModal },
  emits: ['success'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const ImageList = ref([])
    const NewImageList = ref([])
    const Record = ref({})
    const { createMessage } = useMessage();
    const [registerEidtModal, { openModal }] = useModal();
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      const { imageList, newImageList, record } = data
      ImageList.value = imageList
      NewImageList.value = newImageList
      Record.value = record
    })
    const handleCorrect = (item) => {
      console.log(item)
      openModal(true, {
        imageUrl: item.url
      })
    }
    const addNewImage = (data) => {
      NewImageList.value.push(data)
    }
    // 保存修改后的图片
    const handleSubmit = () => {
      let newData = { ...Record.value }
      let remark = JSON.parse(newData.remark)
      remark.newImageList = NewImageList.value
      newData.remark = JSON.stringify(remark)
      homeworkSaveOrUpdate(newData).then(res => {
        createMessage.success('保存成功')
        emit('success', true)
        closeModal()
      })

    }
    const handleRemoveItem = (item) => {
      NewImageList.value = NewImageList.value.filter(i => i.url != item.url)
    }
    return { registerModal, ImageList, NewImageList, handleCorrect, registerEidtModal, handleSubmit, addNewImage, handleRemoveItem };
  },
});
</script>
