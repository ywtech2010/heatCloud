import { formatDate } from '@/utils'
// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'name',
    formItemLabel: '缴费名称',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'userName',
    formItemLabel: '创建人',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'startDate',
    formItemLabel: '开始时间',
    formItemType: 'DATE_TIME_PICKER',
    formItemPlaceholder: '请选择开始时间',
    formItemStyle: {
      width: '200px'
    },
  },
  {
    formItemName: 'endDate',
    formItemLabel: '截止时间',
    formItemType: 'DATE_TIME_PICKER',
    formItemPlaceholder: '请选择截止时间',
    formItemStyle: {
      width: '200px'
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '缴费名称',
    columnName: 'name',
    columnWidth: '120',
    columnFixed: true, // true / left / right
  },
  {
    columnLabel: '收费标准',
    columnName: 'chargeStandard',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '收费天数',
    columnName: 'days',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '缴费开始时间',
    columnName: 'startDate',
    columnWidth: '160',
    columnFixed: false,
    slotName: 'startDate',
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '缴费截止时间',
    columnName: 'endDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '发布时间',
    columnName: 'publicDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '更新时间',
    columnName: 'updateDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '优惠名称',
    columnName: 'preferentialName',
    columnWidth: '',
    columnFixed: false,
    formatter: parsepreferentialName,
  },
  {
    columnLabel: '创建人',
    columnName: 'userName',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '创建时间',
    columnName: 'createDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
];

function parsepreferentialName(value) {
  return value || '/';
}

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '220',
  columnFixed: 'right',
};

// 操作插槽名称
export const columnOpSlotName = 'table-operations';

const searchForm = {
  name: '',
  userName: '',
  startDate:'',
  endDate:'',
  pageSize: 10,
  pageNo: 1,
};
export const mockData = {
  count: 0,
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
