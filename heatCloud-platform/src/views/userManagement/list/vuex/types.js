// ---- 页面配置参数 ----
// 查询组件参数
import { userTypeValueList } from '@/views/userManagement/type/vuex/api';
export const getSelectData = function(type){
  let params = {
    pageSize: 100,
    pageNo: 1,
    dicTypeName: type
  };
  let list = [];
  userTypeValueList(params).then(res => {
    res.list.map(item => {
      list.push({
        label: item.dicValueName,
        value: item.dicTypeId
      })
    });
  });
  return list
};

export const queryConditions = [
  {
    formItemName: 'areaForm',
    formItemLabel: '',
    formItemType: 'AREA',
    formItemPlaceholder: '请输入',
  },
  {
    formItemName: 'address',
    formItemLabel: '详细地址',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入详细地址',
    formItemStyle: {
      width: '300px'
    },
  },
  {
    formItemName: 'valveSerialNo',
    formItemLabel: '阀门序列号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入阀门序列号',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'username',
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
    formItemName: 'familyNum',
    formItemLabel: '户号',
    formItemType: 'INPUT',
    formItemPlaceholder: '请输入户号',
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'userTypeId',
    formItemLabel: '用户类型',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择用户类型',
    formItemOptions: getSelectData('user_type'),
    formItemStyle: {
      width: '180px'
    },
  },
  {
    formItemName: 'controllerTypeId',
    formItemLabel: '阀门类型',
    formItemType: 'SELECT',
    formItemPlaceholder: '请选择阀门类型',
    formItemOptions: getSelectData('controller_type'),
    formItemStyle: {
      width: '180px'
    },
  }
];
// table 表头参数
export const tableColumns = [
  {
    columnLabel: '用户名',
    columnName: 'username',
    columnWidth: '120',
    columnFixed: true,
  },
  {
    columnLabel: '阀门序列号',
    columnName: 'valveSerialNo',
    columnWidth: '120',
    columnFixed: false, // true / left / right
  },
  {
    columnLabel: '网络户号',
    columnName: 'familyNum',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '联系方式',
    columnName: 'phone',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '用户类型',
    columnName: 'userTypeValueName',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '供暖面积',
    columnName: 'heatingArea',
    columnWidth: '120',
    columnFixed: false,
    formatter: formatHeatingArea,
  },
  {
    columnLabel: '阀门类型',
    columnName: 'controllerTypeValueName',
    columnWidth: '120',
    columnFixed: false,
  },
  {
    columnLabel: '用户地址',
    columnName: 'address',
    columnWidth: '250',
    columnFixed: false,
  },
];

function formatHeatingArea(value) {
  return value ? Number(value).toFixed(2) : '/'
}

// 操作列参数
export const columnOpParams = {
  columnLabel: '操作',
  columnWidth: '220',
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
  valveSerialNo: '',
  username: '',
  phone: '',
  familyNum: '',
  userTypeId: '',
  controllerTypeId: '',
  pageSize: 10,
  pageNo: 1
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
