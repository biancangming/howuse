<template>
  <a-a-image-preview-group>
    <slot v-if="!imageList.length || $slots.default"></slot>
    <template v-else>
      <template v-for="item in getImageList" :key="item.src">
        <a-image v-bind="item">
          <template #placeholder v-if="item.placeholder">
            <a-image v-bind="item" :src="item.placeholder" :preview="false" />
          </template>
        </a-image>
      </template>
    </template>
  </a-a-image-preview-group>
</template>
<script lang="ts" setup>
import { isString } from 'howtools';
import { PropType } from 'vue';
import { ImageProps } from './typing';

type ImageItem = string | ImageProps;
const props = defineProps({
  imageList: {
    type: Array as PropType<ImageItem[]>,
    default: () => []
  },
})

const getImageList = computed((): any[] => {
  const { imageList } = props;
  return imageList.map((item) => {
    if (isString(item)) {
      return {
        src: item,
        placeholder: false,
      };
    }
    return item;
  });
});
</script>