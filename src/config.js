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
    'content-type': 'application/x-www-form-urlencoded'
  },
  path: 'data.payload.content',
};
const defaultColumns = ["id", "title", "desc", "ctime", "utime"];
const defaultOptions = {};

const exampleDatas = [
  {
    id: 1,
    user: {
      username: "dprice0",
      firstName: "Daniel",
      lastName: "Price",
      email: "dprice0@blogs.com"
    },
    address: "3 Toban Park",
    city: "Pocatello",
    state: "Idaho"
  },
  {
    id: 2,
    user: {
      username: "dprice0",
      firstName: "Daniel",
      lastName: "Price",
      email: "dprice0@blogs.com"
    },
    address: "3 Toban Park",
    city: "Pocatello",
    state: "Idaho"
  },
  {
    id: 3,
    user: {
      username: "dprice0",
      firstName: "Daniel",
      lastName: "Price",
      email: "dprice0@blogs.com"
    },
    address: "3 Toban Park",
    city: "Pocatello",
    state: "Idaho"
  },
  {
    id: 4,
    user: {
      username: "dprice0",
      firstName: "Daniel",
      lastName: "Price",
      email: "dprice0@blogs.com"
    },
    address: "3 Toban Park",
    city: "Pocatello",
    state: "Idaho"
  },
  {
    id: 5,
    user: {
      username: "dprice0",
      firstName: "Daniel",
      lastName: "Price",
      email: "dprice0@blogs.com"
    },
    address: "3 Toban Park",
    city: "Pocatello",
    state: "Idaho"
  },
];

const test1Datas = {
  fetchs: defaultFetchs,
  columns: defaultColumns,
  options: defaultOptions,
  datas: exampleDatas
};

export default {
  defaultViews,
  defaultFetchs,
  defaultColumns,
  defaultOptions,
  defaultDatas,
  test1Datas,
};
