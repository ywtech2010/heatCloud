// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'areaForm',
    formItemLabel: '',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
  },
  {
    formItemName: 'address',
    formItemLabel: '小区名称',
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
    columnLabel: '省份/地区',
    columnName: 'province',
    columnWidth: '100',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '城市',
    columnName: 'city',
    columnWidth: '100',
    columnFixed: false,
  },
  {
    columnLabel: '区/县',
    columnName: 'county',
    columnWidth: '100',
    columnFixed: false,
  },
  {
    columnLabel: '街道',
    columnName: 'street',
    columnWidth: '200',
    columnFixed: false,
  },
  {
    columnLabel: '小区',
    columnName: 'village',
    columnWidth: '200',
    columnFixed: false,
  },
  {
    columnLabel: '详细地址',
    columnName: 'address',
    columnWidth: '300',
    columnFixed: false,
  },
];

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '120',
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
  pageSize: 10,
  pageNo: 1,
  pagerCount: 9,
  total: 0,
  showPageBtnBg: true,
  hideOnSinglePage: false
};

export const state = {
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
};
