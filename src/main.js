// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'// 引入elementui
import App from './App'
import router from './router'
import axios from 'axios' // 引用axios
import Utils from './utils/utils' //引用公共方法
import 'element-ui/lib/theme-chalk/index.css'//引入element-ui样式
import '../static/css/common.css'//引入公共样式

// 引入mock
process.env.MOCK && require('./Mock')

Vue.use(ElementUI) // 使用element-ui
Vue.config.productionTip = false
Vue.prototype.$axios = axios // 使用axios
Vue.prototype.$Utils = Utils //使用公共方法

// 点击区域外的指令
Vue.directive('outside', {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }
      // 判断是不是点击弹窗或者loading遮罩层
      let flag = false
      if (e.path) {
        e.path.forEach(item => {
          if (item.className) {
            if (item.className.toString().indexOf('dialogs') !== -1 || item.className.toString().indexOf('el-loading-mask') !== -1) {
              flag = true
            }
          }
        })
        if (flag) {
          return false
        }
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update () {},
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
// 滚动加载指令
Vue.directive('loadmore', {bind (el, binding) {
  const selectWrap = el.querySelector('.el-table__body-wrapper')
  selectWrap.addEventListener('scroll', function () {
    let sign = 100
    const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
    if (scrollDistance <= sign) {
      binding.value()
    }
  })
}})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
