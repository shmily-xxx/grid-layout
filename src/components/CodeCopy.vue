<template>
  <div class="copy-content">
    <div
      class="copy-btn code-data-copy"
      @click="copyMessage"
      data-clipboard-action="copy"
      :data-clipboard-text="code"
    >{{copyBtn}}</div>
  </div>
</template>
<script>
import Clipboard from 'clipboard' //复制插件
export default {
  data() {
    return {
      code: null,
      copyBtn:'复制'
    }
  },
  methods: {
    copyMessage() {
      let clipboard = new Clipboard('.code-data-copy')
      clipboard.on('success', ()=> {
        this.copyBtn='复制成功'
        clipboard.destroy() // 销毁,避免多次点击重复出现
        setTimeout(()=>{
          this.copyBtn='复制'
        },3000)
      })
      clipboard.on('error', function() {
      })
    },
  }
}
</script>
<style>
.copy-btn {
  padding: 6px 8px;
  position: absolute;
  opacity: 0;
  right: 8px;
  top: 8px;
  color: #212a40;
  cursor: pointer;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  font-size: 12px;
}
</style>