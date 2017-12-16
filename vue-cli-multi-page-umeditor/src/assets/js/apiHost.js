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

export default {
  hosts:{
    host: 'http://localhost:8080',
    newsList: {url:'/content/list',params:{uparam:'?page=1&type=2&pageSize=500'}},
    newDelete: {url:'/content/delete', params:{uparam:''}},
    newsAdd: {url:'/content/add', params:{}},
    newsUpdate: {url:'/content/update', params:{}},
    teaminfo: {url:'/cpbase/base/team/get', params:{uparam:''}},
    teaminfoAdd: {url:'/cpbase/base/team', params:{uparam:''}},
    userlogin: {url:'/login/index',params:{}}
  },
  params:[],
  apiUrl:function (type) {
    return this.hosts.host + this.hosts[type].url;
  },
  apiPrams:function(type){
    return this.hosts[type].params;
  },
  callback:function(res){
  },
  apiPost:function(type,fn){
    var _this = this;
    console.log(this.apiUrl(type), this.apiPrams(type));
    axios.post(this.apiUrl(type), this.apiPrams(type))
    .then(function (res) {
      console.log(res);
      fn(res);
      // _this.callback(res);
    }).catch(function (err) {
      console.log(err);
    });
  },
  apiGet:function(type,fn){
    axios.get(this.apiUrl(type)+ this.apiPrams(type).uparam).then(function (res) {
      console.log(res);
      fn(res);
    }).catch(function (err) {
      console.log(err);
    });
  },

  setcookie:function (sessionId, domain, path) {
    var expr = new Date().getTime() + 3600;
    document.cookie = 'JSESSIONID=' + sessionId + '; expires=' + expr + '; domain=' + domain + ';path=' + path;
  }
}




// var hosts = {
//     host: 'http://localhost:8080',
//     newsList: '/content/list?page=1&type=2&pageSize=500',
//     newDelete: '/content/delete?id=',
//     newsAdd: '/content/add',
//     newsUpdate: '/content/update',
//     teaminfo: '/cpbase/base/team/get?type=1',
//     teaminfoAdd: '/cpbase/base/team',
//     userlogin: '/login/index'
// }
//
// exports apiHost = function (type) {
//     return hosts.host + hosts[type];
// }
//
// exports setcookie = function (sessionId, domain, path) {
//   var expr = new Date().getTime() + 3600;
//   document.cookie = 'JSESSIONID=' + sessionId + '; expires=' + expr + '; domain=' + domain + ';path=' + path;
// }
// // export default apiHost;
// // export default{
// //     apiHost
// // }
// export default{apiHost ,setcookie}





//     apiHost, setcookie
// }
