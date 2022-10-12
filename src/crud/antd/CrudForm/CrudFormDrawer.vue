<template>
  <a-drawer :footer="false" >
    <AntdCrudForm v-bind="$attrs" @register="(...args)=>$emit('register', ...args)">
      <template #footer>
        <div class="ant-drawer-footer" :style="{
          'text-align': 'right',
          'position': 'absolute',
          'bottom': '0',
          'width': '100%',
          'right': '0',
        }">
          <a-space>
            <a-button @click="$emit('update:visible', false)">取消</a-button>
            <a-button type="primary" html-type="submit">确定</a-button>
          </a-space>
        </div>
      </template>
    </AntdCrudForm>
  </a-drawer>
</template>
<script lang="ts" setup>
import AntdCrudForm from "./CrudForm.vue"
</script>
<style lang="less">
.bcm-modal-footer {
  position: absolute;
  bottom: 0;
  right: 20px;
  height: 60px;
  border-top: 1px solid #f0f0f0;
  width: calc(100% - 32px);
  display: flex;
  align-items: center;
}
</style>