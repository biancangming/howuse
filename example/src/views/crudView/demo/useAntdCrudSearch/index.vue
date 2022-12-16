<template>
  <div>
    <AntdCrudForm :columns="searchColumns" @submit="seachHeader" @register="register">
      <template #slot="value">
        <a-input @input="(e) =>  updateSlotValue('slot', e.target.value)" :value="value"/>
      </template>
    </AntdCrudForm>
  </div>
</template>
<script lang="ts" setup>
import { AntdCrudForm, useAntdCrudForm } from "howuse/crud/antd";
import type { SearchOpts } from "howuse/crud/antd";
import { message, Upload } from 'ant-design-vue';
import { server } from "@/mock/request";

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
    label: "开关",
    dataIndex: "switch",
    type: "switch",
  },
  {
    label: "选锤子",
    dataIndex: "chui",
    type: "radio",
    extraAttrs: {
      api: server({url: "/user/chui"}),
      name: "name",
      value: "id",
      responseKey: "data", // 用于响应值的key， 默认为data，默认根据此key在响应结果查询三次，直到找到对应数组。否则空数组
    },
  },
  {
    label: "多选锤子",
    dataIndex: "chuimuch",
    type: "checkbox",
    extraAttrs: {
      api: server({url: "/user/chui"}),
      name: "name",
      value: "id",
      responseKey: "data", // 用于响应值的key， 默认为data，默认根据此key在响应结果查询三次，直到找到对应数组。否则空数组
    },
  },
  {
    label: "评个分",
    dataIndex: "mark",
    type: "rate",
  },
  {
    label: "进度",
    dataIndex: "slider",
    type: "slider",
    defaultValue: 10,
  },
  {
    label: "上传文件",
    dataIndex: "upload",
    type: "upload",
    defaultValue: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      }
    ],
    extraAttrs: {
      beforeUpload(file){
        if(file.size > 1024){
          message.error("文件大小不能超过1M")
          return Upload.LIST_IGNORE
        }
      },
      onChange({file}){
        if(file.status === "uploading"){
          message.warning("正在上传")
        }else{
          message.error(`上传完成，${file.error}`)
        }
      }
    }
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
  {
    label: "自定义输入框",
    dataIndex: "slot",
    type: "slot",
    defaultValue: 'slot'
  }
];

function seachHeader(result: any) {
  message.success(JSON.stringify(result, null, 2))
}
const { updateInputValue, updateSelectDropdownAndValue ,updateSelectDropdownValue, register, updateSlotValue } = useAntdCrudForm({ userSetting: { span: 6, search: true, expandNumber: 4 }, formSetting: { labelCol: {span: 6 },  wrapperCol: { span: 17 }} });
</script>
<style lang="less" scoped></style>
