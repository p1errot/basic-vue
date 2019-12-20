import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false

/* This is the way to insert a global filter
 *
 * To add a filter in a component, add it same as
 * methods or computed values
 */
Vue.filter('uppercase', function(value) {
  if (!value) return '';

  return value.toUpperCase();
});

Vue.filter('lowercase', function(value) {
  if (!value) return '';

  return value.toLowerCase();
});

Vue.filter('toURL', function(value) {
  if (!value) return '';

  return encodeURI(value.toLowerCase());
});

/*
 * Check https://vuejs.org/v2/guide/custom-directive.html
 * for custom directives
 */
Vue.directive("pin", {
  bind: function(el, binding /*vnode, oldVnode*/) {
    const f = function(event) {
      if (binding.value(event, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
