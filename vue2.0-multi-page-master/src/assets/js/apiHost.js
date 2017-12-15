import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
    // Do something with response data
    console.log(response);
    if (!response.data.message) {
      window.location.href = 'loginxenon.html';
    }
    return response;
  },
  function (error) {
    console.log('axios.interceptors.response erro: ' + error);
  });
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
Vue.prototype.$ajax = axios;
const apiHost = {
  URLS: {
    host: 'http://localhost:8080',
    newsList: '/content/list?page=1&type=2&pageSize=500',
    newDelete: '/content/delete?id=',
    newsAdd: '/content/add',
    newsUpdate: '/content/update',
    teaminfo: '/cpbase/base/team/get?type=1',
    teaminfoAdd: '/cpbase/base/team',
    userlogin: '/login/index'

  },
  getURL: function (type) {
      return this.URLS.host + this.URLS[type];
  },
  setcookie: function (sessionId, domain, path) {
    var expr = new Date().getTime() + 3600;
    document.cookie = 'JSESSIONID=' + sessionId + '; expires=' + expr + '; domain=' + domain + ';path=' + path;
  }

}
module.exports = apiHost
