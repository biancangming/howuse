<template>
  <a-form ref="formRef" @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed"
    v-bind="forms.formSetting || {}" autocomplete="off" :model="fromModel">
    <a-row :gutter="24">
      <template v-for="(p, index) in forms.columns" :key="p.dataIndex" v-if="refresh">
        <a-col :span="userSetting.span" v-show="expand || index < (userSetting.expandNumber || 0)">
          <a-form-item :label="p.label" :name="p.dataIndex" :rules="p.rules || []">
            <Widget :type="p.type" :default-value="p.defaultValue" :dataIndex="p.dataIndex"
              :extra-attrs="p.extraAttrs" />
          </a-form-item>
        </a-col>
      </template>
    </a-row>
    <a-form-item :label-col="{span: 0}" :wrapper-col="{span: 24}">
      <template v-if="userSetting.search">
        <div style="float: right">
          <a-space>
            <a-button style="margin: 0 8px" @click="() => reset()">清空</a-button>
            <a-button type="primary" html-type="submit">查询</a-button>
            <a style="font-size: 12px" @click="expand = !expand">
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
        <a-space>
          <a-button @click="reset()">重置</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </a-space>
      </template>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import { CrudFormInterface, FormInjectKey, widgetChange, UserSetting } from '../index';
import Widget from "./widget/Index.vue"
import emitter from '../emit';

const refresh = ref(true); // 重置组件状态
// 选择完之后数据收集
const fromModel: Record<string, string> = reactive({});
const formRef = ref() // 表单对象

// 展开或者收起
const expand = ref(false)

const forms = inject<CrudFormInterface>(FormInjectKey, { columns: [] })
const userSetting = computed<UserSetting>(() => {
  const setting = forms.userSetting || {}
  if (setting.span === undefined) {
    setting.span = 24
  }
  if (setting.expandNumber == undefined) {
    setting.expandNumber = 6
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