<template>
  <div>
    <cl-dialog
      id="dialogId"
      width="880px"
      :visible.sync="dialogVisible"
      :title="title"
      :before-close="onClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="content">
        <div :class="['clearfix' ,{tab:tabBtn}]">
          <cl-radio-group size="mini" v-model="tabData" class="float-l left clearfix" v-if="tabBtn">
            <cl-radio-button label="left">简介</cl-radio-button>
            <cl-radio-button label="right">配置说明</cl-radio-button>
          </cl-radio-group>
          <div class="float-r right clearfix" :style="{backgroundImage: 'url(' + bgImg + ')'}"></div>
        </div>
        <div v-if="tabData==='left'">
          <slot name="left"></slot>
        </div>
        <div v-else>
          <slot name="right"></slot>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <cl-button class="btnCancel" size="mini" type="primary" @click="onClose">关闭</cl-button>
      </div>
    </cl-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '测试',
    },
    content: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    top: {
      type: String,
      default: '测试',
    },
    bgImg: {
      type: String,
      default: '',
    },
    tabBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      tabData: 'left',
     
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
        console.log(val)
      },
    },
  },
  methods: {
    onClose() {
      this.dialogVisible=false
    },
  }
};
</script>
<style scoped>
.content {
  max-height: 51vh;
  padding-right: 5px;
  overflow: auto;
}
.tab {
  height: 28px;
}
.float-l {
  float: left;
}
.float-r {
  float: right;
}
.clearfix :after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: ' ';
  clear: both;
  height: 0;
}
.right {
  height: 60px;
  width: 200px;
  background-repeat: no-repeat;
  background-size: contain;
}
.dialog-footer {
  text-align: center;
}
</style>