import { Platform } from 'react-native';

// let baseURL = 'https://easy-shop-backend1.herokuapp.com/api/v1/';

let baseURL = '';

{
  Platform.OS == 'android'
  ? baseURL = 'http://10.0.2.2:3000/api/v1/'
  : baseURL = 'http://localhost:3000/api/v1/'
}

export default baseURL;