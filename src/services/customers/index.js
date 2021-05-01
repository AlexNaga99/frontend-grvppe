import { request } from '../http';

const customer_service = {
  getCustomerById: (id) => {
    return request.get('/customer/'+ id);
  },
  getCustomers: () => {
    return request.get('/customer');
  },
  insertCustomer: (body) => {
    return request.post('/customer', body);
  },
  deleteCustomer: (id) => {
    return request.delete('/customer/'+ id);
  },
  updateCustomer: (id, body) => {
    return request.patch('/customer/'+ id, body);
  },
}

export {
  customer_service
}