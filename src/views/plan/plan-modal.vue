<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="规划" width="60%">
    <BasicForm @register="registerForm">

    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicModal, useModalInner } from '/@/components/Modal'
import { BasicForm, useForm } from '/@/components/Form/index'
import { formSchema } from './data'
import {useGradeStore} from '/@/store/modules/grade'
export default defineComponent({
  components: { BasicModal, BasicForm },
  setup() {
    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 120,
      schemas: formSchema,
      showActionButtonGroup: false,
    })
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {

    })
    const gradeStore = useGradeStore();
    const stageOptions =gradeStore.stageOptions; 
    return {
      registerModal,
      registerForm,
      stageOptions
    }
  }
})
</script>

<style scoped></style>
