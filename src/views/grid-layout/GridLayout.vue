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
      <grid-item
        v-for="item in layoutData"
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
            <div v-if="item.type!=='row'">{{item.y}}-{{item.h}}</div>
            <template v-if="item.type==='number'">
              <Number :numVal="item.numVal" :font-size="item.fontSize"></Number>
            </template>
            <template v-if="item.type==='chart'">
              <Chart height="100%" :ref="`chart${item.i}`" :options="item.option"></Chart>
            </template>
          </div>
        </div>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import DashboardHeader from './DashboardHeadercopy.vue';
import Number from './components/Number.vue';
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
      time: 0,
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
    this.layoutOld = JSON.parse(JSON.stringify(this.layout));
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs[`chart5`][0].reSetOption();
      }, 10000);
    });
  },
  methods: {
    collapse(row, clickFlag) {
      if (clickFlag) {
        let arr = JSON.parse(JSON.stringify(this.sortLayout));
        let rowIndex = '';
        let rowY = 0;
        arr.forEach((item, index) => {
          if (item.i === row.i) {
            rowIndex = index;
            if (row.arrow) {
              if (item.panels.length) {
                let maxH = 0;
                item.panels.forEach((ite) => {
                  if (ite.h > maxH) maxH = ite.h;
                  rowY =
                    maxH >
                    item.panels[item.panels.length - 1].y -
                      item.panels[0].y +
                      item.panels[item.panels.length - 1].h
                      ? maxH
                      : item.panels[item.panels.length - 1].y -
                        item.panels[0].y +
                        item.panels[item.panels.length - 1].h;
                });
              }
              item.yH = rowY;
            } else {
              rowY = item.yH || 0;
            }
          } else {
            if (index > rowIndex) {
              if (row.arrow) {
                item.y -= rowY;
                item.panels &&
                  item.panels.forEach((ite) => {
                    ite.y -= rowY;
                  });
              } else {
                item.y += rowY;
                item.panels &&
                  item.panels.forEach((ite) => {
                    ite.y += rowY;
                  });
              }
            }
          }
        });
        let index = null;
        let flag = true;
        arr.forEach((item, idx) => {
          if (item.i === row.i) {
            item.arrow = !row.arrow;
            item.isDraggable = !item.arrow;
            flag = item.arrow;
            index = idx;
          }
        });
        if (flag) {
          arr.splice(index + 1, 0, ...arr[index].panels);
        } else {
          arr.splice(index + 1, arr[index].panels.length);
        }
        let obj = {};
        this.sortLayout = arr.reduce((item, next) => {
          obj[next.i] ? '' : (obj[next.i] = true && item.push(next));
          return item;
        }, []);
        this.layoutData = JSON.parse(JSON.stringify(this.sortLayout));
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs[`chart5`] &&
              this.$refs[`chart5`][0] &&
              this.$refs[`chart5`][0].reSetOption();
          }, 2000);
        });
      }
    },
    layoutReadyEvent(newLayout) {
      let arr = JSON.parse(JSON.stringify(newLayout));
      this.sortLayout = arr.sort((a, b) => {
        let x = a['y'];
        let y = b['y'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      let arrObj = {};
      this.sortLayout.forEach((item) => {
        if (item.type === 'row') {
          arrObj['key' + item.i] = [];
        } else {
          let keys = Object.keys(arrObj);
          if (arrObj[keys[keys.length - 1]]) {
            arrObj[keys[keys.length - 1]].push(item);
          }
        }
      });
      this.sortLayout.forEach((item) => {
        Object.keys(arrObj).forEach((it) => {
          if ('key' + item.i === it) {
            if (arrObj[it].length) {
              item.panels = arrObj[it];
            }
          }
        });
      });
      this.layoutData = JSON.parse(JSON.stringify(this.sortLayout));
    },
    layoutUpdatedEvent() {
      let arr = JSON.parse(JSON.stringify(this.$refs.layout.layout));
      let arrRow = arr.filter((e) => e.type === 'row');
      let arrSortLayout = JSON.parse(JSON.stringify(this.sortLayout));
      let arrSortLayoutRow = arrSortLayout.filter((e) => e.type === 'row');
      let arrRowNew = arrRow.sort((a, b) => {
        let x = a['y'];
        let y = b['y'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      arrRowNew.forEach((item) => {
        arrSortLayoutRow.forEach((ite) => {
          if (item.i === ite.i) {
            let y = item.y - ite.y;
            item.panels.forEach((it) => {
              it.y = it.y + y;
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
      // let arr2 = [];
      // for (let i = 0; i < arr.length; i++) {
      //   if (arr[i].type === 'row') {
      //     break;
      //   } else {
      //     arr2.push(arr[i]);
      //   }
      // }
      // if (arr2.length) {
      //   let flag = false;
      //   for (let i = 0; i < arr.length; i++) {
      //     if (arr[i].type === 'row') {
      //       arr[i].panels.forEach((item) => {
      //         arr2.forEach((it) => {
      //           if (it.i === item.i) {
      //             flag = true;
      //           }
      //         });
      //       });
      //       if (!flag) {
      //         arr[i].panels = [...arr[i].panels, ...arr2];
      //       }
      //       break;
      //     }
      //   }
      // }
      this.sortLayout = arr.sort((a, b) => {
        let x = a['y'];
        let y = b['y'];
        return x < y ? -1 : x > y ? 1 : 0;
      });
      let arrObj = {};
      let arrUnRow = [];
      this.sortLayout.forEach((item) => {
        if (item.type === 'row') {
          arrObj['key' + item.i] = [];
        } else {
          arrUnRow.push(item);
          let keys = Object.keys(arrObj);
          if (arrObj[keys[keys.length - 1]]) {
            arrObj[keys[keys.length - 1]].push(item);
          }
        }
      });
      this.sortLayout.forEach((item) => {
        Object.keys(arrObj).forEach((it) => {
          if ('key' + item.i === it) {
            if (arrObj[it].length) {
              let flag = false;
              arrObj[it].forEach((ite) => {
                item.panels.forEach((i) => {
                  if (ite.i === i.i) {
                    flag = true;
                  }
                });
              });
              if (item.arrow) {
                item.panels = arrObj[it];
              } else {
                if (!flag) {
                  item.panels = [...item.panels, ...arrObj[it]];
                }
              }
            } else {
              let num = 0;
              item.panels.forEach((ite) => {
                arrUnRow.forEach((i) => {
                  if (i.i === ite.i) {
                    num++;
                  }
                });
              });
              if (num === item.panels.length) {
                item.panels = [];
              }
            }
          }
        });
      });
    },
    layoutUpdated() {
      // console.log(newLayout);
    },
    resizedEvent(newPosition, item) {
      this.layoutUpdatedEvent();
      this.$refs[`chart${item.i}`][0].chartResize();
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