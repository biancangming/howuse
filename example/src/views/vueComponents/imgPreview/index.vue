<template>
  <!-- 文件预览 -->
  <how-img-preview :imageList="imgList" />
  <a-divider></a-divider>
  <div>
    <a-button type="primary" @click="openImg()">无图预览</a-button>
  </div>
</template>
<script lang="ts" setup>
import { HowImgPreview, createImgPreview } from "howuse/vueComponent"
import { ImageProps } from "howuse/vueComponent/imgPreview/typing";

const imgList: ImageProps[] = [
  {
    src: '//aliyuncdn.antdv.com/vue.png',
    width: "199px"
  },
  {
    src: '//cdn.pixabay.com/photo/2022/03/04/12/26/art-7047223__340.jpg',
    width: "199px"
  },
  {
    src: '//cdn.pixabay.com/photo/2022/03/04/08/39/time-7046864__340.jpg',
    width: "199px"
  }
];

function openImg() {
  const onImgLoad = ({ index, url, dom }) => {
    console.log(`第${index + 1}张图片已加载，URL为：${url}`, dom);
  };
  // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
  createImgPreview({ imageList: imgList.map(item => item.src), defaultWidth: 700, rememberState: true, onImgLoad });
}
</script>