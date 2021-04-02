import { request } from '../http';

const minify_service = {
  minify_css: (body) => {
    return request.post('/minify/css', body);
  },
  minify_js: (body) => {
    return request.post('/minify/js', body);
  },
}

export {
    minify_service
}