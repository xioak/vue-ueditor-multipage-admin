<template>
  	<div class="sidebar-menu toggle-others fixed">
    <div class="sidebar-menu-inner">
      <header class="logo-env">
        <!-- logo -->
        <div class="logo">
          <a href="dashboard-1.html" class="logo-expanded">
           <img src="/static/xenon/images/logo@2x.png" width="80" alt="" />
          </a>
          <a href="dashboard-1.html" class="logo-collapsed">
            <img src="/static/xenon/images/logo-collapsed@2x.png" width="40" alt="" />
          </a>
        </div>
        <!-- This will toggle the mobile menu and will be visible only on mobile devices -->
        <div class="mobile-menu-toggle visible-xs">
          <a href="#" data-toggle="user-info-menu">
            <i class="fa-bell-o"></i>
            <span class="badge badge-success">7</span>
          </a>
          <a href="#" data-toggle="mobile-menu">
            <i class="fa-bars"></i>
          </a>
        </div>

        <!-- This will open the popup with user profile settings, you can use for any purpose, just be creative -->
        <div class="settings-icon" style="display:none">
          <a href="#" data-toggle="settings-pane" data-animate="true">
            <i class="linecons-cog"></i>
          </a>
        </div>
      </header>
      <ul id="main-menu" class="main-menu">
        <!-- add class "multiple-expanded" to allow multiple submenus to open -->
        <!-- class "auto-inherit-active-class" will automatically add "active" class for parent elements who are marked already with class "active" -->
        <li v-for="(item,index) in menus" :class="{expanded : menuIndex==index}">
          <a href="dashboard-1.html">
            <i :class="item.icon"></i>
            <span class="title">{{item.title}}</span>
          </a>
          <ul v-if="menuIndex==index" style="display:block">
            <li v-for=" sub in item.next">
              <a :href="sub.url">
                <span class="title">{{sub.title}}</span>
              </a>
            </li>
          </ul>
          <ul v-else>
            <li v-for=" sub in item.next">
              <a :href="sub.url">
                <span class="title">{{sub.title}}</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
// import { Vue, $, Common } from 'js/base'
import Vue from 'vue'
// import {mapGetters} from 'vuex'
export default {
    props: ['menuIndex'],
    data () {
        return {
          menus: [
                    {
                      title: '项目介绍',
                      open: false,
                      icon: 'linecons-cloud',
                      next: [
                              {
                                title: '项目背景',
                                url: 'address.html'
                              },
                              {
                                title: '项目预算',
                                url: 'address.html'
                              }
                            ]
                    },
                    {
                      title: '新闻管理',
                      open: false,
                      icon: 'linecons-desktop',
                      next: [
                              {
                                title: '添加新闻',
                                url: 'xenon.html'
                              },
                              {
                                title: '预览新闻',
                                url: 'xenon.html'
                              }
                            ]
                    },
                    {
                      title: '公司简介',
                      open: false,
                      icon: 'linecons-globe',
                      next: [
                              {
                                title: '团队介绍',
                                url: 'team.html'
                              },
                              {
                                title: '公司介绍',
                                url: 'company.html'
                              }
                            ]
                    },
                    {
                      title: '联系方式',
                      open: false,
                      icon: 'linecons-star',
                      next: [
                              {
                                title: '留言管理',
                                url: 'xenon.html'
                              },
                              {
                                title: '联系方式管理',
                                url: 'xenon.html'
                              }
                            ]
                    }

                  ]
                }
              }
}
</script>
