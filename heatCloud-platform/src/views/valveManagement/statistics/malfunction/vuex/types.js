// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: '',
    formItemLabel: '',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
  },
  {
    formItemName: 'address',
    formItemLabel: '阀门地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入阀门地址',
  },
  {
    formItemName: 'code',
    formItemLabel: '阀门序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入阀门序列号',
  },
  {
    formItemName: 'openStatus',
    formItemLabel: '阀门状态',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择阀门状态',
    formItemOptions: [
      { value: 0, label: '开阀' },
      { value: 1, label: '关闭' },
    ],
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '阀门序列号',
    columnName: 'code',
    columnWidth: '150',
  },
  {
    columnLabel: '阀门地址',
    columnName: 'controllerAddress',
    columnWidth: '220',
  },
  {
    columnLabel: '用户名',
    columnName: 'name',
    columnWidth: '',
  },
  {
    columnLabel: '联系方式',
    columnName: 'phone',
    columnWidth: '180',
  },
  {
    columnLabel: '用户地址',
    columnName: 'userAddress',
    columnWidth: '220',
  },
  {
    columnLabel: '阀门状态',
    columnName: 'status',
    columnWidth: '',
    slotName: 'statusSlot',
    columnFixed: 'right',
  },
];
export const status = {
  '0': {
    name: '关闭',
    className: 'err-c'
  },
  '1': {
    name: '开阀',
    className: 'suc-c'
  },
};

const searchForm = {
  areaForm: {
    province: '',
    city: '',
    county: '',
    street: '',
    village: '',
  },
  address: '',
  code: '',
  openStatus: '',
  pageSize: 10,
  pageNo: 1,
};
export const mockData = {
  count: 12,
  list: [],
  pageSize: 10,
  pageNo: 1,
};

export const paginationParams = {
  pageSizes: [10, 20, 30, 50, 100],
  pageSize: 2,
  pageNo: 1,
  pagerCount: 9,
  total: 0,
  showPageBtnBg: true,
  hideOnSinglePage: false,
};

export const state = {
  showRole: false, // 展示列表还是角色管理
  loading: false,
  form: { ...searchForm },
  data: [],
  // data: { list: [], count: 0, pageSize: 10, pageNo: 1 },
};
