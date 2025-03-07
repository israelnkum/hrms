import _ from 'lodash';
import axios from 'axios';

// Axios Configuration
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withXSRFToken = true;

window._ = _;
window.axios = axios;
