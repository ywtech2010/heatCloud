// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'roleType',
    formItemLabel: '角色类型',
    formItemType: 'SELECT',
    formItemPlaceholder: '请输入选择角色类型',
    formItemStyle: {
      width: '180px',
    },
    formItemOptions: [
      { value: 0, label: '用户管理员' },
      { value: 1, label: '阀门管理员' },
    ],
  },
  {
    formItemName: 'mobile',
    formItemLabel: '联系方式',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入联系方式',
    formItemStyle: {
      width: '180px',
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '姓名',
    columnName: 'managerName',
    columnWidth: '',
    columnFixed: true, // true / left / right
  },
  {
    columnLabel: '联系方式',
    columnName: 'phone',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '邮箱',
    columnName: 'email',
    columnWidth: '180',
    columnFixed: false,
  },
  {
    columnLabel: '角色',
    columnName: 'roleName',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '归属',
    columnName: 'sysFlag',
    columnWidth: '80',
    columnFixed: false,
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '290',
  columnFixed: 'right',
};

// 操作列插槽名称
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
      origin: '不知道',
    },
    {
      id: 1,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 2,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 3,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 4,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 5,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 6,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 7,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 8,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 9,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
    {
      id: 10,
      name: '张珊珊',
      phone: '18820200421',
      email: '18820200421@163.com',
      secretKey: 'AHSJSNNSJJ',
      role: '用户管理员',
      origin: '不知道',
    },
  ],
  pageSizes: [10, 20, 30, 50, 100],
  pageSize: 10,
  pageNo: 1,
  pagerCount: 9,
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
  data: mockData,
  // data: { list: [], count: 0, pageSize: 10, pageNo: 1 },
};
