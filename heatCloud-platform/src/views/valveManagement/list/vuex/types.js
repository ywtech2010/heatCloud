import { formatDate } from '@/utils';
// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'mobile',
    formItemLabel: '地区选择组件',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px',
    },
  },
  {
    formItemName: 'address',
    formItemLabel: '阀门地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px',
    },
  },
  {
    formItemName: 'code',
    formItemLabel: '阀门序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
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
    columnWidth: '150',
    columnFixed: true, // true / left / right
  },
  {
    columnLabel: '阀门地址',
    columnName: 'controllerAddress',
    columnWidth: '200',
  },
  {
    columnLabel: '进水温度',
    columnName: 'inTemperature',
    columnWidth: '100',
    formatter: parseTemperature,
  },
  {
    columnLabel: '回水温度',
    columnName: 'outTemperature',
    columnWidth: '100',
    formatter: parseTemperature,
  },
  {
    columnLabel: '进回水温差',
    columnName: 'departTemperature',
    columnWidth: '100',
    formatter: parseTemperature,
  },
  {
    columnLabel: '室内温度',
    columnName: 'indoorTemperature',
    columnWidth: '100',
    formatter: parseTemperature,
  },
  {
    columnLabel: '阀门开度',
    columnName: 'openPecent',
    columnWidth: '120',
    formatter: parseOpenPecent,
  },
  {
    columnLabel: '开阀累计时间',
    columnName: 'totalTime',
    columnWidth: '140',
    formatter: parseTotalTime,
  },
  {
    columnLabel: '采集时间',
    columnName: 'collectDate',
    columnWidth: '160',
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss',
  },
];

function parseTemperature(value) {
  return value ? `${value}℃` : '/';
}

function parseTotalTime(value) {
  return value ? `${value}小时` : '/';
}

function parseOpenPecent(value) {
  return value ? `${value}%` : '/';
}

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
  code: '',
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
