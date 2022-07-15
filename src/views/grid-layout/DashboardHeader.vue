<template>
  <div class="dashboard-row" @click="collapse(row)" v-if="row.type==='row'">
    <i v-if="row.arrow" class="cl-icon-arrow-down"></i>
    <i v-else class="cl-icon-arrow-right"></i>
    <span>{{row.title}}</span>
    <i class="cl-icon-menu drag-icon"></i>
  </div>
  <div v-else class="dashboard-container">
    <div class="title">
      <cl-dropdown
        trigger="click"
        class="dropdown-box"
        placement="bottom"
        @command="(item)=>command(item)"
      >
        <h3>{{row.title}}</h3>
        <i class="cl-icon-arrow-down icon"></i>
        <cl-dropdown-menu slot="dropdown" :append-to-body="false">
          <template v-for="(item ,index) in menu">
            <cl-dropdown-item
              v-if="item.children"
              @mouseenter.native="hoverIndex=index"
              @mouseleave.native="hoverIndex=''"
              :key="index"
              icon="cl-icon-plus"
              :divided="item.divided"
            >
              <span>{{item.name}}</span>
              <ul v-if="item.children&&hoverIndex===index" class="dropdown-menu">
                <li
                  v-for="(ite ,idx) in item.children"
                  :key="idx"
                  @click="command(ite)"
                >{{ite.name}}</li>
              </ul>
            </cl-dropdown-item>
            <cl-dropdown-item
              :command="item"
              v-else
              :key="index+'1'"
              icon="cl-icon-plus"
              :divided="item.divided"
            >{{item.name}}</cl-dropdown-item>
          </template>
        </cl-dropdown-menu>
      </cl-dropdown>
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
    };
  },
  methods: {
    command(val) {
      if (val) {
        console.log(val);
      }
    },
    chartTitleBtn() {
      console.log(1121);
    },
    collapse(row) {
      if (this.collapseList.includes(+row.i)) {
        row.isDraggable = true;
        this.collapseList.splice(this.collapseList.indexOf(+row.i), 1);
        let arr = JSON.parse(JSON.stringify(this.layout));
        arr.forEach((row) => {
          if (row.y !== 0) {
            if (row.y - 5 > 0) {
              row.y -= 5;
            } else {
              row.y = 0;
            }
          }
        });
        this.layoutData = arr;
      } else {
        row.isDraggable = false;
        this.collapseList.push(+row.i);
        this.layoutData = this.layoutOld;
      }
      row.arrow = !row.arrow;
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
  .drag-icon{
    position:absolute;
    right: 0;
    cursor:move
  }
}
.dashboard-container {
  .title {
    .dropdown-box {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      h3 {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: calc(100% - 38px);
        cursor: pointer;
        font-weight: 500;
        font-size: 1rem;
        margin: 0px;
        padding-right: 20px;
        position: relative;
        z-index: 1;
      }
      .icon {
        cursor: pointer;
        opacity: 0;
        position: relative;
        right: 20px;
      }
      &:hover {
        .icon {
          opacity: 1;
        }
      }
      /deep/.cl-dropdown-menu__item {
        position: relative;
      }
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