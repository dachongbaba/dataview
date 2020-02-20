// config
const defaultDatas = {
  columns: [],
  rows: []
}

const data = [
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
]

const test1Datas = {
  columns: [
    { label: "id", field: "id" },
    {
      label: "Username",
      field: "user.username",
      headerClass: "class-in-header second-class"
    },
    { label: "First Name", field: "user.firstName" },
    { label: "Last Name", field: "user.lastName" },
    { label: "Email", field: "user.email" },
    {
      label: "Address",
      representedAs: ({ address, city, state }) => `${address}<br />${city}, ${state}`,
      interpolate: true
    }
  ],
  rows: data
};


export default {
  defaultDatas,
  test1Datas,
};
