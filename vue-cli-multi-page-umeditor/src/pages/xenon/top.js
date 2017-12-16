import Vue from 'vue'
import xenon from './menu.vue'
import xenonnvg from './nvg.vue'
import $ from 'jquery'
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
var xeononvg = new Vue({
    el: '#xenon-nvg',
    template: '<xenonnvg/>',
    components: {
        'xenonnvg': xenonnvg
    },
    mounted: function () {
        this.$nextTick(function () {
        })
   }
})
$('body').removeAttr('style');
