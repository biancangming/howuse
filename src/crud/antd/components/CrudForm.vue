<template>
  <a-form ref="formRef" @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed"
    v-bind="forms.formSetting || {}" autocomplete="off" :model="fromModel">
    <a-row :gutter="24">
      <template v-for="p in forms.columns" :key="p.dataIndex" v-if="refresh">
        <a-col :span="userSetting.span">
          <a-form-item :label="p.label" :name="p.dataIndex" :rules="p.rules || []">
            <Widget :type="p.type" :default-value="p.defaultValue" :dataIndex="p.dataIndex"
              :extra-attrs="p.extraAttrs" />
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <a-form-item>
      <a-space>
        <a-button @click="reset()">重置</a-button>
        <a-button type="primary" html-type="submit">确定</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { CrudFormInterface, FormInjectKey, widgetChange, UserSetting } from '../index';
import Widget from "./widget/Index.vue"
import emitter from '../emit';

const refresh = ref(true); // 重置组件状态
// 选择完之后数据收集
const fromModel: Record<string, string> = reactive({});
const formRef = ref() // 表单对象

const forms = inject<CrudFormInterface>(FormInjectKey, { columns: [] })
const userSetting = computed<UserSetting>(() => {
  const setting = forms.userSetting || {}
  if (setting.span === undefined) {
    setting.span = 24
  }
  return setting
})
emitter.on(widgetChange, (opts: any) => {
  Reflect.set(fromModel, opts.dataIndex, opts.val)
})

// 初始化收集所有传入的参数
onMounted(() => {
  for (const opts of forms.columns) {
    Reflect.set(fromModel, opts.dataIndex, opts.defaultValue)
  }
})

const handleFinish = (values: any) => {
  console.log(values, "===");
};
const handleFinishFailed = errors => {
  console.log(errors);
};

const handleValidate = (...args) => {
  console.log(args);
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