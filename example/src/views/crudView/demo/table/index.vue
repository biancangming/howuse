<template>
  <AntdBaseTable :columns="columns" :actions="actions" :dataSource="data.data" :scroll="{x: 1500}"/>
</template>
<script lang="ts" setup>
import { AntdBaseTable } from "howuse/crud"
import { useDefRequest } from '../useAntdCrudSearch/request';
import { message } from 'ant-design-vue';

const { data } = useDefRequest<{ data: [] }>({ url: "/user/list2" }, { immediate: true })

// 原生代码使用title，此处label替代，可能要与表单结合，此处替换比较方便
const columns = [
  {
    label: "ID",
    dataIndex: "id"
  },
  {
    label: "用户名",
    dataIndex: "username"
  },
  {
    label: "日期",
    dataIndex: "date"
  },
  {
    label: "描述",
    dataIndex: "description",
    ellipsis: true
  },
  {
    label: "邮件",
    dataIndex: "email"
  }
]

const actions = [
  {
    label: "编辑",
    dataIndex: "edit",
    onClick(column) {
      message.success("我是编辑")
    }
  },
  {
    label: "删除",
    dataIndex: "delete",
    confirm: "确定删除这条信息吗？", // 增加confirm 会自动触发二次确认
    onClick(column) {
      message.error(JSON.stringify(column))
    }
  },
  {
    label: "其它乱七八槽骚操作",
    dataIndex: "other",
    onClick(column) {
      message.success("我是乱七八糟")
    }
  },
]
</script>
<style lang="less" scoped>

</style>