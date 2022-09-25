<template>
  <a-table>
    <template #bodyCell="{ text, record, index, column }">
      <template v-if="column.dataIndex === 'operation'">
        <a-space size="small" align="start">
          <template v-for="ac in props.actions" :key="ac.dataIndex">
            <a-popconfirm
              v-if="ac.confirm"
              :title="ac.confirm"
              @confirm="handleOperation(ac, text, record, index, column )"
            >
              <a @click.stop>{{ ac.label }}</a>
            </a-popconfirm>
            <a v-else @click.stop="handleOperation(ac, text, record, index, column )">{{ ac.label }}</a>
          </template>
        </a-space>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>import { PropType } from 'vue';

const props = defineProps({
  actions: {
    default: () => [],
    type: Array as PropType<any[]>
  }
})

function handleOperation(action, text, record, index, column ){
  if(action?.onClick){
    action.onClick({text, record, index, column})
  }
}
</script>
<style lang="less" scoped>

</style>