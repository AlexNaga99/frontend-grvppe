import { request } from '../http';

const json_formatter_service = {
  json_formatter: (body) => {
    return request.post('/json_formatter', body);
  }
}

export {
    json_formatter_service
}