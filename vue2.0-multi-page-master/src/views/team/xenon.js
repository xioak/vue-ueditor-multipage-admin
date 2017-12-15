import Vue from 'vue'
import xenon from './menu.vue'
import xenonnvg from './nvg.vue'
// import tabledata from './table.vue'
import $ from 'jquery'
import axios from 'axios'
import apiHost from 'js/apiHost'
// import axiosApi from 'js/axiosApi'
var xeono = new Vue({
    el: '#xenon',
    template: '<xenon/>',
    components: {
        'xenon': xenon
    },
    mounted: function () {
        this.$nextTick(function () {
           console.log('xenon');
        })
   }
})
// function xenn () {
var xeononvg = new Vue({
    el: '#xenon-nvg',
    template: '<xenonnvg/>',
    components: {
        'xenonnvg': xenonnvg
    },
    mounted: function () {
        this.$nextTick(function () {
           // this.getList();
           // tabf();
        })
   }
})
// }
// function tabf () {
  var table = new Vue({
      el: '#tabdata',
      data () {
          return {
            datas: [ ],
            curindex: 0,
            updateId: 0,
            tabindex: 1,
            teaminfo: ''
          }
        },
        methods: {
          teaminfoGet: function () {
            this.$ajax.get(apiHost.getURL('teaminfo'))
            .then(response => {
                this.teaminfo = response.data.resultData
                console.log(response);
            })
          },
          update: function () {
               var text = window.um.update.getContent();
               var _this = this;
               this.$ajax.post(apiHost.getURL('teaminfoAdd'), {
                 content: text,
                 title: '团队介绍',
                 type: '1',
                 id: _this.teaminfo.id
               })
               .then(function (res) {
                 console.log(res);
                 _this.teaminfoGet();
                 $('#data-tab').find('a').eq(0).tab('show');
               })
               .catch(function (err) {
                 console.log(err);
               });
          }
          // editnews: function (item, index) {
          //   console.log(item.title);
          //   this.curindex = index;
          //   // this.updateId = item.id;
          //   $('#field-2').val(item.title);
          //   window.um.update.setContent(item.content);
          //   // $('#data-tab a[href="#v-update"]')
          //   $('#data-tab').find('a').eq(2)
          //   .attr('href', '#v-update').attr('data-toggle', 'tab')
          //   .tab('show').removeAttr('href').removeAttr('data-toggle');
          // },
          // update: function (text, title) {
          //   // this.datas[this.curindex].title = text;
          //   var curitem = this.datas[this.curindex];
          //   curitem.title = title;
          //   curitem.content = text;
          //   var data = {
          //     title: title,
          //     content: text,
          //     id: curitem.id
          //   };
          //   var _this = this;
          //   this.$ajax.post(apiHost.getURL('newsUpdate'), data)
          //   .then(function (res) {
          //     console.log(res);
          //   })
          //   .catch(function (err) {
          //     console.log(err);
          //   });
          // },
          // getList: function () {
          //   this.$ajax.get(apiHost.getURL('newsList'))
          //   .then(response => {
          //       this.datas = response.data.resultData.newsList
          //       console.log(response);
          //   })
          // },
          // postData: function (text, title) {
          //   var _this = this;
          //   this.$ajax.post(apiHost.getURL('newsAdd'), {
          //     content: text,
          //     title: title,
          //     type: '2'
          //   })
          //   .then(function (res) {
          //     console.log(res);
          //     _this.getList();
          //     $('#data-tab').find('a').eq(0).tab('show');
          //   })
          //   .catch(function (err) {
          //     console.log(err);
          //   });
          // },
          // addopen: function () {
          //   window.um.add.setContent('');
          //   $('#field-2').val('');
          // },
          // add: function (text, title) {
          //   this.postData(text, title);
          // },
          //
          // deleteConfirm: function (item, index) {
          //   $('#modal-confirm').modal('show', {backdrop: 'fade'});
          // },
          // deleteItem: function (item, index) {
          //   // newDelete
          //   this.datas.splice(index, 1);
          //   this.$ajax.get(apiHost.getURL('newDelete') + item.id).then(
          //     response => {
          //         // this.datas.splice(index, 1);
          //         this.getList();
          //   })
          // },
          // switchtab: function (index) {
          //   this.tabindex = index;
          // },
          // preview: function (item, index) {
          //     window.um.add.setContent(item.content);
          //     window.um.add.execCommand('preview');
          // }

        },
        beforeCreate: function () {
           // this.getList();
        },
        mounted: function () {
            this.$nextTick(function () {
              $('#page-title').show();
              $('#data-row').show();
            })
       },
       created: function () {
           // this.getList();
           this.teaminfoGet();
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
