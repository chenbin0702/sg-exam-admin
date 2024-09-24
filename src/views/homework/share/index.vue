<template>
  <div>
    <ShareModal  @register="registerModal"></ShareModal>
  </div>
</template>

<script>
import { defineComponent, unref, reactive,onMounted} from "vue";
import { useModal } from "/@/components/Modal";
import ShareModal from './ShareModal.vue'
import { useRoute } from 'vue-router';
export default defineComponent({
  components:{
    ShareModal
  },
  setup() {
    const [registerModal,{ openModal }] = useModal();
    const route = useRoute();
    let record = {...route.query}
    setTimeout(()=>{
      openModal(true,{
        record
      })
    },10)
    return {
      registerModal
    }
  },
});
</script>

<style lang="scss" scoped></style>
