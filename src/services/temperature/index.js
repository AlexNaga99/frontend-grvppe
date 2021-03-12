import { request } from '../http';

const temperature_service = {
  convert_temperature: (body) => {
    return request.post('/temperature/', body);
  },
}

export {
    temperature_service
}