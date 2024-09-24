<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <!-- <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t("common.addText") }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="[
      {
        icon: 'clarity:note-edit-line',
        tooltip: '修改',
        onClick: handleEdit.bind(null, record),

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
    ]" />
      </template> -->
    </BasicTable>
    <HomeWorkModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
import { defineComponent, unref } from "vue";
import { BasicTable, TableAction, useTable } from "/@/components/Table";
import { useModal } from "/@/components/Modal";
import { newColumns, searchFormSchema } from "./remedial.data";
import { useI18n } from "/@/hooks/web/useI18n";
import { usePermission } from "/@/hooks/web/usePermission";
import { useMessage } from "/@/hooks/web/useMessage";
import { PopConfirmButton } from "/@/components/Button";
import { remediationList, remediationDelete } from "/@/api/remedial";
import HomeWorkModal from "./remedialModal.vue";
export default defineComponent({
  name: "HomeworkIndex",
  components: {
    PopConfirmButton,
    BasicTable,
    TableAction,
    HomeWorkModal,
  },
  setup() {
    const { t } = useI18n();
    const { hasPermission } = usePermission();
    const { createMessage } = useMessage();
    const [registerModal, { openModal }] = useModal();
    const [registerImageModal] = useModal();
    const [
      registerTable,
      { reload, getSelectRows, clearSelectedRowKeys },
    ] = useTable({
      title: "结算列表",
      api: remediationList,
      columns:newColumns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
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
      // actionColumn: {
      //   width: 200,
      //   title: t("common.operationText"),
      //   dataIndex: "action",
      //   slots: { customRender: "action" },
      //   fixed: 'right',
      // },
    });
    // async function getRawData() {
    //   console.log("请在控制台查看！");
    //   const rawData = getRawDataSource();
    //   console.log(rawData);
    // }
    function handleCreate() {
      openModal(true, {
        isUpdate: false,
        isView: false
      });
    }

    function handleEdit(record: Recordable) {
      console.log(record, 11212112)
      openModal(true, {
        record,
        isUpdate: true,
        isView: false,
      });
    }
    // 查看
    function handleLook(record: Recordable) {
      openModal(true, {
        record,
        isView: true,
      });
    }
    // 查看学生提交作业
    function handleSuccess(isUpdate) {
      let msg = t("创建作业成功");
      if (isUpdate && !unref(isUpdate)) {
        msg = "修改作业成功";
      }
      createMessage.success(msg);
      reload();
    }
    /**
     * 删除
     */
    async function handleDelete(record: Recordable) {
      await remediationDelete(record.id);
      createMessage.success(t("删除成功"));
      reload();
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

    return {
      t,
      hasPermission,
      registerTable,
      registerModal,
      registerImageModal,
      handleCreate,
      handleEdit,
      handleLook,
      handleSuccess,
      handleUploadSuccess,
      handleDelete
    };
  },
});
</script>

<style scoped></style>
