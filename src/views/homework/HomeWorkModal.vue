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
import { formSchema } from './homework.data';
import { homeworkSaveOrUpdate } from '/@/api/homework/index'
import {  getSelectUserList } from "/@/api/sys/select";
import { useMessage } from "/@/hooks/web/useMessage";
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal, BasicForm,  },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const isUpdate = ref(true);
    let id: string;
    const isView = ref(false); // 新增：查看模式标志
    const name = ref<string>('');const { createMessage } = useMessage();
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
      isView.value = !!data?.isView; 
      console.log(isView.value)
      if (unref(isUpdate)|| unref(isView)) {
        try {
          let remark=JSON.parse(data.record.remark);
          data.record.desc = remark.desc;
          data.record.dueDate = remark.dueDate;
          data.record.imageUrl = remark.imageUrl;
        } catch (error) {
           console.log(error);
        }
        setFieldsValue({
          ...data.record,
        });
      }
      id = data.record?.id || null;
      if (unref(isView)) {
        console.log(121212);
        updateSchema(formSchema.map(item => ({ ...item, componentProps: { disabled: true }})));
      }
      else
      {
        updateSchema(formSchema.map(item => ({ ...item, componentProps: { disabled: false }})));
      }
   
    });
    const getTitle = computed(() => {
      if (unref(isView)) {
        return t('查看作业');
      } else {
        return !unref(isUpdate) ? t('添加作业') : t('修改作业');
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
        let remark:any={
          desc: values.desc,
          dueDate: values.dueDate,
          imageUrl: values.imageUrl,
        }
        remark = JSON.stringify(remark);
        values.remark = remark;
        values.status=values.status?values.status:0;
        setModalProps({ confirmLoading: true });
        id? values.id = id : null;
        await homeworkSaveOrUpdate(values);
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
