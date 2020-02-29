// config


const defaultViews = [
  'table',
];

const defaultOptions = {};

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
const defaultColumns = {
  id: {title: 'Id', data: 'id', sortable: true}, 
  ctime: {title: 'Ctime', data: 'ctime', format: 'formatDate|YYYY-MM-DD HH:mm:ss'}, 
  utime: {title: 'Utime', data: 'utime', format: 'formatDate|YYYY-MM-DD HH:mm:ss'},
};
const defaultFilters = {
  filter1: {
    label: 'lable1',
    name: 'filter1',
    items: ['aaaaa', 'bbbbb']
  },
  filter2: {
    label: 'lable2',
    name: 'filter2',
    items: ['aaaaa', 'bbbbb']
  },
  filter3: {
    label: 'lable3',
    name: 'filter3',
    fetchs: {
      method: 'post',
      url: '/data/search/m1/v1/search/common',
      params: {
        tableName: 'u_user',
        query: '',
      },
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'env': 'test'
      },
      paths: {
        query: 'query',
        data: 'payload.content',
        label: 'username',
        title: 'user_num',
        desc: ['username'],
        icon: 'head',
        id: 'id'
      },
    },
    datas: []
  },
  filter4: {
    label: 'lable4',
    name: 'filter4',
    datetime: {
      type: 'date'
    }
  },
};

const defaultDatas = null;

export default {
  views: defaultViews,
  options: defaultOptions,
  fetchs: defaultFetchs,
  columns: defaultColumns,
  filters: defaultFilters,
  datas: defaultDatas,
};
