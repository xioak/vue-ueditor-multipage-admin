import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import apiHost from 'js/apiHost'
import modleAlert from 'js/alert'
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
            this.$ajax.post(apiHost.getURL('newsUpdate'), data)
            .then(function (res) {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
          },
          getList: function () {
            this.$ajax.get(apiHost.getURL('newsList'))
            .then(response => {
                this.datas = response.data.resultData.newsList
                console.log(response);
            })
          },
          postData: function (text, title) {
            console.log(1212121233);
            if (text === '') {
              modleAlert.open('alert',{btn: '确定', message: '内容不能为空'});
              return;
            }
            if (title === '') {
              modleAlert.open('alert',{btn: '确定', message: '标题不能为空'});
              return;
            }
            var _this = this;
            this.$ajax.post(apiHost.getURL('newsAdd'), {
              content: text,
              title: title,
              type: '2'
            })
            .then(function (res) {
              console.log(res);
              _this.getList();
              $('#data-tab').find('a').eq(0).tab('show');
            })
            .catch(function (err) {
              console.log(err);
            });
          },
          addopen: function () {
            window.um.add.setContent('');
            $('#field-2').val('');
          },
          // add: function (text, title) {
          //   if (text === '') {
          //     this.tips('内容不能为空');
          //     return;
          //   }
          //   if (text === '') {
          //     this.errotip = '标题不能为空';
          //     this.tips('标题不能为空');
          //     return;
          //   }
          //   this.postData(text, title);
          // },
          deleteConfirm: function (item, index) {
              modleAlert.open('','',[item,index])
              modleAlert.operat = function () {
                table.deleteItem(modleAlert.fnparams[0], modleAlert.fnparams[1]);
              };
          },
          deleteItem: function (item, index) {
            // newDelete
            this.datas.splice(index, 1);
            this.$ajax.get(apiHost.getURL('newDelete') + item.id).then(
              response => {
                  // this.datas.splice(index, 1);
                  this.getList();
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
              $('#page-title').show();
              $('#data-row').show();
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
