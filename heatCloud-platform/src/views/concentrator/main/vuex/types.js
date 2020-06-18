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
    formItemLabel: '集中器地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'roleName',
    formItemLabel: '集中器序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'roleName',
    formItemLabel: '状态',
    formItemType: 'SELECT',
    formItemPlaceholder: '请输入',
    formItemOptions: [
      { value: 0, label: '在线' },
      { value: 1, label: '离线' },
    ],
    formItemStyle: {
      width: '180px'
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '集中器序列号',
    columnName: 'name',
    columnWidth: '',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '集中器地址',
    columnName: 'phone',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '同步时间',
    columnName: 'name',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '状态',
    columnName: 'phone',
    columnWidth: '',
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
