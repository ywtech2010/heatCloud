// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'username',
    formItemLabel: '操作人员',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入',
    formItemStyle: {
      width: '180px',
    },
  },
  {
    formItemName: 'belongModel',
    formItemLabel: '所属模块',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择',
    formItemStyle: {
      width: '180px',
    },
    formItemOptions: [
      { value: 0, label: '用户管理' },
      { value: 1, label: '换热站管理' },
      { value: 2, label: '阀门管理' },
      { value: 3, label: '缴费管理' },
      { value: 4, label: '消息管理' },
      { value: 5, label: '卡片管理' },
      { value: 6, label: '权限设置' },
      { value: 7, label: '信息设置' },
      { value: 8, label: '个人中心' },
    ],
  },
  // {
  //   formItemName: 'startTime',
  //   formItemLabel: '开始时间',
  //   formItemType: 'DATE_TIME_PICKER',
  //   formItemPlaceholder: '请选择',
  //   formItemElementType: 'datetime',
  //   formItemStyle: {
  //     width: '180px',
  //   },
  // },
  // {
  //   formItemName: 'endTime',
  //   formItemLabel: '截止时间',
  //   formItemType: 'DATE_TIME_PICKER',
  //   formItemPlaceholder: '请选择',
  //   formItemElementType: 'datetime',
  //   formItemStyle: {
  //     width: '180px',
  //   },
  // },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '所属模块',
    columnName: 'belongModelName',
    columnWidth: '',
  },
  {
    columnLabel: '操作项',
    columnName: 'operation',
    columnWidth: '',
  },
  {
    columnLabel: '操作内容',
    columnName: 'description',
    columnWidth: '',
  },
  {
    columnLabel: '操作人员',
    columnName: 'userName',
    columnWidth: '',
  },
  {
    columnLabel: '操作时间',
    columnName: 'createDate',
    columnWidth: '',
  },
];

const searchForm = {
  roleType: '',
  belongModel: '',
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
  loading: false,
  form: { ...searchForm },
  data: { list: [], count: 0, pageSize: 10, pageNo: 1 },
};
