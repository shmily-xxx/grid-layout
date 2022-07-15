<template>
  <div ref="container" :style="{'height': height}"></div>
</template>

<script>
import * as echarts from 'echarts';
// import './customed.js';
export default {
  name: 'chart',
  props: {
    height: {
      type: String,
      default: '100px'
    },
    options: {
      type: Object,
      required: true
    },
    resizeable: {
      type: Boolean,
      default: true
    },
    // isFullScreen: {
    //   type: Boolean,
    //   default: false
    // },
    bgType: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      myChart: null
    };
  },
  computed: {
    // sidebarFlag() {
    //   return this.$store.getters.sidebarFlag;
    // }
  },
  watch: {
    // sidebarFlag() {
    //   this.chartResize(300);
    // },
    height() {
      this.chartResize();
    },
    // isFullScreen(val) {
    //   const theme =
    //     val && (this.bgType === 'BLACK' || this.bgType === 'BLACK_EARTH')
    //       ? 'customed'
    //       : '';
    //   this.changeTheme(theme);
    // }
  },
  beforeMount() {
    if (this.resizeable) {
      window.addEventListener('resize', this.chartResize);
    }
  },
  beforeDestroy() {
    if (this.resizeable) {
      window.removeEventListener('resize', this.chartResize);
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.container);
    // this.myChart.setOption(this.options);
    this.chartResize();
    if (this.options.typeclick) {
      this.myChart.on('click', (params) => {
        this.$emit('clickitem', {
          itemdata: params,
          typeclick: this.options.typeclick
        });
      });
    }
  },
  methods: {
    changeTheme(theme) {
      this.myChart.dispose();
      this.myChart = echarts.init(this.$refs.container, theme);
      this.reSetOption();
    },
    chartResize(time) {
      setTimeout(() => {
        if (this.myChart) {
          this.myChart.resize();
        }
      }, time || 200);
    },
    reSetOption() {
      setTimeout(() => {
        this.myChart.setOption(this.options, true);
      }, 100);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
