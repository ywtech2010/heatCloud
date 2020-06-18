// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'roleName',
    formItemLabel: '',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入名称',
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '小区名称',
    columnName: 'name',
    columnWidth: '130',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '总户数',
    columnName: 'phone',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '供暖户数',
    columnName: 'name',
    columnWidth: '200',
    columnFixed: false,
  },
  {
    columnLabel: '户数百分比',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '总面积',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '供暖面积',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '百分比面积',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
  {
    columnLabel: '报警次数',
    columnName: 'phone',
    columnWidth: '130',
    columnFixed: false,
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '110',
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
