// ---- 页面配置参数 ----
// 查询组件参数
// INPUT  SELECT  DATE_PICKER  DATE_TIME_PICKER
export const queryConditions = [
  {
    formItemName: '',
    formItemLabel: '',
    formItemType: 'AREA',
    formItemPlaceholder: '',
    formItemStyle: {
      width: '180px',
    },
  },
  {
    formItemName: 'address',
    formItemLabel: '阀门地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '',
    formItemStyle: {
      width: '300px',
    },
  },
  {
    formItemName: 'code',
    formItemLabel: '阀门序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '',
    formItemStyle: {
      width: '180px',
    },
  },
  {
    formItemName: 'openStatus',
    formItemLabel: '阀门状态',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择阀门状态',
    formItemOptions: [
      { value: 0, label: '开启' },
      { value: 1, label: '关闭' },
      { value: 2, label: '开启中' },
      { value: 3, label: '关闭中' },
    ],
    formItemStyle: {
      width: '180px',
    },
  },
  {
    formItemName: 'payStatus',
    formItemLabel: '缴费状态',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择缴费状态',
    formItemOptions: [
      { value: 0, label: '未缴费' },
      { value: 1, label: '已缴费' },
      { value: 2, label: '不需要' },
    ],
    formItemStyle: {
      width: '180px',
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '阀门序列号',
    columnName: 'code',
    columnWidth: '160',
  },
  {
    columnLabel: '阀门地址',
    columnName: 'controllerAddress',
    columnWidth: '220',
  },
  // {
  //   columnLabel: '最小回水温度',
  //   columnName: 'minOutTemp',
  //   columnWidth: '160'
  // },
  {
    columnLabel: '回水温度',
    columnName: 'maxOutTemp',
    columnWidth: '160',
    slotName: 'maxOutTempSlot',
  },
  {
    columnLabel: '阀门开度',
    columnName: 'openPecent',
    columnWidth: '',
    formatter: parseOpenPecent,
  },
  {
    columnLabel: '缴费状态',
    columnName: 'payStatus',
    columnWidth: '',
    slotName: 'payStatusSlot',
  },
  {
    columnLabel: '状态',
    columnName: 'status',
    columnWidth: '',
    slotName: 'statusSlot',
  },
];

export function parseTemperature(value) {
  return value ? `${value}℃` : '/';
}

function parseOpenPecent(value) {
  return value ? `${value}%` : '/';
}

export const payStatus = {
  null: {
    name: '未缴费',
  },
  '0': {
    name: '未缴费',
  },
  '1': {
    name: '已缴费',
  },
  '2': {
    name: '不需要',
  },
};
export const status = {
  '0': {
    name: '关闭',
  },
  '1': {
    name: '开启',
  },
  '2': {
    name: '开启中',
  },
  '3': {
    name: '关闭中',
  },
};

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '200',
  columnAlign: 'right',
};

// 操作插槽名称
export const columnOpSlotName = 'table-operations';

const searchForm = {
  areaForm: {
    province: '',
    city: '',
    county: '',
    street: '',
    village: '',
  },
  address: '',
  openStatus: '',
  payStatus: '',
  code: '',
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
  areaPartOne: [],
  areaPartTwo: [],
  provinces: [],
  cities: [],
  counties: [],
  streets: [],
  villages: [],
  // data: { list: [], count: 0, pageSize: 10, pageNo: 1 },
};
