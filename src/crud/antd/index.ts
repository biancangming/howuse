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
}

export function useAntdCrudSearch(opts: { columns: SearchOpts[] }) {
  provide<SearchOpts[]>(SearchInjectKey, opts.columns)
  

  // 查找并返回当前需要操作的选项
  function updateInputValue(dataIndex: string, value: string) {
    emitter.emit(update.updateInputValue, {dataIndex, value})
  }
  return {
    updateInputValue
  }
}

export {
  SearchBar
}