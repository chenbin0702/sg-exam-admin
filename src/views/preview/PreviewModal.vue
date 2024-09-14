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
import { formSchema } from './preview.data';
import { prepareSaveOrUpdate } from "/@/api/preview/index";
import {  getSelectUserList } from "/@/api/sys/select";
import { useMessage } from "/@/hooks/web/useMessage";
import { updateGradeOptions, updateSubjectOptions } from '/@/data/grade'
import {useUserStore} from "/@/store/modules/user";
export default defineComponent({
  name: 'HomeWorkModal',
  components: { BasicModal, BasicForm,  },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const { t } = useI18n();
    const isUpdate = ref(true);
    const userStore=useUserStore()
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
           data.record.files=JSON.parse(data.record.files)
           data.record.date=JSON.parse(data.record.desc).date
           data.record.descConetnt=JSON.parse(data.record.desc).descConetnt
           data.record.dueDate=JSON.parse(data.record.desc).dueDate
           data.record.stage = JSON.parse(data.record.desc).stage ? JSON.parse(data.record.desc).stage : '';   
        } catch (err) {
          
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
    const UserList = ref([]);
    async function getSelectUserAllList() {
      const {list} = await getSelectUserList();
      UserList.value = list;
    }

    
    const getTitle = computed(() => {
      if (unref(isView)) {
        return t('查看预习');
      } else {
        return !unref(isUpdate) ? t('添加预习') : t('修改预习');
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
        setModalProps({ confirmLoading: true });
        id? values.id = id : '';
        values.status=values.status?values.status:0;
        values.files=JSON.stringify(values.files);
        let desc:any={
          descConetnt: values.descConetnt,
          dueDate: values.dueDate,
          date: values.date,
          stage: values.stage,
        }
        desc = JSON.stringify(desc);
        values.desc = desc;
        values.creatId=userStore.userInfo?.id
        values.creatName=userStore.userInfo?.name
        values.studentName=UserList.value.find((item: { id: any; }) => item.id == values.studentId).name
        await prepareSaveOrUpdate(values);
        console.log(values,UserList.value);
        closeModal();
        emit('success', isUpdate);
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    function onSearch(value: string) {
      name.value = value;
    }
    getSelectUserAllList();
    return { searchParams, registerModal, registerForm, getTitle, handleSubmit, getSelectUserList, onSearch };
  },
});
</script>
