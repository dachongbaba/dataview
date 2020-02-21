// config
const defaultDatas = {
  fetch: {},
  columns: [],
  datas: []
}

const defaultViews = [
  'tables'
];

const defaultFetch = {
  method: 'post',
  url: '/data/search/m2/v1/aggregation/common',
  params: {
    tableName: 'o_express',
    query: '{"bool":{"must":[]}}',
  },
  headers: { 
    'content-type': 'application/x-www-form-urlencoded'
  }
};

const defaultColumns = [
  { label: "id", field: "id" },
  { label: "Title", field: "title"},
  { label: "Description", field: "desc" },
  /*{
    label: "",
    representedAs: ({ address, city, state }) => `${address}<br />${city}, ${state}`,
    interpolate: true
  },*/
  { label: "Created", field: "ctime"},
  { label: "Updated", field: "utime"},
];

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
  fetch: defaultFetch,
  columns: defaultColumns,
  datas: exampleDatas
};

export default {
  defaultViews,
  defaultFetch,
  defaultColumns,
  defaultDatas,
  test1Datas,
};
