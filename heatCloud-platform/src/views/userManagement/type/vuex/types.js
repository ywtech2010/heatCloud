// ---- 页面配置参数 ----
// 查询组件参数
export const queryConditions = [
  {
    formItemName: 'dicTypeName',
    formItemLabel: '类别',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择类别',
    formItemOptions: [
      { value: 'user_type', label: '用户类型' },
      { value: 'controller_type', label: '阀门类型' },
    ],
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'dicValueName',
    formItemLabel: '名称',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入名称',
    formItemStyle: {
      width: '180px'
    },
  },
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '类别',
    columnName: 'dicTypeName',
    columnWidth: '',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '名称',
    columnName: 'dicValueName',
    columnWidth: '',
    columnFixed: false,
  },
  {
    columnLabel: '状态',
    columnName: 'dicFlag',
    columnWidth: '',
    columnFixed: false,
    slotName: 'dicFlagSlot'
  },
  {
    columnLabel: '归属',
    columnName: 'dicBelong',
    columnWidth: '',
    columnFixed: false,
    slotName: 'dicBelongSlot'
  },
];

export const dicFlag = {
  '0': {
    name: '禁用',
    className: 'err-c'
  },
  '1': {
    name: '启用',
    className: 'suc-c'
  }
}
export const dicBelong = {
  '0': {
    name: '默认类型'
  },
  '1': {
    name: '设置类型'
  }
}

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '220',
  columnFixed: 'right',
};

// 操作插槽名称
export const columnOpSlotName = 'table-operations';

const searchForm = {
  dicTypeName: '',
  dicValueName: '',
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
  data: []
};
