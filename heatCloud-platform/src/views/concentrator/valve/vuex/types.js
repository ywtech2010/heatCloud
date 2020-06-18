// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'mobile',
    formItemLabel: '地区选择组件',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
  },
  {
    formItemName: 'mobile',
    formItemLabel: '阀门地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'mobile',
    formItemLabel: '阀门序列号',
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
    columnLabel: '阀门序列号',
    columnName: 'name',
    columnWidth: '100',
  },
  {
    columnLabel: '阀门地址',
    columnName: 'phone',
    columnWidth: '200',
  },
  {
    columnLabel: '进水温度',
    columnName: 'email',
    columnWidth: '100',
  },
  {
    columnLabel: '回水温度',
    columnName: 'secretKey',
    columnWidth: '100',
  },
  {
    columnLabel: '进回水温差',
    columnName: 'role',
    columnWidth: '100',
  },
  {
    columnLabel: '室内温度',
    columnName: 'origin',
    columnWidth: '100',
  },
  {
    columnLabel: '阀门开度',
    columnName: 'secretKey',
    columnWidth: '120',
  },
  {
    columnLabel: '开阀累计时间',
    columnName: 'role',
    columnWidth: '140',
  },
  {
    columnLabel: '采集时间',
    columnName: 'origin',
    columnWidth: '140',
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '80',
  columnAlign: 'right',
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
  count: 12,
  list: [
    {
      id: 0,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
  ],
  pageSize: 10,
  pageNo: 1,
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
