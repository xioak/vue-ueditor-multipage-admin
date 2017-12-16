
// import Vue from 'vue'
// var homeVue = new Vue({
//     el: '#xenon'
// })

import Vue from 'vue'
import xenon from './menu.vue'
import xenonnvg from './nvg.vue'
// require('../center/scss/collect.scss')
// import LeftMenu from '../../components/common/left-menu.vue'

var xeono = new Vue({
    el: '#xenon',
    template: '<xenon/>',
    components: {
        'xenon': xenon
    }
})

var xeononvg = new Vue({
    el: '#xenon-nvg',
    template: '<xenonnvg/>',
    components: {
        'xenonnvg': xenonnvg
    }
})
