
<template>
  <AntdCrudForm :columns="columns" @register="register"/>
</template>
<script lang="ts" setup>
import { useAntdCrudForm, AntdCrudForm } from 'howuse/crud';
import { CrudFormOpts } from 'types/crud';
const columns: CrudFormOpts[] = [
  {
    label: "姓名",
    dataIndex: "username",
    defaultValue: "张三",
    rules: [
      {
        required: true,
        message: "姓名不能为空"
      }
    ]
  },
  {
    label: "年龄",
    dataIndex: "age",
    defaultValue: "18",
    rules: [
      {
        required: true,
        message: "年龄不能为空"
      }
    ]
  }
]
useAntdCrudForm()
const { register } = useAntdCrudForm({userSetting:{span: 12}})
</script>
<style lang="less" scoped>

</style>