<template>
  <div class="grid-box">
    <grid-layout
      :layout.sync="layoutData"
      ref="layout"
      :col-num="24"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :margin="[10, 10]"
      @layout-updated="layoutUpdated"
      @layout-ready="layoutReadyEvent"
    >
      <template v-for="item in layoutData">
        <grid-item
          v-if="item.show"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          :min-w="item.minW"
          :min-h="item.minH"
          :max-w="item.maxW"
          :max-h="item.maxH"
          :is-draggable="item.isDraggable"
          :is-resizable="item.isResizable"
          style="touch-action: none;box-sizing: border-box"
          drag-allow-from=".title,.drag-icon"
          @moved="(...newPosition)=>layoutUpdatedEvent(newPosition,item)"
          @resized="(...newPosition) => resizedEvent(newPosition, item)"
        >
          <div class="item-outer">
            <DashboardHeader :row="item" @collapse="collapse"></DashboardHeader>
            <div :class="['chart-body',{padding10:item.type!=='row'}]">
              <template v-if="item.type==='number'">
                <Number :numVal="item.numVal" :font-size="item.fontSize"></Number>
              </template>
              <template v-if="item.type==='chart'">
                <Chart height="100%" ref="chart" :options="item.option"></Chart>
              </template>
              <!-- <template v-if="item.type==='chart'">
                <div style="height:100%" ref="chart"></div>
              </template>-->
            </div>
          </div>
        </grid-item>
      </template>
    </grid-layout>
    <div style="height:200px" ref="chart1"></div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import DashboardHeader from './DashboardHeadercopy.vue';
import Number from './components/Number.vue';
// import * as echarts from 'echarts';
import Chart from './components/Chart.vue';
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    DashboardHeader,
    Number,
    Chart,
  },
  props: {
    layout: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      layoutOld: [],
      collapseY: [],
      collapseList: [],
      time: 0,
      layoutMap: {},
      numVal: 1111,
      sortLayout: [],
      myChart: '',
    };
  },
  computed: {
    layoutData: {
      get() {
        return this.layout;
      },
      set(val) {
        this.$emit('update:layout', val);
      },
    },
  },
  mounted() {
    // this.layout.forEach((item) => {
    //   if (item.type === 'row') {
    //     this.layoutMap[item.y] = [];
    //   } else {
    //     let keys = Object.keys(this.layoutMap);
    //     if (this.layoutMap[keys[keys.length - 1]] && item.y > +keys) {
    //       this.layoutMap[keys[keys.length - 1]].push(item.title);
    //     }
    //     console.log(this.layoutMap);
    //   }
    // });

    this.layoutOld = JSON.parse(JSON.stringify(this.layout));
    this.$nextTick(() => {
      console.log(this.$refs.chart[0]);
      this.$refs.chart[0].reSetOption();
    });
  },
  methods: {
    collapse(row, clickFlag) {
      if (clickFlag) {
        debugger;
        let arr = JSON.parse(JSON.stringify(this.sortLayout));
        let arr3 = [];
        let arr1 = arr.filter((e) => e.type === 'row');
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 'row') {
            break;
          } else {
            arr3.push(arr[i]);
          }
        }
        let arr2 = [];
        arr1.forEach((item) => {
          if (row.i === item.i) {
            item.arrow = !row.arrow;
            item.isDraggable = true;
            if (row.arrow) {
              arr2 = [...arr2, ...[item]];
            } else {
              item.isDraggable = false;
              arr2 = [...arr2, ...[item], ...item.panels];
            }
          } else {
            if (item.arrow) {
              arr2 = [...arr2, ...[item], ...item.panels];
            } else {
              arr2 = [...arr2, ...[item]];
            }
          }
        });
        this.sortLayout = [...arr3, ...arr2];
        let sortLayoutRow = arr.filter((e) => e.type === 'row');
        let rowIndex = '';
        let rowy = 0;
        sortLayoutRow.forEach((item, index) => {
          if (item.i === row.i) {
            rowIndex = index;
            rowy =
              item.panels[item.panels.length - 1].y +
              item.panels[item.panels.length - 1].h -
              1;
          }
          if (index > rowIndex && item.arrow) {
            item.panels.forEach((ite) => {
              ite.y += rowy;
            });
          }
          if (index > rowIndex) {
            item.y += rowy;
          }
        });
        this.sortLayout.forEach((item) => {
          sortLayoutRow.forEach((ite) => {
            if (item.i === ite.i) {
              item.panels = ite.panels;
            }
          });
        });
        console.log(this.sortLayout);
        this.layoutData = JSON.parse(JSON.stringify(this.sortLayout));
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.chart[0] && this.$refs.chart[0].reSetOption();
          }, 500);
        });
      }
    },
    layoutReadyEvent(newLayout) {
      let arr = JSON.parse(JSON.stringify(newLayout));
      this.sortLayout = arr.sort((a, b) => {
        let x = a['y']; //如果要从大到小,把x,y互换就好
        let y = b['y'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      let arr1 = {};
      this.sortLayout.forEach((item) => {
        if (item.type === 'row') {
          arr1['key' + item.i] = [];
        } else {
          let keys = Object.keys(arr1);
          if (arr1[keys[keys.length - 1]]) {
            arr1[keys[keys.length - 1]].push(item);
          }
        }
      });
      this.sortLayout.forEach((item) => {
        Object.keys(arr1).forEach((it) => {
          if ('key' + item.i === it) {
            if (arr1[it].length) {
              item.panels = arr1[it];
            }
          }
        });
      });
      this.layoutData = JSON.parse(JSON.stringify(this.sortLayout));
    },
    layoutUpdatedEvent() {
      debugger;
      let arr = JSON.parse(JSON.stringify(this.$refs.layout.layout));
      let arrRow = arr.filter((e) => e.type === 'row');
      let arrSortLayout = JSON.parse(JSON.stringify(this.sortLayout));
      let arrSortLayoutRow = arrSortLayout.filter((e) => e.type === 'row');
      let arrRowNew = arrRow.sort((a, b) => {
        let x = a['y']; //如果要从大到小,把x,y互换就好
        let y = b['y'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      arrRowNew.forEach((item, index) => {
        arrSortLayoutRow.forEach((ite) => {
          if (item.i === ite.i) {
            let y = item.y - ite.y;
            item.panels.forEach((it) => {
              it.y = it.y + y;
              if (arrRowNew[index + 1] && it.y - arrRowNew[index + 1].y >= 0) {
                it.y =
                  it.y -
                  (it.y - arrRowNew[index + 1].y > 0
                    ? it.y - arrRowNew[index + 1].y
                    : 1);
              }
              it.y += 1;
            });
          }
        });
      });
      arr.forEach((item) => {
        arrRowNew.forEach((ite) => {
          if (item.i === ite.i) {
            item.panels = ite.panels;
          }
        });
      });
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].type === 'row') {
          break;
        } else {
          arr2.push(arr[i]);
        }
      }
      if (arr2.length) {
        let flag = false;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === 'row') {
            arr[i].panels.forEach((item) => {
              arr2.forEach((it) => {
                if (it.i === item.i) {
                  flag = true;
                }
              });
            });
            if (!flag) {
              arr[i].panels = [...arr[i].panels, ...arr2];
            }
            break;
          }
        }
      }
      this.sortLayout = arr.sort((a, b) => {
        let x = a['y']; //如果要从大到小,把x,y互换就好
        let y = b['y'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      let arr1 = {};
      this.sortLayout.forEach((item) => {
        if (item.type === 'row') {
          arr1['key' + item.i] = [];
        } else {
          let keys = Object.keys(arr1);
          if (arr1[keys[keys.length - 1]]) {
            arr1[keys[keys.length - 1]].push(item);
          }
        }
      });
      this.sortLayout.forEach((item) => {
        Object.keys(arr1).forEach((it) => {
          if ('key' + item.i === it) {
            if (arr1[it].length) {
              let flag = false;
              arr1[it].forEach((ite) => {
                item.panels.forEach((i) => {
                  if (ite.i === i.i) {
                    flag = true;
                  }
                });
              });
              if (item.arrow) {
                item.panels = arr1[it];
              } else {
                if (!flag) {
                  item.panels = [...item.panels, ...arr1[it]];
                }
              }
              // item.panels = arr1[it];
            } else {
              let arr4 = [];
              this.sortLayout.forEach((ite) => {
                if (ite.type !== 'row') {
                  arr4.push(ite);
                }
              });
              if (arr4.length >= item.panels.length) {
                item.panels = [];
              }
            }
          }
        });
      });
      console.log(this.sortLayout);
    },
    layoutUpdated() {
      // console.log(newLayout);
    },
    resizedEvent(position, item) {
      console.log(position, item);
      this.layoutUpdatedEvent();
      this.$refs.chart[0].chartResize();
    },
  },
};
</script>
<style>
*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
<style scoped lang="scss">
.grid-box {
  .item-outer {
    height: 100%;
    box-shadow: 0px 2px 8px 0px rgba(33, 76, 217, 0.2);
    .chart-body {
      height: calc(100% - 40px);
      background: #fff;
      // padding: 15px;
      position: relative;
    }
    .padding10 {
      padding: 10px;
    }
  }
}
</style>