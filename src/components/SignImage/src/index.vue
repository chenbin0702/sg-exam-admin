<template>
  <div class="drawing-container">
    <!-- 绘图组件容器DOM -->
    <div id="tui-image-editor"></div>
    <a-button class="save" type="primary" @click="saveImage">保存</a-button>
  </div>
</template>

<script lang="ts">
import 'tui-image-editor/dist/tui-image-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import ImageEditor from 'tui-image-editor'
import {uploadImage} from '/@/api/exam/examMedia'
import { defineComponent, ref, computed, unref, onMounted, nextTick,watch } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { locale_zh, customTheme } from './data'
export default defineComponent(
  {
    props: {
      imgUrl: {
        type: String,
        default: ''
      }
    },
    emits: ['getNewImageInfo'],
    setup(props, { emit }) {
      const instance = ref(null)
      const init = () => {
        instance.value = new ImageEditor(document.querySelector('#tui-image-editor'), {
          includeUI: {
            loadImage: {
              path: props.imgUrl,
              name: 'image',
            },
            menu: ['resize', 'crop', 'rotate', 'draw', 'shape', 'icon', 'text', 'filter'], // 底部菜单按钮列表 隐藏镜像flip和遮罩mask
            initMenu: 'draw', // 默认打开的菜单项
            menuBarPosition: 'bottom', // 菜单所在的位置
            locale: locale_zh, // 本地化语言为中文
            theme: customTheme // 自定义样式
          },
          uiSize: {
            width: '1000px',
            height: '700px'
          },
          cssMaxWidth: 600, // canvas 最大宽度
          cssMaxHeight: 600 // canvas 最大高度
        })
        document.getElementsByClassName('tui-image-editor-main')[0].style.top = '45px' // 调整图片显示位置
        document.getElementsByClassName(
          'tie-btn-reset tui-image-editor-item help'
        )[0].style.display = 'none' // 隐藏顶部重置按钮
      }
      const saveImage = () => {
        const base64String = instance.value.toDataURL() // base64 文件
        const data = window.atob(base64String.split(',')[1])
        const ia = new Uint8Array(data.length)
        for (let i = 0; i < data.length; i++) {
          ia[i] = data.charCodeAt(i)
        }
        const blob = new Blob([ia], { type: 'image/png' }) // blob 文件
        let params={
          file:blob,
          fliename:'批改作业图片'
        }
        uploadImage(params,function onUploadProgress(progressEvent: ProgressEvent){}).then((res) => {
           
          emit('getNewImageInfo', res.data)  

        })
      }
      onMounted(() => {
        nextTick(() => {
          init() // 页面创建完成后调用
        })
      })
      watch(() => props.imgUrl, () => {
        init() // 监听imgUrl变化
      })
      return {
        saveImage
      }
    }

  }
)
</script>

<style lang="less" scoped>
.drawing-container {
  width: 100%;
  height: 80vh;
  position: relative;
  .save {
    position: absolute;
    right: 50px;
    top: 15px;
  }
}


</style>
