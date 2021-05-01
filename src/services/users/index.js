import { request } from '../http';

const user_service = {
  login: (body) => {
    return request.post('users/login/', body);
  },
}

export {
  user_service
}