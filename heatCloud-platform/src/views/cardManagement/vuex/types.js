// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'code',
    formItemLabel: '卡号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'id',
    formItemLabel: '卡序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'controllerCode',
    formItemLabel: '阀门序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'type',
    formItemLabel: '卡的类型',
    formItemType: 'SELECT',
    formItemPlaceholder: '请输入',
    formItemOptions: [
      { value: 0, label: '用户卡' },
      { value: 1, label: '时间卡' },
    ],
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'flag',
    formItemLabel: '状态',
    formItemType: 'SELECT',
    formItemPlaceholder: '请输入',
    formItemOptions: [
      { value: 0, label: '启用' },
      { value: 1, label: '禁用' },
    ],
    formItemStyle: {
      width: '180px'
    },
  },
];

// table 表头参数
export const tableColumns = [
  {
    columnLabel: '卡号',
    columnName: 'code',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '阀门序列号',
    columnName: 'controllerCode',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '卡的类型',
    columnName: 'typeName',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '状态',
    columnName: 'flag',
    columnWidth: '',
    columnFixed: false,
    slotName: 'statusSlot'
  },
];

// 卡片状态列颜色转换
export const statusFlag = {
  '1': {
    name: '启用',
    className: 'suc-c'
  },
  '2': {
    name: '禁用',
    className: 'err-c'
  },
}

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '110',
  columnFixed: 'right'
};

// 操作插槽名称
export const columnOpSlotName = 'table-operations';

// 查询条件默认form数据
const searchForm = {
  code: '',
  id: null,
  controllerCode: '',
  type: '',
  flag: '',
  pageSize: 10,
  pageNo: 1,
};

// 默认的分页参数
export const paginationParams = {
  pageSizes: [10, 20, 30 ,50 ,100],
  pageSize: 2,
  pageNo: 1,
  pagerCount: 9,
  total: 0,
  showPageBtnBg: true,
  hideOnSinglePage: false
};

// store中默认state数据
export const state = {
  showRole: false, // 展示列表还是角色管理
  loading: false,
  form: { ...searchForm },
  data: []
};
