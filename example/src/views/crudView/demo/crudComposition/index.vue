<template>
  <AntdBaseTable :columns="columns" :actions="actions" :dataSource="data.data" :scroll="{x: 1500}" />
  <a-modal :visible="visible" title="编辑/新增" @cancel="visible=false" @ok="visible=false">
    <AntdCrudForm :columns="columns" @register="register" :footer="false" />
  </a-modal>
</template>
<script lang="ts" setup>
import { AntdBaseTable, AntdCrudForm, useAntdCrudForm } from "howuse/crud"
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
    type: "time"
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

const { register } = useAntdCrudForm(
  {
    userSetting: {
      include: ["username", "description", "date"] // 取dataIndex，设置了此选项，则表单只包含这些字段，且顺序和这里保持一致
    },
    formSetting:
      { labelCol: { span: 4 }, wrapperCol: { span: 17 } }
  }
)
</script>