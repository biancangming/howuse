<template>
  <a-upload @change="changeUpload" v-model:file-list="uploadVal" v-bind="{..._extraAttrs}" autocomplete="off">
    <a-button  size="small">
      <UploadOutlined />
      上传文件
    </a-button>
  </a-upload>
</template>
<script lang="ts" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
import { Emitter, EventType } from "mitt";
import { mittInjectKey, update } from "..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
const emitter = inject<Emitter<Record<EventType, unknown>>>(mittInjectKey)
const props = defineProps(_props);
const emit = defineEmits(["change"]);
const change = useChange(props, emit)
const uploadVal = ref([])

const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  uploadVal.value = props.defaultValue
  Reflect.deleteProperty(defaultRet, "onChange")
  return defaultRet
})

// 监听事件
emitter?.on(update.updateUploadValue, ({ dataIndex, value }: any) => {
  if (dataIndex == props.dataIndex) {
    uploadVal.value = value
    change(value)
  }
})

// 修改输入框 a-upload
function changeUpload(obj) {
  change(obj, undefined)
}
</script>