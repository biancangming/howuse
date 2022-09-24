<template>
  <AntdCrudForm :columns="columns"  @register="registerSearch"/>
  <AntdBaseTable :columns="columns" :actions="actions" :dataSource="data.data" :scroll="{x: 1500}" />
  <AntdCrudFormDrawer width="450px" v-model:visible="visible" title="编辑/新增" :columns="columns" @register="register" @submit="submit"/>
</template>
<script lang="ts" setup>
import { AntdBaseTable, AntdCrudForm, useAntdCrudForm, AntdCrudFormDrawer } from "howuse/crud"
import { useDefRequest } from '../useAntdCrudSearch/request';
import { message } from 'ant-design-vue';
import { CrudFormOpts } from "types/crud";

const visible = ref(false)

const { data } = useDefRequest<{ data: [] }>({ url: "/user/list2" }, { immediate: true })

// 原生代码使用title，此处label替代，可能要与表单结合，此处替换比较方便
const columns: CrudFormOpts[] = [
  {
    label: "ID",
    dataIndex: "id"
  },
  {
    label: "用户名",
    dataIndex: "username",
    rules: [
      { required: true, message: "用户名不能为空" },
    ]
  },
  {
    label: "日期",
    dataIndex: "date",
    type: "date",
    extraAttrs: {
      format: "YYYY-MM-DD"
    }
  },
  {
    label: "描述",
    dataIndex: "description",
    ellipsis: true
  },
  {
    label: "邮件",
    dataIndex: "email",
    formIgnore: false, // 忽略表单
  }
]

const actions = [
  {
    label: "编辑",
    dataIndex: "edit",
    onClick(column) {
      visible.value = true
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

// 侧栏设置
const { register } = useAntdCrudForm(
  {
    userSetting: {
      include: ["username", "description", "date"] // 取dataIndex，设置了此选项，则表单只包含这些字段，且顺序和这里保持一致
    },
    formSetting:
      { labelCol: { span: 4 }, wrapperCol: { span: 17 } }
  }
)

// 顶部搜索栏设置
const { register: registerSearch } = useAntdCrudForm(
  {
    userSetting: {
      span: 8,
      search: true,
      include: ["date", "username"] // 取dataIndex，设置了此选项，则表单只包含这些字段，且顺序和这里保持一致
    },
    formSetting:
      { labelCol: { span: 5 }, wrapperCol: { span: 17 } }
  }
)

function submit(obj){
  message.success(JSON.stringify(obj))
}
</script>