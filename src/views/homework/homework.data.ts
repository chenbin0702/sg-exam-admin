import {BasicColumn, FormSchema} from '/@/components/Table';
import {h, unref} from "vue";
import {Tag} from "ant-design-vue";
import {SgUpload} from "/@/components/SgUpload";
import {uploadImage} from "/@/api/exam/examMedia";
import {Tinymce} from "/@/components/Tinymce";
import {
  editorHeight,
  tinymcePlugins,
  tinymceToolbar
} from "/@/components/Subjects/subject.constant";
import {ExamMediaApi} from "/@/api/api";
export const columns: BasicColumn[] = [
  {
    title:'序号',
    width: 50,
    dataIndex:'index',
    customRender: ({index}) => index + 1,
  },
  {
    title: '课程名称',
    dataIndex: 'courseName',
    align: 'left',
  },
  {
    title: '年级',
    dataIndex: 'grade',
  },
  {
    title: '作业标题',
    dataIndex: 'title',
  },
  {
    title: '作业日期',
    dataIndex: 'date',
  },
  {
    title: '截止日期',
    customRender: ({ record }) => {
      let remark
      try {
        remark = JSON.parse(record.remark)
        return remark.dueDate
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
    field: 'courseName',
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
    label: '作业标题',
    component: 'Input',
    required: true,
    colProps: { span: 12 },
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
    colProps: { span: 12 },
  },
  {
    field: 'dueDate',
    label: '截止日期',
    helpMessage: ['作业截止日期'],
    component: 'DatePicker',
    componentProps: {
      'show-time': true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      style: { width: '100%' },
    },
    colProps: { span: 12 },
  },
  {
    label: '作业材料',
    field: 'files',
    component: 'Input',
    render: ({model, field}) => {
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
  {
    field: 'imageUrl',
    label: '图片 URL',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: '作业描述',
    field: 'desc',
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

