// config


const defaultViews = [
  'table',
];

const defaultOptions = {};

const defaultFetchs = {
  method: 'get',
  url: 'datas.json',
  params: {
    query: '',
  },
  headers: { 
    'content-type': 'application/x-www-form-urlencoded',
    'env': 'test'
  },
  paths: {
    dataPath: 'list',
    pagePath: 'page',
    totalPath: 'total',
    countPath: 'count',
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
  name: {title: 'Name', data: 'name', sortable: true}, 
  desc: {title: 'Desc', data: 'desc', sortable: true}, 
  status: {title: 'Status', data: 'status', sortable: true}, 
  ctime: {title: 'Ctime', data: 'ctime', format: 'formatDate|YYYY-MM-DD HH:mm:ss'}, 
  utime: {title: 'Utime', data: 'utime', format: 'formatDate|YYYY-MM-DD HH:mm:ss'},
};
const defaultFilters = {
  id: {
    label: 'Id',
    name: 'id',
    fetchs: {
      method: 'get',
      url: 'datas.json',
      params: {
        query: '',
      },
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'env': 'test'
      },
      paths: {
        data: 'list',
        query: 'query',
        label: 'id',
        title: 'id',
        desc: ['name'],
        id: 'id'
      },
    },
    datas: []
  },
  name: {
    label: 'Name',
    name: 'name',
    fetchs: {
      method: 'get',
      url: 'datas.json',
      params: {
        query: '',
      },
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'env': 'test'
      },
      paths: {
        data: 'list',
        query: 'query',
        label: 'name',
        title: 'name',
        desc: ['desc'],
        id: 'id'
      },
    },
    datas: [],
    fa: '',
  },
  status: {
    label: 'Status',
    name: 'status',
    items: ['noactive', 'active'],
    fa: '',
  },
  startDate: {
    label: 'Start Date',
    name: 'startDate',
    datetime: {
      type: 'date'
    },
    fa: '',
  },
  endDate: {
    label: 'End Date',
    name: 'endDate',
    datetime: {
      type: 'date'
    },
    fa: '',
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
