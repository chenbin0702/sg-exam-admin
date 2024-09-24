<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          新增
        </a-button>
      </template>
      <TableAction slot="action">
        <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          新增
        </a-button>
      </template>
        <template #search>
          <div>
            <a-button type="primary" @click="reload">刷新</a-button>
          </div>
        </template>
      </TableAction>
    </BasicTable>
    <ScheduleModal @register="registerModal"></ScheduleModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BasicTable, TableAction, useTable } from "/@/components/Table";
import {columns,searchFormSchema} from './data'
import  ScheduleModal from './schedule-modal.vue'
import { useModal } from '/@/components/Modal';
export default defineComponent({
  components: { BasicTable,TableAction,ScheduleModal },
  setup () {
    const [registerTable,{reload, getSelectRows}]=useTable({
      title:'学期课程表',
      columns:columns, 
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      pagination: true,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 200,
        title:'操作',
        dataIndex: "action",
        slots: { customRender: "action" },
        fixed: 'right',
      },
    })
    const [registerModal,{ openModal }] = useModal();
    function handleCreate() {
      openModal(true,{
      })
      console.log('新增')
    }
    return {
      registerTable,reload,registerModal,handleCreate
    }
  }
})
</script>

<style scoped>

</style>
