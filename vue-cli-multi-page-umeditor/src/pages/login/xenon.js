import Vue from 'vue'
import xenon from './menu.vue'
import xenonnvg from './nvg.vue'
// import tabledata from './table.vue'
import $ from 'jquery'
import axios from 'axios'
import apis from 'js/apiHost'
// require('../center/scss/collect.scss')
Vue.prototype.$ajax = axios;
console.log(apis);

var table = new Vue({
    el: '#login',
    data () {
        return {
          logindata: {},
          errormessage: ''
        }
      },
      methods: {
        userlogin: function () {
          console.log(this.logindata);
          // window.location.href = 'xenon.html';
          var _this = this;
          var params = apis.apiPrams("userlogin");
          params.uname = _this.logindata.username;
          params.password = _this.logindata.passwd;
          apis.apiPost('userlogin',function(res){
            if (res.data.code !== 0) {
              _this.errormessage = res.data.message;
            } else {
                _this.errormessage = '';
                console.log(res.data.resultData.session);
                // setcookie("JSESSIONID", res.data.resultData.session,  new Date().getTime()+3600, '/','localhost:8080');
                apis.setcookie(res.data.resultData.session, 'localhost:8080', '/')
                window.location.href = 'xenon.html';
            }
          })
          // return ;
          //
          // Vue.$ajax.post(apis.apiHost('userlogin'), {
          //   uname: _this.logindata.username,
          //   password: _this.logindata.passwd
          // })
          // .then(function (res) {
          //   if (res.data.code !== 0) {
          //     _this.errormessage = res.data.message;
          //   } else {
          //       _this.errormessage = '';
          //       console.log(res.data.resultData.session);
          //       // setcookie("JSESSIONID", res.data.resultData.session,  new Date().getTime()+3600, '/','localhost:8080');
          //       apis.setcookie(res.data.resultData.session, 'localhost:8080', '/')
          //       window.location.href = 'xenon.html';
          //   }
          //   console.log(res);
          // })
          // .catch(function (err) {
          //   console.log(err);
          // });
        }
      },
      mounted: function () {
         this.$nextTick(function () {
            setTimeout(function () { $('.fade-in-effect').addClass('in'); }, 1);
         })
      }
  })
