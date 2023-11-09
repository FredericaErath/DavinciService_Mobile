import Vue from 'vue'
import App from './App'
import store from '@/store';
import uView from "uview-ui";
import tabBar from "components/tabbar/tabBar.vue"//引入我们自己定义的tabBar组件

Vue.use(uView);
Vue.component('tab-bar', tabBar)//使用tabBar组件
Vue.config.productionTip = false


// vuex
const vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

App.mpType = 'app'
const app = new Vue({
	store,
	...App
})

// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

// 公共函数
import globalFunc from '@/utils/common.js'
Vue.use(globalFunc, app)

// 微信SDK
// #ifdef H5
import weixin from '@/utils/jwx.js'
Vue.use(weixin, app)
// #endif

app.$mount()
