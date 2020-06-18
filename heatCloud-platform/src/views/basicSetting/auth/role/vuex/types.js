// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'roleName',
    formItemLabel: '角色名称',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入角色名称',
    formItemStyle: {
      width: '180px',
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '角色名称',
    columnName: 'roleName',
    columnWidth: '',
  },
  {
    columnLabel: '角色描述',
    columnName: 'roleDesc',
    columnWidth: '',
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '200',
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
