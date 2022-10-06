import mitt from "mitt";
import CrudForm from "./CrudForm.vue"
import CrudFormModal from "./CrudFormModal.vue"
import CrudFormDrawer from "./CrudFormDrawer.vue"
import { CrudFormOpts } from 'types/crud';
import { uuid } from "howtools";

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
  updateAnyDatePicker: Symbol("updateAnyDatePicker"),
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

  // 修改 任意时间日期选择器 的值
  function updateAnyDatePicker(dataIndex: string, value: any[] | any) {
    if(value === ""){
      emitter.emit(update.updateAnyDatePicker, { dataIndex, value: null })
      return
    }
    emitter.emit(update.updateAnyDatePicker, { dataIndex, value })
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
    updateSwitchValue,
    updateSliderValue,
    updateRadioValue,
    updateRadioGroupValue,
    updateCheckboxValue,
    updateCheckboxGroupValue,
    updateRateValue,
    updateUploadValue,
    updateAnyDatePicker,
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
  key?: string;// 同一个组件内多个表单共存时需要设置
  span?: number; // 列属性，默认分为几列， 默认是1
  expandNumber?: number; // 展开收起数量
  search?: boolean; // 搜索模式，按钮显示为搜索
  include?: string[]; // 包含哪些字段，不设置则是全部
}
export interface CrudFormInterface { formSetting?: Record<string, any>, userSetting?: UserSetting }
export function useAntdCrudForm(opts: CrudFormInterface = {}) {
  const emitter = mitt()
  const mittKey = "mitt_" + uuid()
  provide(mittKey, emitter) // 确保多个表单共存是，避免事件传递给其他同类组件
  const columns: CrudFormOpts[] = []

  function register(setProps, _columns) {
    setProps({...opts, mittKey})
    columns.length = 0
    columns.push(..._columns)
  }

  const updateEmit = useUpdate(emitter)

  // 更新所有数据的值，通畅在需要批量更改数据的时候，使用
  function updateAnyValue(anyVal: Record<string, any>) {
    const _update = () => {
      // "input" | "select" | "tree-select" | "switch" | "slider" | "radio" | "checkbox" | "rate" | "upload" | "date" | "date-range" | "time" | "time-range"
      for (const [dataIndex, val] of Object.entries(anyVal)) {
        const column = columns.find(item => item.dataIndex === dataIndex)
        if (column) {
          if (!column.type) column.type = "input" // 默认输入框是inpute

          switch (column.type) {
            case 'input':
              updateEmit.updateInputValue(dataIndex, val)
              break;
            case 'select':
              updateEmit.updateSelectValue(dataIndex, val)
              break;
            case 'tree-select':
              updateEmit.updateSelectTreeValue(dataIndex, val)
              break;
            case 'switch':
              updateEmit.updateSwitchValue(dataIndex, val)
              break;
            case 'slider':
              updateEmit.updateSliderValue(dataIndex, val)
              break;
            case 'radio':
              updateEmit.updateRadioValue(dataIndex, val)
              break;
            case 'checkbox':
              updateEmit.updateCheckboxGroupValue(dataIndex, val)
              break;
            case 'rate':
              updateEmit.updateRateValue(dataIndex, val)
              break;
            case 'upload':
              updateEmit.updateUploadValue(dataIndex, val)
              break;
            case 'date':
              updateEmit.updateAnyDatePicker(dataIndex, val)
              break;
            case 'date-range':
              updateEmit.updateAnyDatePicker(dataIndex, val)
              break;
            case 'time':
              updateEmit.updateAnyDatePicker(dataIndex, val)
              break;
            case 'time-range':
              updateEmit.updateAnyDatePicker(dataIndex, val)
              break;
            default:
              break;
          }
        }
      }
    }

    if (columns.length === 0) {
      setTimeout(() => _update(), 500)
    } else {
      _update()
    }

  }


  return {
    ...updateEmit,
    updateAnyValue,
    register
  }
}

export {
  CrudForm,
  CrudFormModal,
  CrudFormDrawer
}