// config
const defaultDatas = {
  fetch: {},
  columns: [],
  options: {},
  datas: []
}

const defaultViews = [
  'tables',
  'tables1',
  'tables2',
];

const defaultFetchs = {
  method: 'post',
  url: '/data/search/m2/v1/aggregation/common',
  params: {
    tableName: 'o_express',
    query: '{"bool":{"must":[]}}',
  },
  headers: { 
    'content-type': 'application/x-www-form-urlencoded',
    'env': 'test'
  },
  paths: {
    dataPath: 'payload.content',
    pagePath: 'payload.number',
    totalPath: 'payload.totalPages',
    countPath: 'payload.totalElements',
    endPath: 'payload.totalElements',
    errorPath: '',
  },
  pages: {
    index: 1,
    page: 0,
    size: 20
  }
};
const defaultColumns = [
  {title: 'Id', data: 'id', sortable: true}, 
  {title: 'Ctime', data: 'ctime', render: 'formatDate|YYYY-MM-DD HH:mm:ss'}, 
  {title: 'Utime', data: 'utime', render: 'formatDate|YYYY-MM-DD HH:mm:ss'},
];
const defaultOptions = [
  {
    label: 'lable1',
    name: 'filter1',
    items: ['aaaaa', 'bbbbb']
  },
  {
    label: 'lable2',
    name: 'filter2',
    items: ['aaaaa', 'bbbbb']
  },
  {
    label: 'lable3',
    name: 'filter3',
    fetchs: {
      method: 'post',
      url: '/data/search/m2/v1/aggregation/common',
      params: {
        tableName: 'o_express',
        query: '{"bool":{"must":[]}}',
      },
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'env': 'test'
      },
      paths: {
        data: 'payload.content',
        title: 'receipt_name',
        desc: 'city',
        id: 'id'
      },
    },
    datas: [],
    q: '',
  },
  {
    label: 'lable4',
    name: 'filter4',
    datetime: {
      type: 'date'
    }
  },
];

export default {
  defaultViews,
  defaultFetchs,
  defaultColumns,
  defaultOptions,
  defaultDatas,
};
