import { BasicColumn, FormSchema } from '/@/components/Table';
import { h, unref } from "vue";
import { SgUpload } from "/@/components/SgUpload";
import { uploadImage } from "/@/api/exam/examMedia";
import { Tinymce } from "/@/components/Tinymce";
import { updateGradeOptions,updateSubjectOptions } from '/@/data/grade'
import {
  editorHeight,
  tinymcePlugins,
  tinymceToolbar
} from "/@/components/Subjects/subject.constant";
import { ExamMediaApi } from "/@/api/api";
import { getSelectUserList} from "/@/api/sys/select";
export const columns: BasicColumn[] = [
  {
    title: '序号',
    width: 50,
    customRender: ({index}) => index + 1,
  },
  // {
  //   title: '教育阶段',
  //   dataIndex: 'stage',
  //   customRender: ({ record }) => {
  //     let remark=JSON.parse(record.remark);
  //     return remark?.stage
  //   }
  // },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '课程名称',
    dataIndex: 'course',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
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
    title: '辅导单价（元）',
    dataIndex: 'price',
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
    field: 'serviceDate',
    label: '服务日期',
    helpMessage: ['服务日期'],
    component: 'DatePicker',
    componentProps: {
      style: { width: '100%' },
      'show-time': true,
      valueFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    },
    colProps: { span: 12 },
  },
  {
    field: 'studentId',
    label: '辅导学生',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: getSelectUserList,
      showSearch:true,
      resultField: 'list',
      labelField:'name',
      optionFilterProp:'label',
      valueField:'id',
      immediate:true,
      numberToString:true,
    },
  },
  {
    field: 'stage',
    label: '教育阶段',
    component: 'Select',
    componentProps: {
      placeholder: '请选择教育阶段',
      options: [
        { label: '小学', value: '小学'},
        { label: '初中', value: '初中'},
        { label: '高中', value: '高中'},
      ],
      onChange: (value) => {
         updateGradeOptions(value,formSchema);
      },
      value:''
    },
    colProps: { span: 12 },
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Select',
    colProps: { span:12 },
    componentProps: {
      placeholder: '请选择年级',
      options: [],
      value:'',
      onChange: (value: string) => {
        // 根据选中的阶段更新年级选项
        updateSubjectOptions(value,formSchema,'course');
      },
    },
  },
  {
    field: 'course',
    label: '课程名称',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      placeholder: '请选择课程名称',
      options: [],
    },
  },

  {
    field: 'hours',
    label: '辅导时长（小时）',
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
    label: '内容大类',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },
  {
    field: 'homeworkCause',
    label: '内容明细',
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
    label: '弱点描述',
    component: 'Input',
    required: false,
    colProps: { span: 12 },
  },

  {
    field: 'teacherName',
    label: '辅导老师',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: getSelectUserList,
      showSearch:true,
      resultField: 'list',
      labelField:'name',
      optionFilterProp:'label',
      valueField:'id',
      immediate:true,
      numberToString:true,
    },
  },
  {
    field: 'price',
    label: '辅导单价（元/个小时）',
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
