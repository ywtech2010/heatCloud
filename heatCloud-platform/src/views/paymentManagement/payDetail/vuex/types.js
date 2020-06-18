import { formatDate } from '@/utils'
// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'area',
    formItemLabel: '',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
  },
  {
    formItemName: 'address',
    formItemLabel: '用户地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入用户地址',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'userName',
    formItemLabel: '用户名',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入用户名',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'phone',
    formItemLabel: '联系方式',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入联系方式',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'controllerCode',
    formItemLabel: '阀门序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入阀门序列号',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'orderNo',
    formItemLabel: '订单编号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入订单编号',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'status',
    formItemLabel: '状态',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择状态',
    formItemStyle: {
      width: '180px'
    },
    formItemOptions: [
      { value: 0, label: '未缴费' },
      { value: 1, label: '已缴费' },
    ]
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '阀门序列号',
    columnName: 'controllerCode',
    columnWidth: '130',
    columnFixed: true, // true / left / right
  },
  {
    columnLabel: '用户名',
    columnName: 'userName',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '联系方式',
    columnName: 'phone',
    columnWidth: '110',
    columnFixed: false,
  },
  {
    columnLabel: '收费标准',
    columnName: 'chargeStandard',
    columnWidth: '100',
    columnFixed: false,
  },
  {
    columnLabel: '收费天数',
    columnName: 'days',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '供暖面积',
    columnName: 'area',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '应缴费用',
    columnName: 'shouldPay',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '实际缴费',
    columnName: 'actualPay',
    columnWidth: '130',
    columnFixed: false,
    formatter: formatActualPay,
  },
  {
    columnLabel: '缴费状态',
    columnName: 'status',
    columnWidth: '160',
    columnFixed: false,
    slotName: 'statusSlot',
  },
  {
    columnLabel: '缴费时间',
    columnName: 'payDate',
    columnWidth: '160',
    columnFixed: false,
    formatter: formatDate.convertTime,
    pattern: 'yyyy-MM-dd HH:mm:ss'
  },
  {
    columnLabel: '用户地址',
    columnName: 'address',
    columnWidth: '130',
    columnFixed: false,
  },
];

function formatActualPay(value) {
  return value || '/'
}

export const status = {
  '0': {
    name: '未缴',
    className: 'err-c'
  },
  '1': {
    name: '已缴',
    className: 'suc-c'
  },
};

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '140',
  columnFixed: 'right',
};

// 操作插槽名称
export const columnOpSlotName = 'table-operations';

export const searchForm = {

  areaForm: {
    province: '',
    city: '',
    county: '',
    street: '',
    village: '',
  },
  address: '',
  orderNo: '',
  phone: '',
  status: '',
  userName: '',
  controllerCode:'',
  pageSize: 10,
  pageNo: 1,
};
export const mockData = {
  count: 8,
  list: [
    {
      id: 0,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道'
    },
    {
      id: 1,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道'
    },
    {
      id: 2,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道'
    }
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
