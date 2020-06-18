// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'roleName',
    formItemLabel: '',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
  },
  {
    formItemName: 'roleName',
    formItemLabel: '开始供暖时间',
    formItemType: 'DATE_TIME_PICKER',
    formItemPlaceholder: '请选择供暖开始时间',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'roleName',
    formItemLabel: '结束供暖时间',
    formItemType: 'DATE_TIME_PICKER',
    formItemPlaceholder: '请选择供暖开始时间',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'roleName',
    formItemLabel: '换热站名称',
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
    columnLabel: '换热站名称',
    columnName: 'name',
    columnWidth: '130',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '小区数量',
    columnName: 'phone',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '地址',
    columnName: 'name',
    columnWidth: '200',
    columnFixed: false,
  },
  {
    columnLabel: '提前开阀时间',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '开始供暖时间',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '结束供暖时间',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '220',
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
  data: mockData,
  // data: { list: [], count: 0, pageSize: 10, pageNo: 1 },
};
