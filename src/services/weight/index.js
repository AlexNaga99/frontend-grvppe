import { request } from '../http';

const weight_service = {
  convert_weight: (body) => {
    return request.post('/weight/', body);
  },
}

export {
    weight_service
}