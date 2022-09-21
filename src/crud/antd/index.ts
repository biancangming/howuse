import { Column } from "types/crud";
import { SearchOpts } from 'types/crud';
import SearchBar from "./components/SearchBar.vue"
import emitter from './emit';

export const SearchInjectKey = Symbol("_search_bar_inject")
export const UpdateInjectKey = Symbol("_update_inject")

export interface OperationOpts {
  api: "",
  icon: "",
  type: "primary" | "danger" | "link"
}


export function useAntdCrud(options: { columns: Column[] }) {

}



export const update = {
  updateInputValue : Symbol("updateInputValue"),
  updateSelectValue : Symbol("updateSelectValue"),
  updateSelectDropdownValue : Symbol("updateSelectDropdownValue"),
}

export function useAntdCrudSearch(opts: { columns: SearchOpts[] }) {
  provide<SearchOpts[]>(SearchInjectKey, opts.columns)
  

  // 修改页面input 输入框内容
  function updateInputValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateInputValue, {dataIndex, value})
  }

  // 修改 select 输入框 内容
  function updateSelectValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateSelectValue, {dataIndex, value})
  }

  // 修改 select 下拉数据内容
  function updateSelectDropdownValue(dataIndex: string, value: any) {
    emitter.emit(update.updateSelectDropdownValue, {dataIndex, value})
  }

  // 修改 select 数值并且重置 value ，一般用于联动框清除value所用
  function updateSelectDropdownAndValue(dataIndex: string, data: any, value : string | number | undefined = undefined) {
    updateSelectValue(dataIndex, value)
    updateSelectDropdownValue(dataIndex, data)
  }

  return {
    updateInputValue,
    updateSelectValue,
    updateSelectDropdownValue,
    updateSelectDropdownAndValue
  }
}

export {
  SearchBar
}