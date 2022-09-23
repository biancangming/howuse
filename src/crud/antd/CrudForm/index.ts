import mitt from "mitt";
import CrudForm from "./CrudForm.vue"

export const SearchInjectKey = Symbol("_search_bar_inject")
export const FormInjectKey = Symbol("_form_inject")
export const UpdateInjectKey = Symbol("_update_inject")


export const widgetChange = Symbol("widgetChange")
export const mittInjectKey = Symbol("mitt") // 事件总线
export const update = {
  updateInputValue: Symbol("updateInputValue"),
  updateSelectValue: Symbol("updateSelectValue"),
  updateSelectDropdownValue: Symbol("updateSelectDropdownValue"),
  updateSelectTreeValue: Symbol("updateSelectTreeValue"),
  updateSelectTreeDropdownValue: Symbol("updateSelectTreeDropdownValue"),
}

function useUpdate(emitter) {
  // 修改页面input 输入框内容
  function updateInputValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateInputValue, { dataIndex, value })
  }

  // 修改 select 输入框 内容
  function updateSelectValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateSelectValue, { dataIndex, value })
  }

  // 修改 select 下拉数据内容
  function updateSelectDropdownValue(dataIndex: string, value: any) {
    emitter.emit(update.updateSelectDropdownValue, { dataIndex, value })
  }

  // 修改 select 数值并且重置 value ，一般用于联动框清除value所用
  function updateSelectDropdownAndValue(dataIndex: string, data: any, value: string | number | undefined = undefined) {
    updateSelectValue(dataIndex, value)
    updateSelectDropdownValue(dataIndex, data)
  }

  // 修改 select 输入框 内容
  function updateSelectTreeValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateSelectTreeValue, { dataIndex, value })
  }

  // 修改 select 下拉数据内容
  function updateSelectTreeDropdownValue(dataIndex: string, value: any) {
    emitter.emit(update.updateSelectTreeDropdownValue, { dataIndex, value })
  }

  // 修改 select 数值并且重置 value ，一般用于联动框清除value所用
  function updateSelectTreeDropdownAndValue(dataIndex: string, data: any, value: string | number | undefined = undefined) {
    updateSelectTreeValue(dataIndex, value)
    updateSelectTreeDropdownValue(dataIndex, data)
  }

  return {
    updateInputValue,
    updateSelectValue,
    updateSelectDropdownValue,
    updateSelectDropdownAndValue,
    updateSelectTreeValue,
    updateSelectTreeDropdownValue,
    updateSelectTreeDropdownAndValue,
  }
}

// formSetting form 表单总体配置
// user setting 
export interface UserSetting {
  span?: number; // 列属性，默认分为几列， 默认是1
  expandNumber?: number; // 展开收起数量
  search?: boolean; // 搜索模式，按钮显示为搜索
  include?: string[]; // 包含哪些字段，不设置则是全部
}
export interface CrudFormInterface { formSetting?: Record<string, any>, userSetting?: UserSetting }
export function useAntdCrudForm(opts: CrudFormInterface = {}) {
  const emitter = mitt()
  provide(mittInjectKey, emitter) // 确保多个表单共存是，避免事件传递给其他同类组件
  // provide<CrudFormInterface>(FormInjectKey, opts)

  function register(setProps){
    setProps(opts)
  }

  return {
    ...useUpdate(emitter),
    register
  }
}

export {
  CrudForm,
}