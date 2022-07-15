<template>
  <div>
    <GridLayoutVue :layout.sync="layout">
      <template #default="item">
        <div v-if="item.row.i==='2'">2</div>
        <div v-if="item.row.i==='4'">4</div>
      </template>
      <template #table-old="item">{{item.row.type}}</template>
    </GridLayoutVue>
  </div>
</template>
<script>
import GridLayoutVue from './GridLayout.vue';
export default {
  components: {
    GridLayoutVue,
  },
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 24,
          h: 1,
          i: '0',
          type: 'row',
          title: '资源总览1',
          show: true,
          minW: 24,
          minH: 1,
          maxW: 24,
          maxH: 1,
          isDraggable: false,
          isResizable: false,
          arrow: true,
          data: {},
          panels: [],
        },
        {
          x: 10,
          y: 1,
          w: 5,
          h: 5,
          i: '2',
          title: '资源明细1',
          type: 'graph',
          show: true,
          minW: 1,
          minH: 1,
          maxW: 24,
          maxH: 24,
          isDraggable: true,
          isResizable: true,
        },
         {
          x: 0,
          y: 6,
          w: 24,
          h: 1,
          i: '1',
          type: 'row',
          title: '资源总览2',
          show: true,
          minW: 24,
          minH: 1,
          maxW: 24,
          maxH: 1,
          isDraggable: false,
          isResizable: false,
          arrow: true,
          panels: [],
        },
        {
          x: 0,
          y: 7,
          w: 5,
          h: 5,
          i: '4',
          title: '运行时间',
          type: 'number',
          numVal: '1111111111',
          show: true,
          minW: 1,
          minH: 1,
          maxW: 24,
          maxH: 24,
          isDraggable: true,
          isResizable: true,
        },
        {
          x: 6,
          y: 12,
          w: 5,
          h: 5,
          i: '5',
          title: '运行时间2',
          type: 'chart',
          show: true,
          minW: 1,
          minH: 1,
          maxW: 24,
          maxH: 24,
          option: {
            tooltip: {
              trigger: 'item',
            },
            legend: {
              top: '5%',
              left: 'center',
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold',
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' },
                ],
              },
            ],
          },
          isDraggable: true,
          isResizable: true,
        },
       
        {
          x: 10,
          y: 7,
          w: 5,
          h: 5,
          i: '3',
          type: 'table-old',
          title: '资源明细2',
          show: true,
          minW: 1,
          minH: 1,
          maxW: 24,
          maxH: 24,
          isDraggable: true,
          isResizable: true,
        },
        {
          x: 0,
          y: 13,
          w: 24,
          h: 1,
          i: '6',
          type: 'row',
          title: '资源总览3',
          show: true,
          minW: 24,
          minH: 1,
          maxW: 24,
          maxH: 1,
          isDraggable: false,
          isResizable: false,
          arrow: true,
          data: {},
          panels: [],
        },
        {
          x: 10,
          y: 14,
          w: 5,
          h: 5,
          i: '7',
          title: '资源明细3',
          type: 'graph',
          show: true,
          minW: 1,
          minH: 1,
          maxW: 24,
          maxH: 24,
          isDraggable: true,
          isResizable: true,
        },
      ],
    };
  },

  mounted() {},
  methods: {
    click() {
      console.log(0);
    },
    click1() {
      console.log(1);
    },
    click2() {
      console.log(2);
    },
  },
};
</script>
<style scoped lang="scss">
</style>