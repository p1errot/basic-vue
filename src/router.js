import Vue from 'vue';
import Router from 'vue-router';
import DataSection from './components/DataSection';

Vue.use(Router);
const location = window.location;

const router = new Router({
  base: `${location.protocol}//${location.host}`,
  routes: [
    {
      path: '/',
      name: 'index'
    },
    {
      path: '/term/:term',
      name: 'data',
      component: DataSection,
      props: route => ({ term: route.params.term })
    }
  ]
});

export default router;
