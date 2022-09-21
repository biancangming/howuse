<template>
  <div class="search-wrapper">
    <div class="search-wrapper__input">
      <template v-for="p in searchOpts" :key="p.dataIndex" v-if="refresh">
        <SearchItem :label="p.label" :data-index="p.dataIndex" :extraAttrs="p.extraAttrs" :defaultValue="p.defaultValue"
          :type="p.type" :ref="(el) => {$refs.push(el)}" @change="changeVal" />
      </template>
    </div>
    <div class="search-wrapper__menu">
      <a-space>
        <a-button @click="reset">重置</a-button>
        <a-button type="primary" @click="search">查询</a-button>
      </a-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
import SearchItem from "./SearchItem.vue";
import { SearchOpts } from "types/crud";
import { SearchInjectKey } from '../index';
const $refs = ref<any[]>([])
const refresh = ref(true); // 重置组件状态
// 选择完之后数据收集
const fromModel: Record<string, string> = {};

const searchOpts = inject<SearchOpts[]>(SearchInjectKey, [])
const emit = defineEmits(["search"]);

function changeVal(a: { dataIndex: string; val: string }) {
  fromModel[a.dataIndex] = a.val;
}

function search() {
  emit("search", fromModel);
}

// 初始化收集所有传入的参数
onMounted(() => {
  for(const opts of searchOpts){
    fromModel[opts.dataIndex] = opts.defaultValue
  }
})

function reset() {
  refresh.value = false;
  nextTick(() => {
    refresh.value = true;
  });
}
</script>
<style lang="less" scoped>
.search-wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  min-height: 30px;

  &__menu {
    width: 160px;
    position: absolute;
    right: 0;
    bottom: 10px;
  }

  &__input {
    display: flex;
    flex-wrap: wrap;
    max-width: calc(100% - 160px);
  }
}
</style>
