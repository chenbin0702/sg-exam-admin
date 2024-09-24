import { BasicColumn, FormSchema } from '/@/components/Table';
import component from '../../components/SgAudioPlayer/env';
import {ref} from 'vue'
import {useGradeStore} from '/@/store/modules/grade'
const gradeStore = useGradeStore();
import { getSelectUserList } from "/@/api/sys/select";
const stageOptions=ref(gradeStore.stageOptions);
export const columns: BasicColumn[] = [
  {
    title: '教育阶段',
    dataIndex: 'stage',
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
    title: '参与人员',
    dataIndex: 'studentName',
  },
  {
    title: '确认人',
    dataIndex: 'teacherName',
  },
  {
    title: '作业大类',
    dataIndex: 'title',
  },
  {
    title: '作业小类',
    dataIndex: 'title',
  },
  {
    title: '使用材料',
    dataIndex: 'material',
  },
  {
    title: '规划内容',
    dataIndex: 'content',
  },
  {
    title: '规划日期',
    dataIndex: 'content',
  },
  {
    title: '要求开始时间',
    dataIndex: 'content',
  },
  {
    title: '要求结束时间',
    dataIndex: 'content',
  },
];
export const searchFormSchema: FormSchema[] =
  [
    {
      field: 'stage',
      label: '教育阶段',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'grade',
      label: '年级',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'course',
      label: '课程名称',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'studentName',
      label: '参与人员',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'teacherName',
      label: '确认人',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'title',
      label: '作业大类',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'title',
      label: '作业小类',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'material',
      label: '使用材料',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'content',
      label: '规划内容',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'content',
      label: '规划日期',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'content',
      label: '要求开始时间',
      component: 'Input',
      colProps: { span: 8 },
    },
    {
      field: 'content',
      label: '要求结束时间',
      component: 'Input',
      colProps: { span: 8 },
    },
  ];
export const formSchema: FormSchema[] = [
  {
    field: 'stage',
    label: '教育阶段',
    component: 'Select',
    componentProps:({ schema, tableAction, formActionType, formModel })=>{
      return {
        options: stageOptions.value,
        onChange:(val)=>{
          gradeStore.setGradeOptions(val);
          formModel.grade = '';
          formModel.course = '';
        }
      };
    },
    // slot: 'stageSlot',
    colProps: { span: 12},
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Select',
    componentProps:({ schema, tableAction, formActionType, formModel })=>{
      return {
        options: gradeStore.gradeOptions,
        onChange:(val)=>{
          console.log('grade',val,formModel.stage);
          gradeStore.setCourseOptions(formModel.stage,val);
          formModel.course = '';
        }
      };
    },
    colProps: { span: 12},
  },
  {
    field: 'course',
    label: '课程名称',
    component: 'Select',
    componentProps:({ })=>{
      return {
        options: gradeStore.courseOptions,
      };
    },
    colProps: { span: 12},
  },
  {
    field: 'studentName',
    label: '参与人员',
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
    field: 'teacherName',
    label: '确认人',
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
    field: 'title',
    label: '作业大类',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '学校作业', value: '学校作业' },
        { label: '学校补习', value: '学校补习' },
        {
          label:'外部补习',value:'外部补习'
        }
      ],
    },
  },
  {
    field: 'title1',
    label: '作业小类',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      options: [
        { label: '授课', value: '授课' },
        { label: '预习', value: '预习' },
        { label: '背诵', value: '背诵' },
        { label: '听写', value: '听写' },
        { label: '默写', value: '默写' },
        { label: '做单元题目', value: '做单元题目' },
        { label: '做试卷', value: '做试卷' },
        { label: '错题辅导', value: '错题辅导' },
        { label: '考前辅导', value: '考前辅导' },
      ],
    },
  },
  {
    field: 'material',
    label: '使用材料',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'content',
    label: '规划内容',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'content',
    label: '规划日期',
    component: 'DatePicker',
    colProps: { span: 12 },
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
  {
    field: 'content1',
    label: '要求开始时间',
    component: 'DatePicker',
    colProps: { span: 12 },
    componentProps:{
      format: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    }
  },
  {
    field: 'content2',
    label: '要求结束时间',
    component: 'DatePicker',
    colProps: { span: 12 },
    componentProps:{
      format: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    }
  },
];
