<template>
  <div>
    <SearchBar :props="searchColumns" @search="seachHeader" />
  </div>
</template>
<script lang="ts" setup>
import { server } from "./request";
import { useAntdCrud, SearchBar, useAntdCrudSearch } from "howuse/crud";
import { Column } from "types/crud";
import { SearchOpts } from "types/crud";

const columns: Column[] = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "姓名",
    dataIndex: "username",
  },
  {
    title: "入库日期",
    dataIndex: "date",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "描述",
    dataIndex: "description",
  },
];

const searchColumns: SearchOpts[] = [
  {
    label: "姓名",
    dataIndex: "username",
    defaultValue: "张三",
  },
  {
    label: "年龄",
    dataIndex: "age",
    defaultValue: "18",
  },
  {
    label: "入库日期",
    dataIndex: "date",
    type: "date",
    extraAttrs: {
      showTime: true,
    },
  },
  {
    label: "日期范围",
    dataIndex: "dateRange",
    type: "date-range",
  },
  {
    label: "处理时间",
    dataIndex: "time",
    type: "time",
    extraAttrs: {
      showTime: true,
    },
  },
  {
    label: "下拉选择",
    dataIndex: "select",
    type: "select",
    ref: "select2",
    extraAttrs: {
      api: server({url: "/user/selectList"}),
      all: true, // 是否显示全部，默认无
      name: "name",
      value: "id",
      responseKey: "data", // 用于响应值的key， 默认为data，默认根据此key在响应结果查询三次，直到找到对应数组。否则空数组
      onChange(value){
        updateInputValue("username", value)
      }
    },
  },
  {
    label: "选择",
    dataIndex: "select2",
    type: "select",
    extraAttrs: {
      api: server({url: "/user/selectList"}),
      all: true, // 是否显示全部，默认无
      name: "name",
      value: "id",
      responseKey: "data", // 用于响应值的key， 默认为data，默认根据此key在响应结果查询三次，直到找到对应数组。否则空数组
      mode: "multiple",
      maxTagCount: 1,
    },
  },
  {
    label: "搜索",
    dataIndex: "search",
    type: "select",
    extraAttrs: {
      api: server({url: "/user/selectList"}),
      name: "name",
      value: "id",
      placeholder: "请输入搜索内容",
      allowClear: true,
      onSearch(val: string){ // 精简选项，默认存在onSeach开启搜索，如果声明 show-search 、filter-option等则忽略内部开关
        server({url: "/user/selectList", data: {name: val}}).then(res=>{
          updateSelectDropdownValue("search", res.data.data || [])
        })
      }
    },
  },
  {
    label: "联动1",
    dataIndex: "link1",
    type: "select",
    extraAttrs: {
      api: server({url: "/area/city1"}),
      name: "name",
      value: "id",
      onChange(val: string, { name }){ 
        server({url: "/area/city2", data: {name}}).then(res=>{
          updateSelectDropdownAndValue("link2", res.data.data || [])
        })
      }
    },
  },
  {
    label: "联动2",
    dataIndex: "link2",
    type: "select",
    extraAttrs: {
      name: "name",
      value: "id",
      placeholder: "请选择"
    },
  },
  {
    label: "tree-select",
    dataIndex: "treeSelect",
    type: "tree-select",
    extraAttrs: {
      api: server({url: "/area/city-tree"}),
      fieldNames: { value: "id", label: "name" },
      treeNodeFilterProp: "name", // 搜索，默认 value
      showSearch: true,// 开启搜索
      multiple: true, // 多选
    },
  },
];

function seachHeader(result: any) {
  console.log(result);
}
useAntdCrud({ columns });
const { updateInputValue, updateSelectDropdownAndValue ,updateSelectDropdownValue } = useAntdCrudSearch({ columns: searchColumns });
</script>
<style lang="less" scoped></style>
