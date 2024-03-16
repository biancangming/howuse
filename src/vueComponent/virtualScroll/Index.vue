<template>
  <div :class="prefixCls">
    <!-- 顶部插槽 -->
    <div :class="`${prefixCls}-title`" :style="{ height: `${elHeight}px` }" v-if="isShowSlot('title')">
      <slot name="title"></slot>
    </div>
    <div :class="`${prefixCls}-content`" ref="content" :style="{ height: `${height}px` }">
      <!-- 元素总高度 -->
      <div :style="{ height: `${elHeight * dataSource.length}px`, zIndex: -100 }"></div>
      <!-- 动态数据 -->
      <div :class="`${prefixCls}-content-data`" :style="{top: `${topOffset}px`}">
        <template v-for="(data, index) in renderData" :key="key ? data[key] : index">
          <div :class="`${prefixCls}-content-data__item`" :style="{ height: `${elHeight}px` }">
            <slot :item="data" :index="index"></slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useScroll } from "@vueuse/core";
import { usePrefixCls } from "../../less/useDesign";
import { useAutoScroll } from './composition/useAutoScroll';
const slots = useSlots()
const isShowSlot = (name: string) => !!slots[name];
const content = ref() // 内容区域
const {y: scrollTop, arrivedState } = useScroll(content)

const props = defineProps({
  dataSource: {
    default: () => [],
    type: Array,
  },
  key: {
    default: "",
    type: String,
  },
  height: {
    default: 300,
    type: Number,
  },
  elHeight: {
    default: 20,
    type: Number,
  },
  autoScroll: {
    default: false,
    type: [Boolean, Number],
  }
});



const renderStartNumber = computed(()=> ~~(unref(scrollTop) / props.elHeight)) // 渲染起始数值
const contentNumber = computed(() => props.height / props.elHeight + 1); // 显示总条数， + 1 是为了既定内容移出可视区域时，底部存在数据填充

// 渲染数据
const renderData = computed(() => {
  const startNumber = renderStartNumber.value;
  const endNumber = startNumber + unref(contentNumber)
  return props.dataSource.slice(startNumber, endNumber);
});

// 填充空白项
const topOffset = computed(()=> {
  // const startNumber = renderStartNumber.value;
  // const endNumber = startNumber + unref(contentNumber)
  return renderStartNumber.value * props.elHeight
})

// 自动滚动的业务
useAutoScroll(props, content, arrivedState , scrollTop)

const prefixCls = usePrefixCls("virtual-scroll");
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-virtual-scroll";

.@{prefix-cls} {
  width: 100%;
  &-title {
    overflow-y: scroll;
  }
  &-content {
    overflow: auto;
    position: relative;
    &-data {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    &__item {
        width: 100%;
      }
    }
  }
}
</style>
