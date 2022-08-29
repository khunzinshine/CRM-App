export const ApiEndPoints = {
  login: process.env.REACT_APP_API_SERVER + "/auth/login",
  customerList: process.env.REACT_APP_API_SERVER + "/users",
  updateCustomer: process.env.REACT_APP_API_SERVER + "/users",
  deleteCustomer: process.env.REACT_APP_API_SERVER + "/users",
  getDetailCustomer: process.env.REACT_APP_API_SERVER + "/users",
};
