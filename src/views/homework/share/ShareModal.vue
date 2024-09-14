<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="作业详情" :defaultFullscreen="true" :closable="false"
    :showCancelBtn="false" :showOkBtn="false">
    <BasicForm @register="registerForm">
    </BasicForm>
    <!-- 分享连接 -->
    <template #footer>
      <a-button type="link" @click="linkUrl">分享链接</a-button>
      <a-button type="primary" @click="createQrcode">生成二维码</a-button>
    </template>
    <QrCode :value="qrCodeUrl" v-show="showQrCode" :logo="logo" ref="qrRef" />
    <a-button type="primary" @click="doneQrCode" v-show="showQrCode">下载二维码</a-button>
  </BasicModal>
</template>
<script lang=" ts">
      import { defineComponent, ref, computed, unref, reactive, watch } from 'vue';
      import { BasicModal, useModalInner } from '/@/components/Modal';
      import { BasicForm, useForm } from '/@/components/Form/index';
      import  dayjs from 'dayjs'
      import { formSchema } from '../homework.data';
      import { QrCode } from '/@/components/Qrcode/index';
      import Logo from '/@/assets/images/logo.png';
      import { useMessage } from "/@/hooks/web/useMessage";
      import { updateGradeOptions, updateSubjectOptions } from '/@/data/grade'
      import {useUserStore} from '/@/store/modules/user';
      export default defineComponent({
      name: 'HomeWorkModal',
      components: { BasicModal, BasicForm, QrCode },
      emits: ['success', 'register'],

      setup(_, { emit }) {
      const logo=Logo
    const { createMessage } = useMessage();
      
          const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
          labelWidth: 100,
          schemas: formSchema,
          showActionButtonGroup: false,
          });
          console.log(registerForm);
          const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
          resetFields();
          console.log('data', data)
          setModalProps({ confirmLoading: false, defaultFullscreen: true });
          data.record.date= dayjs(data.record.date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
          try {
          let remark = JSON.parse(data.record.remark);
          data.record.desc = remark.desc;
          data.record.dueDate = remark.dueDate;
          data.record.imageUrl = remark.imageUrl;
          data.record.stage = remark.stage ? remark.stage : '';
          } catch (error) {
          console.log(error);
          }
          updateGradeOptions(data.record.stage, formSchema);
          updateSubjectOptions(data.record.grade, formSchema);
          setFieldsValue({
          ...data.record,
          });
          updateSchema(formSchema.map(item => ({ ...item, componentProps: { disabled: true } })));


          });
          function linkUrl() {
          // 复制当前网站地址 并携带token
          const url = window.location.href;
          const input = document.createElement('input');
          document.body.appendChild(input);
          input.setAttribute('value', url);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
          createMessage.success('复制链接成功');
          }
          let qrCodeUrl =ref('')
          let showQrCode = ref(false)
          function createQrcode() {
          // 生成二维码
          qrCodeUrl.value = window.location.href;
          showQrCode.value = true;
          }
          // 下载二维码
          const qrRef = ref(null);
            function doneQrCode(e) {
            const qrEl = unref(qrRef);
            console.log('first', qrEl)
            if (!qrEl) return;
            qrEl.download('二维码');
            }
            return {  registerModal, registerForm,
            linkUrl,createQrcode,qrCodeUrl,showQrCode,logo,doneQrCode,qrRef };
            },

            });
            </script>
