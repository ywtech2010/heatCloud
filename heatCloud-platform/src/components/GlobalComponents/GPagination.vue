<template lang="html">
  <div class="g-pagination">
    <el-pagination
      :background="showPageBtnBg"
      :hide-on-single-page="hideOnSinglePage"
      :current-page="pageNo"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="total"
      :pager-count="pagerCount"
      :layout="layout"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
    <!--@prev-click="handlePrevClick"-->
    <!--@next-click="handleNextClick"-->
  </div>
</template>

<script>
  /**
   * 参数说明：
   * background--是否为分页按钮添加颜色 boolean
   * hide-on-single-page --只有一页时是否隐藏 boolean
   * current-page --当前页数 Number
   * page-sizes --每页显示个数选择器的选项设置 Number[]
   * page-size --每页显示的条数 Number
   * pager-count --页码按钮的数量，当总页数超过该值时会折叠 大于等于 5 且小于等于 21 的奇数 默认7
   * total --总的数据条数
   * layout --组件布局，子组件名用逗号分隔 sizes, prev, pager, next, jumper, ->, total, slot
   */
  export default {
    components: {},
    props: {
      namespace: {
        type: String,
        required: true
      },
      layout: {
        type: String,
        default() {
          return "total, sizes, prev, pager, next, jumper"
        }
      },
      pageNo: {
        type: Number
      },
      total: {
        type: Number
      },
      pagerCount: {
        type: Number,
        default() {
          return 7
        }
      },
      pageSize: {
        type: Number
      },
      pageSizes: {
        type: Array
      },
      hideOnSinglePage: {
        type: Boolean,
        default() {
          return true
        }
      },
      showPageBtnBg: {
        type: Boolean,
        default() {
          return false
        }
      },
      handleSizeChange: {
        type: Function,
        default: () => {

        }
      },
      handleCurrentChange: {
        type: Function,
        default: () => {

        }
      },
      handlePrevClick: {
        type: Function,
        default: () => {

        }
      },
      handleNextClick: {
        type: Function,
        default: () => {

        }
      },
    },
    data() {
      return {};
    }
  };
</script>

<style lang="scss" scoped>
  .g-pagination {
    padding: 20px 0;
    text-align: right;
  }
</style>
