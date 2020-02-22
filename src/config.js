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
};
const defaultColumns = [
  {title: 'id', field: 'id', label: 'id lable', sortable: true, visible: 'true'}, 
  {title: 'title', field: 'title', label: 'title lable', sortable: true, visible: 'true'}, 
  {title: 'desc', field: 'desc', label: 'desc lable', sortable: true, visible: 'true'}, 
  {title: 'ctime', field: 'ctime', callback: 'formatDate|YYYY-MM-DD HH:mm:ss', sort: true}, 
  {title: 'utime', field: 'utime', callback: 'formatDate|YYYY-MM-DD HH:mm:ss', sort: true},
];
const defaultOptions = {};

export default {
  defaultViews,
  defaultFetchs,
  defaultColumns,
  defaultOptions,
  defaultDatas,
};
