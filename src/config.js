// config
const defaultDatas = {
  fetch: {},
  columns: [],
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
  dataPath: 'payload.content',
  pagePath: 'payload.totalElements',
  errorPath: '',
};
const defaultColumns = [
  {title: 'Id', data: 'id', sortable: true}, 
  {title: 'Ctime', data: 'ctime', render: 'formatDate|YYYY-MM-DD HH:mm:ss'}, 
  {title: 'Utime', data: 'utime', render: 'formatDate|YYYY-MM-DD HH:mm:ss'},
];
const defaultOptions = {};

export default {
  defaultViews,
  defaultFetchs,
  defaultColumns,
  defaultOptions,
  defaultDatas,
};
