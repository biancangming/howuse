
<template>
  <CrudForm />
</template>
<script lang="ts" setup>
import { useAntdCrudForm, CrudForm } from 'howuse/crud/antd';
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
useAntdCrudForm({ columns })
</script>
<style lang="less" scoped>

</style>