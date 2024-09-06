import {BasicColumn, FormSchema} from '/@/components/Table';
import {h, unref} from "vue";
import {Tag} from "ant-design-vue";
import {Tinymce} from "/@/components/Tinymce";
import {
  editorHeight,
  tinymcePlugins,
  tinymceToolbar
} from "/@/components/Subjects/subject.constant";
import { uploadApi } from '/@/api/attachment/attach';
import {ExamMediaApi} from "/@/api/api";
export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex:'index',
    width: 50,
    customRender: ({index}) => index + 1,
  },
  {
    title: '课程名称',
    dataIndex: 'course',
    align: 'left',
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '预习内容标题',
    dataIndex: 'title',
  },
  {
    title: '作业日期',
    customRender: ({ record }) => {
      let desc
      try {
        desc = JSON.parse(record.desc)
        return desc.date
      } catch (error) {
        return ''
      }
    }
  },
  {
    title: '截止日期',
    customRender: ({ record }) => {
      let desc
      try {
        desc = JSON.parse(record.desc)
        return desc.dueDate
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
    field: 'courseName',
    label: '课程名称',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Input',
    colProps: {span: 6},
  },
  {
    field: 'title',
    label: '作业标题',
    component: 'Input',
    colProps: {span: 6},
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'course',
    label: '课程名称',
    component: 'Input',
    required: true,
    colProps: { span: 12 },   
  },
  {
    field: 'grade',
    label: '年级',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'title',
    label: '预习内容标题',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'date',
    label: '预习日期',
    helpMessage: ['预习日期'],
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    colProps: { span: 12 },
  },
  {
    field: 'dueDate',
    label: '截止日期',
    helpMessage: ['截止日期'],
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    colProps: { span: 12 },
  },
  {
    field: 'files',
    label: '上传文件',
    component: 'Upload',
    colProps: { span: 12 },
    componentProps: {
      multiple: true,
      // action: AttachmentApi.Upload,
      api:uploadApi,
      listType: 'picture-card',
      maxCount: 10,
      beforeUpload: (file: File) => {
        const isPdf = file.type === 'application/pdf';
        const isDoc = file.type.includes('msword') || file.type.includes('vnd.openxmlformats-officedocument.wordprocessingml');
        const isPpt = file.type.includes('mspowerpoint') || file.type.includes('vnd.openxmlformats-officedocument.presentationml');
        const isXls = file.type.includes('msexcel') || file.type.includes('vnd.openxmlformats-officedocument.spreadsheetml');
        const isTxt = file.type.includes('text/plain');
        const isImage= file.type.includes('image');
        if (!isPdf && !isDoc && !isPpt && !isXls && !isTxt && !isImage) {
          console.log('请上传正确的文件类型');
          return false;
        }
        return true;
      },
      onPreview: (file: File) => {
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e:any) => {
          console.log(e.target?.result)
          window.open(e.target?.result);
        };
       
      },
      
    }
  },
  {
    label: '预习内容描述',
    field: 'descConetnt',
    component: 'Input',
    render: ({model, field}) => {
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
  },
];

