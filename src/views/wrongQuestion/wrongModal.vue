<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit" width="70%">
    <BasicForm @register="registerForm">
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
import { useI18n } from '/@/hooks/web/useI18n';
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './data';
import { mistakesSaveOrUpdate } from '/@/api/wrong/index'
import {  getSelectUserList } from "/@/api/sys/select";
import { useMessage } from "/@/hooks/web/useMessage";
import { updateGradeOptions, updateSubjectOptions } from '/@/data/grade'
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal, BasicForm,  },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const isUpdate = ref(true);
    let id: string;
    const isView = ref(false); // 新增：查看模式标志
    const name = ref<string>('');
      const { createMessage } = useMessage();
    const searchParams = computed<Recordable>(() => {
      return {name: unref(name)};
    });
    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
    });
    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;
      isView.value = !!data?.isView; // 新增：设置查看模式标志
      if (unref(isUpdate)|| unref(isView)) {
        try {
          let desc = JSON.parse(data.record.desc);
          data.record.wrongDesc = desc.wrongDesc;
          data.record.stage = desc.stage ? desc.stage : '';          
        } catch (error) {
          console.log(error);
        }
        updateGradeOptions(data.record.stage, formSchema);
        updateSubjectOptions(data.record.grade, formSchema);
        setFieldsValue({
          ...data.record,
        });
      }
      id = data.record?.id || null;
      if (unref(isView)) {
        updateSchema(formSchema.map(item => ({ ...item, componentProps: { disabled: true }})));
      }
      else
      {
        updateSchema(formSchema.map(item => ({ ...item, componentProps: { disabled: false }})));
      }
   
    });
    const getTitle = computed(() => {
      if (unref(isView)) {
        return t('查看错题');
      } else {
        return !unref(isUpdate) ? t('添加错题') : t('修改错题');
      }
    });
    async function handleSubmit() {
      if (unref(isView)) { 
        createMessage.warning('查看状态下不能提交');
        closeModal();
        return;
      }
      try {
        const values = await validate();
        let desc={
          wrongDesc:values.wrongDesc,
          stage:values.stage,
        }
        values.desc=JSON.stringify(desc);
        setModalProps({ confirmLoading: true });
        id? values.id = id : null;
        await mistakesSaveOrUpdate(values);
        console.log(values);
        closeModal();
        emit('success', isUpdate);
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    function onSearch(value: string) {
      name.value = value;
    }

    return { searchParams, registerModal, registerForm, getTitle, handleSubmit, getSelectUserList, onSearch };
  },
});
</script>
