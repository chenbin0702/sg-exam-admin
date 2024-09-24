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
    title: '学期',
    dataIndex: 'title',
  },
  {
    title: '课程名称',
    dataIndex: 'course',
  },
  // {
  //   title:'上午/下午',
  //   dataIndex:'session',
  // },
  {
    title:'课节数',
    dataIndex:'lesson',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
  },
  {
    title: '日期',
    dataIndex: 'date',
  },

];
export const searchFormSchema: FormSchema[]=
[
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
    colProps: { span: 8},
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
    colProps: { span: 8},
  },
  {
      field:'semester',
      label:'学期',
      component:'Select',
      componentProps:({ })=>{
        return {
          options: [
            { label: '上学期', value: '上学期' },
            { label: '下学期', value: '下学期' },
          ],
        };
      },
      colProps: { span: 8},
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
    colProps: { span: 8},
  },
  {
    field: 'lesson',
    label: '课节数',
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      // 第一节 第二节 
      options: [
        { label: '第一节', value: '第一节' },
        { label: '第二节', value: '第二节' },
        { label: '第三节', value: '第三节' },
        { label: '第四节', value: '第四节' },
        { label: '第五节', value: '第五节' },
        { label: '第六节', value: '第六节' },
        { label: '第七节', value: '第七节' },
        { label: '第八节', value: '第八节' },
      ],
    },
  },
  {
    field: 'studentName',
    label: '学生姓名',
    component: 'ApiSelect',
    colProps: { span: 8 },
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
    field: 'date',
    label: '日期',
    component: 'DatePicker',
    colProps: { span: 8 },
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
]
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
      field:'semester',
      label:'学期',
      component:'Select',
      componentProps:({ })=>{
        return {
          options: [
            { label: '上学期', value: '上学期' },
            { label: '下学期', value: '下学期' },
          ],
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
    field: 'lesson',
    label: '课节数',
    component: 'Select',
    colProps: { span: 12 },
    componentProps: {
      // 第一节 第二节 
      options: [
        { label: '第一节', value: '第一节' },
        { label: '第二节', value: '第二节' },
        { label: '第三节', value: '第三节' },
        { label: '第四节', value: '第四节' },
        { label: '第五节', value: '第五节' },
        { label: '第六节', value: '第六节' },
        { label: '第七节', value: '第七节' },
        { label: '第八节', value: '第八节' },
      ],
    },
  },
  {
    field: 'studentName',
    label: '学生姓名',
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
    field: 'date',
    label: '日期',
    component: 'DatePicker',
    colProps: { span: 12 },
    componentProps: {
      format: 'YYYY-MM-DD',
      style: { width: '100%' },
    },
  },
];
