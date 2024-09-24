import {BasicColumn, FormSchema} from '/@/components/Table';
import {h, unref} from "vue";
import {Tag} from "ant-design-vue";
import {SgUpload} from "/@/components/SgUpload";
import {uploadImage} from "/@/api/exam/examMedia";
import {Tinymce} from "/@/components/Tinymce";
import { updateGradeOptions,updateSubjectOptions } from '/@/data/grade'
// 导入Select组件
import { Select } from 'ant-design-vue';
import {
  editorHeight,
  tinymcePlugins,
  tinymceToolbar
} from "/@/components/Subjects/subject.constant";
import {ExamMediaApi} from "/@/api/api";
import { getUserList} from "/@/api/sys/user";
import dayjs from 'dayjs';
import moment from 'moment';
import { filter } from '../../utils/helper/treeHelper';
export const columns: BasicColumn[] = [
  {
    title:'序号',
    width: 80,
    dataIndex:'index',
    customRender: ({index}) => index + 1,
  },
  {
    title: '教育阶段',
    dataIndex: 'stage',
    customRender: ({ record }) => {
      let remark=JSON.parse(record.remark);
      return remark?.stage
    }
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
  },
  {
    title: '作业标题',
    dataIndex: 'title',
  },
  {
    title: '作业日期',
    dataIndex: 'date',
    customRender: ({ record }) => {
      return record.date?dayjs(record.date).format('YYYY-MM-DD HH:mm:ss'):''
    }
  },
  {
    title: '截止日期',
    customRender: ({ record }) => {
      let remark
      try {
        remark = JSON.parse(record.remark)
        return dayjs(remark.dueDate).format('YYYY-MM-DD HH:mm:ss')
      } catch (error) {
        return ''
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'status',
    slots: {
      customRender: 'statusRender',
    },
    customRender: ({ record: { status } }) => {
      const colors = ['red', 'green'];
      const statusJson = {
        '0': '未提交',
        '1': '已提交',
      };
      return h(Tag, { color: colors[status] }, () => statusJson[status] || '--');
    },

  }
];

export const searchFormSchema: FormSchema[] = [
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
         updateGradeOptions(value,searchFormSchema);
      },
      value:''
    },
    colProps: { span: 6 },
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Select',
    colProps: { span:6 },
    componentProps: {
      placeholder: '请选择年级',
      options: [],
      value:'',
      onChange: (value: string) => {
        // 根据选中的阶段更新年级选项
        updateSubjectOptions(value,searchFormSchema);
      },
    },
  },
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择课程名称',
      options: [],
    },
  },
  {
    field: 'title',
    label: '作业标题',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'date',
    label: '作业日期',
    helpMessage: ['作业日期'],
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component:'Select',
    componentProps:{
      options:[
        {
          label:'未完成',
          value:'0'
        },
        {
          label:'已完成',
          value:'1'
        }
      ],
      style: { width: '100%' },
    },
    colProps: { span: 6 },
  },
  {
    field: 'studentId',
    label: '学生',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      api: getUserList,
      showSearch:true,
      resultField: 'list',
      params:{
      },
      labelField:'name',
      optionFilterProp:'label',
      valueField:'id',
      immediate:true,
      numberToString:true,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'stage',
    label: '教育阶段',
    component: 'Select',
    componentProps:{      
        value:''    
    },
   render: ({model,field}) => { {
    return h(Select, {
      placeholder: '请选择教育阶段',
      options: [
        { label: '小学', value: '小学'},
        { label: '初中', value: '初中'},
        { label: '高中', value: '高中'},
      ],
      value: model[field],
      onChange: (value) => {   
        model[field] = value;  
        model['grade'] = '';
        model['courseName'] = '';
        updateGradeOptions(value,formSchema);
      }
    });
  }
   },
    colProps: { span: 12 },
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Select',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      placeholder: '请选择年级',
      options: [],
      value:'',
      allowClear: true,
      onChange: (value) => {
        updateSubjectOptions(value,formSchema);
      },
    },
  },
  
  {
    field: 'courseName',
    label: '课程名称',
    component: 'Select',
    required: true,
    colProps: { span: 12 },
    componentProps: {
      placeholder: '请选择课程名称',
      value:'',
      options: [],
      allowClear: true,
      onChange:(value)=>{
       
      }
      
    },
  },
  {
    field: 'title',
    label: '作业标题',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'studentId',
    label: '学生',
    component: 'ApiSelect',
    colProps: { span: 12 },
    componentProps: {
      api: getUserList,
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
    label: '作业日期',
    helpMessage: ['作业日期'],
    component: 'DatePicker',
    defaultValue:moment().hours(12).minutes(0).seconds(0),
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
      style: { width: '100%' },
    
    },
    colProps: { span: 12 },
  },
  {
    field: 'dueDate',
    label: '截止日期',
    helpMessage: ['作业截止日期'],
    component: 'DatePicker',
    defaultValue:moment().hours(23).minutes(59).seconds(59),
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
      style: { width: '100%' },
    },
    colProps: { span: 12 },
  },
  {
    label: '作业材料',
    field: 'files',
    component: 'Input',
    componentProps:{
      disabled: true
    },
    render: ({model, field}) => {
      const item = formSchema.find(item => item.field === field);
      return h(SgUpload, {
        value: model['imageUrl'],
        imageId: model[field],
        disabled: item && item.componentProps ? item.componentProps.disabled : false,
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
  {
    field: 'imageUrl',
    label: '图片 URL',
    component: 'Input',
    componentProps:{
      readonly: true
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '作业描述',
    field: 'desc',
    component: 'Input',
    componentProps: {
      readonly:false,
    },
    render: ({model, field}) => {
      const item = formSchema.find(item => item.field === field);
      return h(Tinymce, {
        value: model[field],
        height: 500,
        readonly: item && item.componentProps ? item.componentProps.readonly : false,
        plugins: tinymcePlugins,
        toolbar: tinymceToolbar,
        uploadUrl: ExamMediaApi.UploadImage,
        onChange: (value: string) => {
          model[field] = value;
        },
      });
    },
  },
];
export const shareFormSchema = formSchema.map(item => {
  if (item.field === 'studentId') {
    return {
      field: 'studentName',
      label: '学生',
      component: 'Input',
      componentProps: {
        placeholder: '请输入学生姓名',
      },
      colProps: { span: 12 },
    };
  }
  return item;
});

