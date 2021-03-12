import axios from 'axios';
import config from '../../config.json';

const request = axios.create({
  baseURL: config['API_URL'],   
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',    
	  'Access-Control-Allow-Origin': '*'
  },
});

export { request }
// import axios from 'axios';
// import config from '../../config.json';
// // import { Cookies } from 'react-cookie';

// // const cookies = new Cookies();
// const request = axios.create({
//   baseURL: config['API_URL'],   
//   // crossdomain: true,
//   withCredentials: false,
//   headers: {
//     'Content-Type': 'application/json',    
// 	  'Access-Control-Allow-Origin': '*'
//   },
// //   transformRequest: axios.defaults.transformRequest.concat(
// //     (data, headers) => {
// //       let authenticationCookie = cookies.get('authentication');
// //       if (authenticationCookie) {
// //         headers['session'] = authenticationCookie.session;
// //       }
// //       return data;
// //     }
// //   ),
// //   transformResponse: axios.defaults.transformResponse.concat((data) => {
// //     if (data) {
// //       if (data.error && data.error.code === 401) {
// //         cookies.remove('authentication');
// //         window.location.pathname = "/login";
// //       }
// //     }
// //     return data;
// //   })
// });

// export { request }