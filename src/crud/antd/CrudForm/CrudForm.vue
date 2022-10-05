<template>
  <a-form ref="formRef" @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed"
    v-bind="myProps.formSetting || {}" autocomplete="off" :model="fromModel">
    <a-row :gutter="24">
      <template v-for="(p, index) in _columns" :key="p.dataIndex" v-if="refresh">
        <a-col :span="myProps.userSetting?.span" v-show="expand || index < (myProps.userSetting?.expandNumber || 0)">
          <a-form-item :label="p.label" :name="p.dataIndex" :rules="p.rules || []">
            <Widget :type="p.type" :default-value="p.defaultValue" :dataIndex="p.dataIndex" :extra-attrs="p.extraAttrs"
              :mittKey="myProps.mittKey" />
          </a-form-item>
        </a-col>
      </template>
      <a-col :span="myProps.userSetting?.span" v-if="btnInline">
        <a-space style="float: right">
          <a-button style="margin: 0 8px" @click="() => reset()">重置</a-button>
          <a-button type="primary" html-type="submit">查询</a-button>
        </a-space>
      </a-col>
    </a-row>
    <slot name="footer" v-if="!btnInline">
      <a-form-item :label-col="{span: 0}" :wrapper-col="{span: 24}" v-if="footer">
        <template v-if="myProps.userSetting?.search">
          <div style="float: right">
            <a-space>
              <a-button style="margin: 0 8px" @click="() => reset()">重置</a-button>
              <a-button type="primary" html-type="submit">查询</a-button>
              <a style="font-size: 12px" @click="expand = !expand"
                v-if="_columns.length >= (myProps.userSetting?.expandNumber || 0)">
                <template v-if="expand">
                  <UpOutlined />
                </template>
                <template v-else>
                  <DownOutlined />
                </template>
                {{ expand ? '收起': '展开' }}
              </a>
            </a-space>
          </div>
        </template>
        <template v-else>
          <div style="text-align:end">
            <a-space>
              <a-button @click="reset()">重置</a-button>
              <a-button type="primary" html-type="submit">确定</a-button>
            </a-space>
          </div>
        </template>
      </a-form-item>
    </slot>
  </a-form>
</template>
<script lang="ts" setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { Emitter, EventType } from 'mitt';
import { widgetChange, UserSetting } from './index';
import Widget from "./widget/Index.vue"
import { PropType } from 'vue';
import { useProps } from "../../../utils/useProps"
import { CrudFormOpts } from 'types/crud';

const props = defineProps({
  columns: {
    type: Array as PropType<CrudFormOpts[]>,
    default: () => []
  },
  footer: {
    type: Boolean,
    default: true
  }
})

// 搜索模式按钮位置摆放，如果在不存在展开情况，且只有一行按钮时，这行按钮不构成一行，则按钮放置在末尾
const btnInline = computed(()=>{
  if(!props.footer) return false 
  const expandNumber = unref(myProps).userSetting?.expandNumber || 0
  if(!expandNumber) return false
  const spanNumber = 24 / (unref(myProps).userSetting?.span || 24)
  const columnsLen = unref(_columns).length
  return columnsLen < spanNumber
})

// 加工后的 columns
const _columns = computed(() => {
  const include = unref(myProps).userSetting?.include || []
  if (include.length === 0) { // include 长度是 0 就显示全部
    return props.columns
  } else {
    const _include: CrudFormOpts[] = []
    for (const inc of include) {
      const item = props.columns.find(item => item.dataIndex === inc)
      if (item) _include.push(item)
    }
    return _include
  }
})

const emit = defineEmits<{
  (e: "submit", values: any): void,
  (e: "fail", errors): void,
  (e: "validate", []): void,
  (e: "register", any, any2: CrudFormOpts[]): void,
}>()

const refresh = ref(true); // 重置组件状态
// 选择完之后数据收集
const fromModel: Record<string, string> = reactive({});
const formRef = ref() // 表单对象

// 展开或者收起
const expand = ref(false)

// 接收父级设置的参数
const { props: myProps, setProps } = useProps<{ formSetting?: Record<string, any>, userSetting?: UserSetting, mittKey: string }>({ userSetting: {}, formSetting: {}, mittKey: "" }, (forms) => {
  const setting = forms.userSetting || {}
  if (setting.span === undefined) {
    setting.span = 24
  }
  if (setting.expandNumber == undefined) {
    setting.expandNumber = 6
  }
  return {
    formSetting: forms.formSetting,
    userSetting: setting,
    mittKey: forms.mittKey
  }
})

onMounted(() => {
  const mitter = inject<Emitter<Record<EventType, unknown>>>(unref(myProps).mittKey)
  mitter?.on(widgetChange, (opts: any) => {
    Reflect.set(fromModel, opts.dataIndex, opts.val)
  })
})

// 初始化收集所有传入的参数
onMounted(() => {
  for (const opts of props.columns) {
    if (opts.type === "switch" && opts.defaultValue === undefined) {
      Reflect.set(fromModel, opts.dataIndex, false)
    } else if (opts.type === "slider" && opts.defaultValue === undefined) {
      Reflect.set(fromModel, opts.dataIndex, 0)
    } else if (opts.type === "rate" && opts.defaultValue === undefined) {
      Reflect.set(fromModel, opts.dataIndex, 0)
    } else if (opts.type === "upload" && opts.defaultValue === undefined) {
      Reflect.set(fromModel, opts.dataIndex, [])
    } else if (opts.type === "select" && opts.defaultValue === undefined && opts.extraAttrs?.all === true) {
      Reflect.set(fromModel, opts.dataIndex, "")
    } else {
      Reflect.set(fromModel, opts.dataIndex, opts.defaultValue)
    }
  }
})

// 修正正确的columns
watch(_columns, (columns) => {
  emit("register", setProps, columns)
},
  {
    immediate: true
  })

const handleFinish = values => {
  emit("submit", values)
};
const handleFinishFailed = errors => {
  emit("fail", errors)
};

const handleValidate = (...args) => {
  emit("validate", args)
};

function reset() {
  refresh.value = false;
  nextTick(() => {
    refresh.value = true;
  });
}
</script>
<style lang="less" scoped>
.ant-form-inline .ant-form-item {
  margin-bottom: 10px;
}
</style>