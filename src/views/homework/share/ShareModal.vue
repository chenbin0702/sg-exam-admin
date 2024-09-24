<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="作业详情"
    :defaultFullscreen="true"
    :closable="true"
    :showCancelBtn="false"
    :showOkBtn="false"
    :canFullscreen="false"
    @cancel="backTo"
  >
    <BasicForm @register="registerForm"> </BasicForm>
    <!-- 分享连接 -->
    <template #footer>
      <a-button type="link" @click="linkUrl">复制分享链接</a-button>
      <a-button type="primary" @click="createQrcode">生成二维码</a-button>
    </template>
    <QrCode
      :value="qrCodeUrl"
      v-show="showQrCode"
      :logo="logo"
      ref="qrRef"
      @done="onQrcodeDone"
      :options="QrcodeOptions"
    />
    <a-button type="primary" @click="doneQrCode" v-show="showQrCode">下载二维码</a-button>
  </BasicModal>
</template>
<script lang=" ts">
        import { defineComponent, ref, computed, unref, reactive, watch, render, h } from 'vue';
        import { BasicModal, useModalInner } from '/@/components/Modal';
        import { BasicForm, useForm } from '/@/components/Form/index';
        import  dayjs from 'dayjs'
        import { shareFormSchema } from '../homework.data';
        import { QrCode } from '/@/components/Qrcode/index';
        import Logo from '/@/assets/images/logo.png';
        import { useMessage } from "/@/hooks/web/useMessage";
        import { updateGradeOptions, updateSubjectOptions } from '/@/data/grade'
        import {useUserStore} from '/@/store/modules/user';
        import { Input } from 'ant-design-vue';
    import useClipboard from 'vue-clipboard3';
    import { useRouter } from 'vue-router';
        export default defineComponent({
        name: 'HomeWorkModal',
        components: { BasicModal, BasicForm, QrCode },
        emits: ['success', 'register'],

        setup(_, { emit }) {
        const logo=Logo
      const { createMessage } = useMessage();
      const { toClipboard } = useClipboard();
      const QrcodeOptions = {
        width: 300,
        height: 300,
        margin: 20,
        color: {
          dark: '#000000ff',
          light: '#ffffffff',
        },
        borderRadius: 10,
        correctLevel: 'H',
      };
      let infoData=reactive({})
            const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
            labelWidth: 100,
            schemas: shareFormSchema,
            showActionButtonGroup: false,
            });
            const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
            resetFields();
            setModalProps({ confirmLoading: false, defaultFullscreen: true });

            if(data.record.date)
           data.record.date= dayjs(Number(data.record.date)).format('YYYY-MM-DD HH:mm:ss');
            updateGradeOptions(data.record.stage, shareFormSchema);
            updateSubjectOptions(data.record.grade, shareFormSchema);
            console.log('date', data)
            setFieldsValue({
            ...data.record,
            });
            infoData=data.record
            updateSchema(shareFormSchema.map(item => ({ ...item, componentProps: { disabled: true } })));
            });
             async function  linkUrl() {
            const url = window.location.href;
             await toClipboard(url);
            createMessage.success('复制链接成功');
            }
            // const input = document.createElement('input');
            // document.body.appendChild(input);
            // input.setAttribute('value', url);
            // input.select();
            // document.execCommand('copy');
            // document.body.removeChild(input);
            // createMessage.success('复制链接成功');

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
              // 返回
              const router=useRouter()
              function backTo() {
               router.go(-1)

              }
              // 绘制二维码
              function onQrcodeDone({ ctx }) {
    if (ctx instanceof CanvasRenderingContext2D) {
      // 额外绘制
      ctx.fillStyle = '#536dfe';
      ctx.font = '16px "微软雅黑"';
      ctx.textBaseline = 'bottom';
      ctx.textAlign = 'center';
      ctx.fillText(`${infoData.type=='0'?'学校作业':'补习作业'}(${infoData.studentName})`, 150, 25, 300)
      ctx.fillText(`科目:${infoData.courseName}-作业:${infoData.title}`, 150, 45, 300);
      ctx.fillText(`完成状况:${infoData.status=='0'?'未完成':'已完成'}`, 150, 275, 300);
      ctx.fillText(`作业时间:${infoData.date}`, 150, 295, 300);
     // 绘制边框
     ctx.strokeStyle = '#a4d49d'; // 设置边框颜色
    ctx.lineWidth = 5; // 设置边框宽度
      // 定义圆角的半径
      const cornerRadius = 10;

  // 开始新的路径
  ctx.beginPath();
  // 左上角
  ctx.moveTo(cornerRadius, 0);
  // 右上角
  ctx.arcTo(300, 0, 300, 300, cornerRadius);
  // 右下角
  ctx.arcTo(300, 300, 0, 300, cornerRadius);
  // 左下角
  ctx.arcTo(0, 300, 0, 0, cornerRadius);
  // 回到左上角
  ctx.arcTo(0, 0, 300, 0, cornerRadius);
  // 关闭路径
  ctx.closePath();

  // 绘制边框
  ctx.stroke();
    }
  }
              return {  registerModal, registerForm,
              linkUrl,createQrcode,qrCodeUrl,showQrCode,logo,doneQrCode,qrRef,backTo, onQrcodeDone,QrcodeOptions};
              },

              });
</script>
