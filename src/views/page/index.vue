<template>
  <div>
    <cl-layout-wrap class="my-demo1">
      <template slot="header">我是header</template>
      <div :style="[{width: `${leftWidth}px`, transition: 'width .5s'}]" slot="left">
        <p>我是左菜单</p>
        <cl-link @click="toggleLeft">展开/折叠</cl-link>
      </div>
      <cl-layout-content>
        <div slot="title">
          <cl-content-title :show-back="true">
            标题
            <div slot="right">
              <cl-button>按钮区域-靠右</cl-button>
            </div>
          </cl-content-title>
        </div>
        <div slot="title-after">title下方内容</div>
        <div style="padding:20px;background-color: #fff;">
          <cl-row
            v-for="(item, index) in filterPluginList"
            :key="index"
            :gutter="20"
            style="margin-bottom:20px"
          >
            <cl-col v-for="(innerItem, innerIndex) in item" :key="innerIndex" :span="6">
              <div class="box" @click="openDescDia(innerItem)"  draggable="true">
                <div class="box-top">
                  <img :src="innerItem.logo" />
                </div>
                <div class="box-bottom">{{ innerItem.desc }}</div>
              </div>
            </cl-col>
          </cl-row>
          <Dilog v-if="visible" :visible.sync="visible" :bgImg="bgImg" :title="title">
            <div class="desc" slot="left">
              <div class="float-l left" style="width:516px">
                <p class="mb10">
                  通过该插件可采集阿里云各类云资源的监控数据，包括云服务器ECS、弹性公网IP等。该插件无需安装，只需要您在
                  <span
                    class="span"
                    @click="toCloudy"
                  >云环境管理</span>中接入阿里云账号即可。
                </p>
                <p class="mb10">
                  <span style="font-weight:900">注意：</span>监控数据通过阿里云API采集，存在调用频率限制，每个云账号共支持约1200个监控指标（
                  <cl-popover
                    placement="top-start"
                    title="估算方法"
                    trigger="hover"
                    content="20次/秒 × 60秒/分 × 1指标/次 ÷ 20指标/资源 = 60资源/分"
                    popper-class="plugin-pop-ali"
                  >
                    <span slot="reference" class="theme-color">约60个资源</span>
                  </cl-popover>），资源过多时无法正常采集数据。资源较多时阿里云还可能会向您收取额外的
                  <span class="span" @click="toOuter">API调用费用</span>
                </p>
                <p class="mb10">
                  建议您使用
                  <span class="span" @click="toAgent">Agent</span>监控“阿里云ECS”而非本插件，以监控更多资源并获得更加详细、实时的监控数据。
                </p>
                <p>平台支持采集如下类型资源的监控数据，您可以根据需求进行启用。</p>
              </div>
              <cl-table :data="tableData" style="width: 100%">
                <cl-table-column prop="date" label="日期" width="180"></cl-table-column>
                <cl-table-column prop="name" label="姓名" width="180"></cl-table-column>
                <cl-table-column prop="address" label="地址"></cl-table-column>
              </cl-table>
            </div>
            <!-- <PluginMd slot="right" :content="contentMd" /> -->
            <PluginMd slot="right" />
          </Dilog>
        </div>
        <template slot="footer">
          <cl-button>次要按钮</cl-button>
          <cl-button type="primary">主要按钮</cl-button>
        </template>
      </cl-layout-content>
    </cl-layout-wrap>
  </div>
</template>

<script>
import PluginMd from '@/components/PluginMd.vue';
// import contentMd from 'assets/md.md';
import { pluginList } from './agent.js';
import Dilog from '@/components/PluginDialog.vue';
export default {
  name: 'plugin',
  components: { Dilog, PluginMd },
  data() {
    return {
      filterPluginList: [],
      pluginList,
      visible: false,
      bgImg: '',
      title: '',
      leftWidth: 200,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      // contentMd,
    };
  },
  mounted() {
    function group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)));
      }
      return newArray;
    }
    this.filterPluginList = group(this.pluginList, 4);
  },
  methods: {
    toggleLeft() {
      this.leftWidth = this.leftWidth === 200 ? 50 : 200;
    },
    openDescDia(val) {
      this.visible = true;
      this.bgImg = val.logo;
      this.title = val.dialogTitle;
    },
    toCloudy() {},
    toOuter() {},
    toAgent() {},
  },
};
</script>

<style lang="scss" scoped>
.box {
  // width: 305px;
  height: 164px;
  border: 1px solid #dbdeea;
  // // margin: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 8px 0px rgba(33, 42, 64, 0.2);
  }
  .box-top {
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #dcdeea;
  }
  .box-bottom {
    background-color: #fafbfd;
    text-align: center;
    line-height: 42px;
    font-size: 12px;
  }
}
</style>
