<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t("common.addText") }}
        </a-button>
      </template>
      <template #statusRender="{ text }">
        <span v-if="text == '0'" style="color: red">未提交</span>
        <span v-else-if="text == '1'" style="color: green">已提交</span>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '修改',
              onClick: handleEdit.bind(null, record),
              ifShow: record.status=='0',
            },
            {
              icon: 'ant-design:eye-outlined',
              tooltip: '查看',
              onClick: handleLook.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              popConfirm: {
                title: t('common.confirmDelText'),
                confirm: handleDelete.bind(null, record),
              },
            },
            {
              icon: 'ant-design:share-alt-outlined',
              tooltip: '分享',
              onClick: handleShare.bind(null, record),
            },
            {
              icon: 'ant-design:user-outlined',
              tooltip: '查看学生提交作业',
              onClick: handleLookHomework.bind(null, record),
              ifShow: record.status=='1',
            },
            {
              icon: 'ant-design:edit-outlined',
              tooltip: '批改作业',
              onClick: handleCorrectHomework.bind(null, record),
              ifShow: record.status=='1',
            },
          ]"
        />
      </template>
    </BasicTable>
    <HomeWorkModal @register="registerModal" @success="handleSuccess" />
    <StudentWorkModal @register="registerImageModal" />
    <CorrectModal @register="registerCorrectModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from "vue";
import { BasicTable, TableAction, useTable } from "/@/components/Table";
import { useModal } from "/@/components/Modal";
import { columns, searchFormSchema } from "./homework.data";
import { useI18n } from "/@/hooks/web/useI18n";
import { usePermission } from "/@/hooks/web/usePermission";
import { useMessage } from "/@/hooks/web/useMessage";
import { PopConfirmButton } from "/@/components/Button";
import { homeworkList,homeworkDelete } from "/@/api/homework/index";
import StudentWorkModal from "./StudentWorkModal.vue"
import CorrectModal from "./CorrectModal.vue"
import HomeWorkModal from "./HomeWorkModal.vue";
import {useUserStore} from "/@/store/modules/user";
import {useGo} from "/@/hooks/web/usePage";
export default defineComponent({
  name: "HomeworkIndex",
  components: {
    PopConfirmButton,
    BasicTable,
    TableAction,
    HomeWorkModal,
    StudentWorkModal,
    CorrectModal
  },
  setup() {
    const { t } = useI18n();
    const { hasPermission } = usePermission();
    const { createMessage } = useMessage();
    const userStore=useUserStore()
    const [registerModal, { openModal }] = useModal();
    const [registerImageModal,{openModal:openImageModal}] = useModal();
    const [registerCorrectModal,{openModal:openCorrectModal}] = useModal();
    const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
      title: "作业列表",
      api: homeworkList,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      searchInfo:{
        type:'1',
        creatId:String(userStore.getUserInfo?.id)
      },
      fetchSetting: {
        pageField: "page",
        sizeField: "size",
      },
      beforeFetch: async (searchParams) => {
        let searchParamsCopy = { ...searchParams };
        searchParamsCopy.page = searchParamsCopy.page - 1;
        return searchParamsCopy;
      },
      pagination: true,
      dataSource: [{}],
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      actionColumn: {
        width: 200,
        title: t("common.operationText"),
        dataIndex: "action",
        slots: { customRender: "action" },
        fixed: undefined,
      },
    });
     const go=useGo()
    function handleCreate() {
      openModal(true, {
        isUpdate: false,
        isView: false,
        type:'1'
      });
    }

    function handleEdit(record: Recordable) {
      console.log(record, 11212112);
      openModal(true, {
        record,
        isUpdate: true,
        isView: false,
        type:'1'
      });
    }
    // 查看
    function handleLook(record: Recordable) {
      openModal(true, {
        record,
        isView: true,
      });
    }
    // 分享 
    function handleShare(record: Recordable) {
      // 路由跳转
      go({path:'/share/homework',query:{record:JSON.stringify(record)}})
    }
    function handleSuccess(isUpdate) {
      let msg = t("创建作业成功");
      if (isUpdate) {
        msg = "修改作业成功";
      }
      createMessage.success(msg);
      reload();
    }
    function handleLookHomework(record: Recordable)
    {
      const imageList=JSON.parse(record.remark).imageList
      openImageModal(true,{
        imageList,
      })
    }
    function handleUploadSuccess() {
      reload();
    }

    function getSelectedRowIds() {
      const rows = getSelectRows();
      if (!rows || rows.length === 0) {
        return undefined;
      }

      const ids = [];
      rows.forEach((e) => {
        ids.push(e.id);
      });
      return ids;
    }
    // 删除作业
    async function handleDelete(record: Recordable) {
      console.log(record);
      await homeworkDelete(record.id);
      createMessage.success(t("删除作业成功"));
      reload();
    }
    // 批改学生作业
    function handleCorrectHomework(record: Recordable) {
      const imageList=JSON.parse(record.remark).imageList
      const newImageList = JSON.parse(record.remark)?.newImageList || [];
      console.log(imageList,newImageList)
      openCorrectModal(true,{
        imageList,
        newImageList,
        record
      })
    }
    return {
      t,
      hasPermission,
      registerTable,
      registerModal,
      registerImageModal,
      registerCorrectModal,
      handleCreate,
      handleEdit,
      handleLook,
      handleSuccess,
      handleUploadSuccess,
      handleLookHomework,
      handleDelete,
      handleShare,
      handleCorrectHomework
    };
  },
});
</script>

<style scoped></style>
