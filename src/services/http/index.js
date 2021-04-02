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