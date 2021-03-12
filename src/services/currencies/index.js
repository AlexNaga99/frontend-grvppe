import { request } from '../http';

const currency_service = {
  convert: (body) => {
    return request.post('/currency/', body);
  },
}

export {
    currency_service
}