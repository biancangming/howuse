import mitt from "mitt";
import CrudForm from "./CrudForm.vue"
import CrudFormModal from "./CrudFormModal.vue"
import CrudFormDrawer from "./CrudFormDrawer.vue"
import { CrudFormOpts } from "types/crud";

export const SearchInjectKey = Symbol("_search_bar_inject")
export const FormInjectKey = Symbol("_form_inject")
export const UpdateInjectKey = Symbol("_update_inject")


export const widgetChange = Symbol("widgetChange")
export const mittInjectKey = Symbol("mitt") // 事件总线
export const update = {
  updateInputValue: Symbol("updateInputValue"),
  updateSwitchValue: Symbol("updateSwitchValue"),
  updateSliderValue: Symbol("updateSliderValue"),
  updateRadioValue: Symbol("updateRadioValue"),
  updateRadioGroupValue: Symbol("updateRadioGroupValue"),
  updateCheckboxValue: Symbol("updateCheckboxValue"),
  updateCheckboxGroupValue: Symbol("updateCheckboxGroupValue"),
  updateRateValue: Symbol("updateRateValue"),
  updateUploadValue: Symbol("updateUploadValue"),
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

  // 修改swithch 的值
  function updateSwitchValue(dataIndex: string, value: boolean) {
    emitter.emit(update.updateSwitchValue, { dataIndex, value })
  }

  // 修改 Silder 的值
  function updateSliderValue(dataIndex: string, value: number) {
    emitter.emit(update.updateSliderValue, { dataIndex, value })
  }

  // 修改 Radio 的值
  function updateRadioValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateRadioValue, { dataIndex, value })
  }

  // 修改 Radio 选项的值
  function updateRadioGroupValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateRadioGroupValue, { dataIndex, value })
  }

  // 修改 checkbox 的值
  function updateCheckboxValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateCheckboxValue, { dataIndex, value })
  }

  // 修改 Checkbox 选项的值
  function updateCheckboxGroupValue(dataIndex: string, value: string | number | undefined) {
    emitter.emit(update.updateCheckboxGroupValue, { dataIndex, value })
  }
  
  // 修改 Rate 的值
  function updateRateValue(dataIndex: string, value: number) {
    emitter.emit(update.updateRateValue, { dataIndex, value })
  }

  // 修改 Upload 的值
  function updateUploadValue(dataIndex: string, value: any[]) {
    emitter.emit(update.updateUploadValue, { dataIndex, value })
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

  // 更新所有数据的值，通畅在需要批量更改数据的时候，使用
  function updateAnyValue(columns: CrudFormOpts[], anyVal: Record<string, any>){

  }

  return {
    updateInputValue,
    updateSwitchValue,
    updateSliderValue,
    updateRadioValue,
    updateRadioGroupValue,
    updateCheckboxValue,
    updateCheckboxGroupValue,
    updateRateValue,
    updateUploadValue,
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
  CrudFormModal,
  CrudFormDrawer
}