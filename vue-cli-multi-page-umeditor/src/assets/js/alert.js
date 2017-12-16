
import Vue from 'vue'
const modleAlert = new Vue({
    el: '#modle_alert',
    data () {
        return {
          datas: {
            show: 'none'
          },
          fnparams: []
        }
      },
    methods: {
      callback: function (p,fn) {
        this.close();
        if (this.datas.type === 0) {
            this.operat();
        }
      },
      close: function () {
        this.datas.show = 'none';
      },
      operat: function (fn) {
        fn();
      },
      open: function (alert,data,param,fn) {
        if (alert === 'alert') {
          this.datas = {
            title: '提示',
            message: '请确认',
            show: 'none',
            type: 1,
            btny: '是',
            btnn: '否'
          };
          this.datas.message = data.message;
          this.datas.btny = data.btn;
          this.datas.show = 'block';
        } else {
            this.datas = {
              title: '提示',
              message: '请确认',
              show: 'none',
              type: 0,
              btny: '是',
              btnn: '否'
            };
            this.datas.show = 'block';
            this.fnparams = param;
        }
      }
    }
})

export default {
  alert: modleAlert
}
