// config
const defaultDatas = {
  columns: [],
  rows: []
}

const testDatas = {
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
  rows: [
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
};



export default {
  defaultDatas,
  testDatas
};
