import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import _store from './vuex/store'

//使用vue-router
Vue.use(VueRouter);
//使用vue-resource
Vue.use(VueResource);

import App from './App'

//引入路由列表
import routeList from './routes.js'
const routes = routeList;
const router = new VueRouter({
  routes: routes, // （缩写）相当于 routes: routes
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    document.getElementsByTagName('body')[0].scrollTop = 0;
    return;
  }
})


router.beforeEach(({
  meta,
  path
}, from, next) => {
  console.log('path:' + path + ',from:' + from.path);
  if (path.indexOf('/loginRegis/login') > -1) {
    if(_store.state.isForceLogout)
    {
      _store.state.isForceLogout = false;
      return next();
    }
    var autoLogin = false;
    if (iBHLYZX.isLogined()) {
      var json = eval("(" + iBHLYZX.getToken() + ")");
      if (typeof json != 'undefined' && json && typeof json.userid != 'undefined' && json.userid && typeof json.token != 'undefined' && json.token) {
        _store.commit('addUserId', json.userid);
        _store.commit('addToken', json.token);
        autoLogin = true;
      }
    }
    if (autoLogin) {
      router.push(from.path);
      return false;
    }
  }

  if (_store.state.isBack) {
    _store.state.isBack = false;
    router.go(-1);
    return false;
  }
  next() // 进行下一个钩子函数
})


//挂载 定义了全局的变量以及方法
import store from './vuex/store'
const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  mounted: function () {
    if (iBHLYZX.isLogined()) {
      var json = eval("(" + iBHLYZX.getToken() + ")");
      if (typeof json != 'undefined' && json && typeof json.userid != 'undefined' && json.userid && typeof json.token != 'undefined' && json.token) {
        _store.commit('addUserId', json.userid);
        _store.commit('addToken', json.token);
        _store.state.isLogined = true;
      }
    }
  }
}).$mount('#app')
