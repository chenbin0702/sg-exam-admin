import { BasicColumn, FormSchema } from '/@/components/Table';
import { h, unref } from "vue";
import { SgUpload } from "/@/components/SgUpload";
import { uploadImage } from "/@/api/exam/examMedia";
import { Tinymce } from "/@/components/Tinymce";
import {
  editorHeight,
  tinymcePlugins,
  tinymceToolbar
} from "/@/components/Subjects/subject.constant";
import { ExamMediaApi } from "/@/api/api";
export const columns: BasicColumn[] = [
  {
    title: '序号',
    width: 50,
    customRender: ({index}) => index + 1,
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '课程名称',
    dataIndex: 'course',
  },
  {
    title: '辅导时长',
    dataIndex: 'hours',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '补习情况说明',
    dataIndex: 'causeDesc',
  },
  {
    title: '学生弱点描述',
    dataIndex: 'vulnerabilityDescription',
  },
  {
    title: '作业原因',
    dataIndex: 'homeworkCause',
  },
  {
    title: '辅导老师',
    dataIndex: 'teacherName',
  },
  {
    title: '辅导总价（元）',
    dataIndex: 'totalPrice',
  },
  {
    title: '服务日期',
    dataIndex: 'serviceDate',
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'title',
    label: '作业标题',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'grade',
    label: '年级',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'course',
    label: '课程名称',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'hours',
    label: '辅导时长',
    component: 'InputNumber',
    componentProps:{
      min: 0,
      max: 1000,
      step: 1,
      style: { width: '100%' },
    },
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'desc',
    label: '描述',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'causeDesc',
    label: '补习情况说明',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'vulnerabilityDescription',
    label: '学生弱点描述',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'homeworkCause',
    label: '作业原因',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'teacherName',
    label: '辅导老师',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'totalPrice',
    label: '辅导总价（元）',
    component: 'InputNumber',
    componentProps:{
      min: 0,
      step: 1,
      style: { width: '100%' },
    },
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'serviceDate',
    label: '服务日期',
    helpMessage: ['服务日期'],
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    colProps: { span: 12 },
  },
  {
    field: 'homeworkDescription',
    label: '课后作业描述',
    component: 'Input',
    render: ({ model, field }) => {
      return h(Tinymce, {
        value: model[field],
        height: editorHeight,
        plugins: tinymcePlugins,
        toolbar: tinymceToolbar,
        uploadUrl: ExamMediaApi.UploadImage,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
    colProps: { span: 24 },
  },
];
