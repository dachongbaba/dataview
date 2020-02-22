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
  querys: {sort: 'sort', page: 'page', perPage: 'size'}
};
const defaultColumns = [
  {title: 'id', field: 'id'}, 
  {title: 'title', field: 'title'}, 
  {title: 'desc', field: 'desc'}, 
  {title: 'ctime', field: 'ctime', callback: 'formatDate|YYYY-MM-DD HH:mm:ss'}, 
  {title: 'utime', field: 'utime', callback: 'formatDate|YYYY-MM-DD HH:mm:ss'},
];
const defaultOptions = {};

export default {
  defaultViews,
  defaultFetchs,
  defaultColumns,
  defaultOptions,
  defaultDatas,
};
