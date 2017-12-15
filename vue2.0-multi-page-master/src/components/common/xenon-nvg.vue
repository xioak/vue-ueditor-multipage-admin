<template>
  <div class="">


  <nav class="navbar user-info-navbar" role="navigation">
				<!-- Left links for user info navbar -->
				<ul class="user-info-menu left-links list-inline list-unstyled">

					<li class="hidden-sm hidden-xs" style="min-height: 76px;">
						<a href="#" data-toggle="sidebar">
							<i class="fa-bars"></i>
						</a>
					</li>

          <li class="app-title"><a href="xenon.html">后台管理系统</a></li>
				</ul>
				<!-- Right links for user info navbar -->
				<ul class="user-info-menu right-links list-inline list-unstyled">

					<li class="search-form" style="min-height: 76px;"><!-- You can add "always-visible" to show make the search input visible -->
						<form method="get" action="extra-search.html">
							<input type="text" name="s" class="form-control search-field" placeholder="Type to search...">

							<button type="submit" class="btn btn-link">
								<i class="linecons-search"></i>
							</button>
						</form>

					</li>
				</ul>

			</nav>
      <div class="page-title">
				<div class="title-env">
					<ol class="breadcrumb bc-1">
						<li>
						<a href="dashboard-1.html"><i class="fa-home"></i>{{items[0]}}</a>
					</li>
					<li>
							<a href="tables-basic.html">{{items[1]}}</a>
					</li>
					<li class="active">
							<strong>{{items[2]}}</strong>
					</li>
					</ol>
				</div>
				<div class="breadcrumb-env">
				</div>
			</div>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: ['items'],
  data () {
      return {}
    }

}

</script>

<style>

.user-info-navbar .user-info-menu li.app-title{
  font-size: 23px;
    line-height: 76px;
    padding-left: 30px;
    font-weight: bold;
    color: #6f6c6c;
}




</style>
