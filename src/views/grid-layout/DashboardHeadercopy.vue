<template>
  <div class="dashboard-row" @click="collapse(row)" v-if="row.type==='row'">
    {{row.y}}-{{row.h}}-{{row.yH}}
    <i v-if="row.arrow" class="cl-icon-arrow-down"></i>
    <i v-else class="cl-icon-arrow-right"></i>
    <span>{{row.title}}</span>
    <i class="cl-icon-menu drag-icon" v-if="!row.arrow"></i>
  </div>
  <div v-else class="dashboard-container">
    <div class="title" @click="dropdownMenu" ref="title">
      <div class="panel-title">
        <h3>{{row.title}}</h3>
        <div>
          <i class="cl-icon-arrow-down icon"></i>
        </div>
        <div v-if="dropdownShow">
          <div class="panel-menu-container">
            <ul class="dropdown-menu">
              <li
                v-for="(item ,index) in menu"
                @click="command(item)"
                :key="index"
                @mouseenter="hoverIndex=index"
                @mouseleave="hoverIndex=''"
                :class="['dropdown-submenu',{'dropdown-menu-divided':item.divided}]"
              >
                <span>{{item.name}}</span>
                <ul v-if="item.children&&hoverIndex===index" class="dropdown-menu">
                  <li
                    v-for="(ite ,idx) in item.children"
                    :key="idx"
                    @click.stop="command(ite)"
                  >{{ite.name}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <template slot="content"></template>
  </div>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      menu: [
        {
          name: 'view',
        },
        {
          name: 'more',
          children: [{ name: 'Data' }, { name: 'Query' }],
        },
        {
          name: 'more1',
          children: [{ name: 'Data1' }, { name: 'Query1' }],
        },
        {
          name: 'remove',
          divided: true,
        },
      ],
      hoverIndex: '',
      dropdownShow: false,
      time: '',
      clickFlag: true,
    };
  },
  mounted() {
    window.addEventListener('mousedown', () => {
      this.time = new Date().getTime();
    });
    window.addEventListener('mouseup', () => {
      if (new Date().getTime() - this.time > 200) {
        this.clickFlag = false;
        this.dropdownShow = false;
      } else {
        this.clickFlag = true;
      }
      this.time = 0;
    });
    window.addEventListener('click', (e) => {
      if (this.$refs.title && !this.$refs.title.contains(e.target)) {
        if (this.dropdownShow == true) {
          this.dropdownShow = false;
        }
      }
    });
  },
  methods: {
    dropdownMenu() {
      if (this.clickFlag) {
        this.dropdownShow = !this.dropdownShow;
      }
    },
    command(val) {
      if (val) {
        console.log(val);
        this.dropdownShow = false;
      }
    },
    chartTitleBtn() {
      console.log(1121);
    },
    collapse(row) {
      this.$emit('collapse', row, this.clickFlag);
    },
  },
};
</script>
<style>
ul,
li {
  list-style: none;
}
</style>
<style lang="scss" scoped>
.dashboard-row {
  cursor: pointer;
  position: relative;
  line-height: 30px;
  .drag-icon {
    position: absolute;
    right: 0;
    cursor: move;
    top: 8px;
  }
}
.dashboard-container {
  .title {
    .panel-title {
      align-items: center;
      display: flex;
      flex-wrap: nowrap;
      font-weight: 500;
      height: 32px;
      justify-content: center;
      line-height: 32px;
      position: relative;
      width: 100%;
      h3 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: calc(100% - 38px);
        cursor: pointer;
        font-weight: 500;
        font-size: 1rem;
        margin: 0px;
        position: relative;
        z-index: 1;
      }
      .icon {
        cursor: pointer;
        opacity: 0;
        position: absolute;
        top: calc(50% - 7px);
      }
      &:hover {
        .icon {
          opacity: 1;
        }
      }
      .panel-menu-container {
        display: inline-block;
        height: 19px;
        width: 0;
        position: relative;
        cursor: pointer;
        .dropdown-menu {
          z-index: 1;
          position: absolute;
          min-width: 140px;
          left: -100px;
          top: 25px;
          background-color: #fff;
          border: 1px solid #ebeef5;
          border-radius: 4px;
          box-shadow: 0 2px 8px 0 rgba(33, 76, 217, 0.2);
          color: #212a40;
          li {
            line-height: 27px;
            padding: 0 15px;
            position: relative;
            &:hover {
              background-color: #ecf5ff;
              color: #66b1ff;
            }
          }
          .dropdown-menu-divided {
            border-top: 1px solid #ebeef5;
            margin-top: 4px;
          }
          .dropdown-submenu {
            .dropdown-menu {
              left: 100%;
              margin-left: -1px;
              margin-top: 0;
              top: 0;
            }
          }
        }
      }
    }
    .dropdown-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .dropdown-menu {
        background-color: #fff;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        box-shadow: 0 2px 8px 0 rgba(33, 76, 217, 0.2);
        position: absolute;
        left: 100%;
        padding: 6px 0;
        color: #212a40;
        top: 0;
        li {
          line-height: 27px;
          padding: 0 15px;
          &:hover {
            background-color: #ecf5ff;
            color: #66b1ff;
          }
        }
      }
    }
  }
}
</style>