<template>
  <a-modal :footer="false" :body-style="{padding: '16px 0 0 0'}">
    <AntdCrudForm v-bind="$attrs" @register="(...args)=>$emit('register', ...args)">
      <template #footer>
        <div class="ant-modal-footer">
          <a-button @click="$emit('update:visible', false)">取消</a-button>
          <a-button type="primary" html-type="submit">确定</a-button>
        </div>
      </template>
    </AntdCrudForm>
  </a-modal>
</template>
<script lang="ts" setup>
import AntdCrudForm from "./CrudForm.vue"
</script>