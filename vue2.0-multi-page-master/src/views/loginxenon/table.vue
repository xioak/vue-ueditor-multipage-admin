
<template>
       <div class="panel panel-default" id="tabdata" >
               <div class="panel-heading">
                 <h3 class="panel-title">新闻列表</h3>

                 <div class="panel-options">
                   <!--   -->
                   <button class="btn btn-blue" style='margin-right:50px' v-on:click="addopen">新&nbsp;&nbsp;&nbsp;增</button>
                   <a href="javascript:void()" data-toggle="panel">
                     <span class="collapse-icon">–</span>
                     <span class="expand-icon">+</span>
                   </a>
                   <a href="javascript:void()">
                     ×
                   </a>
                 </div>
               </div>
               <div class="panel-body">
                 <div class="dataTables_wrapper form-inline dt-bootstrap no-footer">
                   <table class="table table-bordered table-striped dataTable no-footer" id="example-2" role="grid" aria-describedby="example-2_info">
                   <thead>
                     <tr role="row">
                       <th class="no-sorting sorting_asc" rowspan="1" colspan="1" aria-label="" style="width: 31px;">
                         <div class="cbr-replaced"><div class="cbr-input">
                           <input type="checkbox" class="cbr cbr-done"></div>
                           <div class="cbr-state"><span></span></div></div></th>
                       <th class="sorting" tabindex="0" aria-controls="example-2" rowspan="1" colspan="1" aria-label="Student Name: activate to sort column ascending"
                       style="width: 275px;">标题</th>
                       <th class="sorting" tabindex="0" aria-controls="example-2" rowspan="1" colspan="1" aria-label="Average Grade: activate to sort column ascending"
                       style="width: 159px;">时间</th>
                       <th class="sorting" tabindex="0" aria-controls="example-2" rowspan="1" colspan="1" aria-label="t column ascending"
                       style="width: 330px;">其他</th>
                       <th class="sorting" tabindex="0" aria-controls="example-2" rowspan="1" colspan="1" aria-label="Actions: activate "
                       style="width: 215px;">操作</th></tr>
                   </thead>

                   <tbody class="middle-align">

                   <tr v-for="(item,index) in datas" role="row" class="odd" :class="{even:index%2==0}">
                     <!-- :class="{even:index%2==0}" -->
                       <td class="sorting_1">
                         <div class="cbr-replaced"><div class="cbr-input"><input type="checkbox" class="cbr cbr-done"></div><div class="cbr-state"><span></span></div></div>
                       </td>
                       <td>{{item.title}}</td>
                       <td>{{item.creatTime}}</td>
                       <td>{{item.date}}</td>
                       <td>
                         <!-- v-on:click="editnews(item,index)" -->
                         <a href="#" class="btn btn-secondary btn-sm btn-icon icon-left" >
                           编辑
                         </a>

                         <a href="#" class="btn btn-danger btn-sm btn-icon icon-left">
                           删除
                         </a>

                         <a href="#" class="btn btn-info btn-sm btn-icon icon-left">
                           预览
                         </a>
                       </td>
                     </tr>
                   </tbody>
                 </table><div class="row"><div class="col-xs-6">
                   <div class="dataTables_info" id="example-2_info" role="status" aria-live="polite">共20条</div></div>
                   <div class="col-xs-6"><div class="dataTables_paginate paging_simple_numbers" id="example-2_paginate">
                     <ul class="pagination"><li class="paginate_button previous disabled" aria-controls="example-2" tabindex="0" id="example-2_previous">
                       <a href="#">上一页</a></li><li class="paginate_button active" aria-controls="example-2" tabindex="0">
                       <a href="#">1</a></li><li class="paginate_button " aria-controls="example-2" tabindex="0">
                       <a href="#">2</a></li><li class="paginate_button " aria-controls="example-2" tabindex="0">
                       <a href="#">3</a></li><li class="paginate_button " aria-controls="example-2" tabindex="0">
                       <a href="#">4</a></li><li class="paginate_button " aria-controls="example-2" tabindex="0">
                       <a href="#">5</a></li><li class="paginate_button " aria-controls="example-2" tabindex="0">
                       <a href="#">6</a></li><li class="paginate_button next" aria-controls="example-2" tabindex="0" id="example-2_next">
                       <a href="#">下一页</a></li></ul>
                   </div></div></div></div>

               </div>
             </div>
</template>
<script>
import Vue from 'vue'
import $ from 'jquery'
import axios from 'axios'
import apiHost from 'js/apiHost'
Vue.prototype.$ajax = axios;
var table = new Vue({
    data () {
        return {
          datas: [ ],
          curindex: 0
        }
      },
      methods: {
        editnews: function (item, index) {
          console.log(item.title);
          this.curindex = index;
          // window.um.setContent(item.title);
          window.um.setContent(item.content);
          $('#modal-2').modal({backdrop: 'static'}, 'show');
        },
        update: function (text, index) {
          this.datas[this.curindex].title = text;
          this.$ajax({
          });
        },
        getList: function () {
          console.log('aaaaaaaaaaaaa');
          this.$ajax.get(apiHost.host + apiHost.newsList)
          .then(response => {
              this.datas = response.data.resultData.newsList
              console.log(response);
          })
        },
        addopen: function () {
          window.um.setContent('');
          $('#modal-2').modal({backdrop: 'static'}, 'show');
        }

      },
      beforeCreate: function () {
         // this.getList();
      },
      mounted: function () {
        console.log('bbbbbbbbbb');
          this.$nextTick(function () {
              console.log('cccccccc');
             this.getList();
          })
     },
     created: function () {
         console.log('ccccvvvvvvvv');
         this.getList();
     }
})
</script>
