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
    align: 'left',
  },
  {
    title: '课程名称',
    dataIndex: 'course',
  },
  {
    title: '错题描述',
    dataIndex: 'desc',
  },
  {
    title: '关键点',
    dataIndex: 'keyPoint',
  },
  {
    title: '难点',
    dataIndex: 'hardPoint',
  },
  {
    title: '原因描述',
    dataIndex: 'causeDesc',
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
    field: 'desc',
    label: '描述',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'keyPoint',
    label: '关键点',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'hardPoint',
    label: '难点',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'causeDesc',
    label: '原因描述',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    label: '作业材料',
    field: 'files',
    component: 'Input',
    render: ({ model, field }) => {
      return h(SgUpload, {
        value: model['imageUrl'],
        imageId: model[field],
        api: uploadImage,
        accept: '.jpg,.jpeg,.png',
        handleDone: (value) => {
          if (value) {
            model[field] = unref(value).id;
            model['imageUrl'] = unref(value).url;
          }
        },
      });
    },
    colProps: { span: 12 },
  },
];
