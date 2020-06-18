import { formatDate } from '@/utils'
// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'name',
    formItemLabel: '优惠活动名称',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '优惠名称',
    columnName: 'name',
    columnWidth: '',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '开始时间',
    columnName: 'startDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '结束时间',
    columnName: 'endDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '金额上限',
    columnName: 'upLimitMoney',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '金额下限',
    columnName: 'downLimitMoney',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '仅限老用户',
    columnName: 'year',
    columnWidth: '',
    columnFixed: false,
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '120',
  columnFixed: 'right',
};

// 操作插槽名称
export const columnOpSlotName = 'table-operations';

const searchForm = {
  roleType: '',
  mobile: '',
  pageSize: 10,
  pageNo: 1,
};
export const mockData = {
  count: 8,
  list: [

  ],
  pageSizes: [10, 20, 30 ,50 ,100],
  pageSize: 10,
  pageNo: 1,
  pagerCount: 9
};

export const paginationParams = {
  pageSizes: [10, 20, 30 ,50 ,100],
  pageSize: 2,
  pageNo: 1,
  pagerCount: 9,
  total: 0,
  showPageBtnBg: true,
  hideOnSinglePage: false
};

export const state = {
  showRole: false, // 展示列表还是角色管理
  loading: false,
  form: { ...searchForm },
  data: [],
  // data: { list: [], count: 0, pageSize: 10, pageNo: 1 },
};
