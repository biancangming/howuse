<template>
  <div :class="prefixCls" :style="{ height: `${height}px` }" @scroll.passive="srcollWrapper">
    <div :style="{ height: `${elHeight * dataSource.length}px`, zIndex: -100 }"></div>
    <div :class="`${prefixCls}-content`" :style="{top: `${topOffset}px`}">
      <template v-for="(data, index) in renderData" :key="key ? data[key] : index">
        <div :class="`${prefixCls}-content__item`" :style="{ height: `${elHeight}px` }">
          <slot :item="data" :index="index"></slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { usePrefixCls } from "../../less/useDesign";
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
});


const scrollTop = ref(0) // 滚动条距离顶部
const renderStartNumber = computed(()=> ~~(unref(scrollTop) / props.elHeight)) // 渲染起始数值
const contentNumber = computed(() => props.height / props.elHeight + 1); // 显示总条数， + 1 是为了既定内容移出可视区域时，底部存在数据填充

function srcollWrapper(e) {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

// 渲染数据
const renderData = computed(() => {
  const startNumber = renderStartNumber.value;
  return props.dataSource.slice(startNumber, startNumber + unref(contentNumber));
});

// 填充空白项
const topOffset = computed(()=> renderStartNumber.value * props.elHeight)

const prefixCls = usePrefixCls("virtual-scroll");
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}-virtual-scroll";

.@{prefix-cls} {
  width: 100%;
  overflow: auto;
  position: relative;
  &-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    &__item {
      width: 100%;
    }
  }
}
</style>
