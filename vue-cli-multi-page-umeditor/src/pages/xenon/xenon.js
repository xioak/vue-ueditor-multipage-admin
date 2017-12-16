import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import apis from 'js/apiHost'
import alert from 'js/alert'
// import top from 'top.js'
require('./top.js')
  var table = new Vue({
      el: '#tabdata',
      data () {
          return {
            datas: [ ],
            curindex: 0,
            updateId: 0,
            tabindex: 1,
            errotip: ''
          }
        },
        methods: {
          editnews: function (item, index) {
            console.log(item.title);
            this.curindex = index;
            // this.updateId = item.id;
            $('#field-2').val(item.title);
            window.um.update.setContent(item.content);
            // $('#data-tab a[href="#v-update"]')
            $('#data-tab').find('a').eq(2)
            .attr('href', '#v-update').attr('data-toggle', 'tab')
            .tab('show').removeAttr('href').removeAttr('data-toggle');
          },
          update: function (text, title) {
            // this.datas[this.curindex].title = text;
            var curitem = this.datas[this.curindex];
            curitem.title = title;
            curitem.content = text;
            var data = {
              title: title,
              content: text,
              id: curitem.id
            };
            var _this = this;
            var params = apis.apiPrams("newsUpdate");
            params.title = title;
            params.content = text;
            params.id = curitem.id;
            apis.apiPost('newsUpdate',function(res){
            })
          },
          getList: function () {
            var _this = this ;
            apis.apiGet('newsList',function(res){
              console.log(res);
                _this.datas = res.data.resultData.newsList
            })
          },
          postData: function (text, title) {
            if (text === '') {
              alert.alert.open('alert',{btn: '确定', message: '内容不能为空'});
              return;
            }
            if (title === '') {
                alert.alert.open('alert',{btn: '确定', message: '标题不能为空'});
              return;
            }
            var _this = this;
            var params = apis.apiPrams("newsAdd");
            params.content = text;
            params.title = title;
            params.type = 2;
            apis.apiPost('newsAdd',function(res){
              _this.getList();
              $('#data-tab').find('a').eq(0).tab('show');
            })
          },
          addopen: function () {
            window.um.add.setContent('');
            $('#field-2').val('');
          },

          deleteConfirm: function (item, index) {
                alert.alert.open('','',[item,index])
                alert.alert.operat = function () {
                table.deleteItem(  alert.alert.fnparams[0],   alert.alert.fnparams[1]);
              };
          },
          deleteItem: function (item, index) {
            // newDelete
            this.datas.splice(index, 1);
            apis.apiPrams("newDelete").uparam = '?id='+ item.id ;
            var  _this = this;
            apis.apiGet('newDelete',function(res){
              _this.getList();
            })
          },
          switchtab: function (index) {
            this.tabindex = index;
          },
          preview: function (item, index) {
              window.um.add.setContent(item.content);
              window.um.add.execCommand('preview');
          }
        } ,
        beforeCreate: function () {
           // this.getList();
        } ,
        mounted: function () {
            this.$nextTick(function () {
              // $('#page-title').show();
              // $('#data-row').show();
            })
       },
       created: function () {
           console.log('create');
           this.getList();
       }
  })
  $('#v-update').find('.btn-info').click(function () {
      table.update(window.um.update.getContent(), $('#field-2').val());
      $('#data-tab').find('a').eq(0).tab('show');
  });
  $('#v-add').find('.btn-info').click(function () {
      table.postData(window.um.add.getContent(), $('#field-1').val());
        // $('#data-tab').find('a').eq(0).tab('show');
  });
