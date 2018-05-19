import Vue from "vue";
import Router from "vue-router";

import Index from "pages/index/index";
import Route404 from "pages/route404";
import Login from "pages/login";
import EvlistMoumita from "pages/evlist-moumita";
import EventDetail from "pages/event-detail";

import store from "store";
/*
import Login from '@/components/Login'
import Member from '@/components/Member'
import ProductList from '@/components/Product/List'
import ProductDetail from '@/components/Product/Detail'
*/
Vue.use(Router);

var router = new Router({
	//saveScrollPosition: true,
	scrollBehavior: function(to, from, savedPosition){
		return savedPosition || {
			x: 0,
			y: 0,
		};
	},
	routes: [
		{
			component: Index,
			path     : "/",
		},
		{
			component: Index,
			path     : "/logout",
			redirect : to => {
				store.dispatch("auth/logout");
				return "/";
			},
		},
		{
			component: Login,
			path     : "/login",
			meta     : {
				requiresNotAuth: true,
			},
		},
		{
			component: EvlistMoumita,
			meta     : {
				requiresAuth: true,
			},
			path: "/moumita",
		},
		{
			component: EventDetail,
			path     : "/events/:event_id",
			props    : route => ({
				event_id: route.params.event_id - 0,
			}),
		},
		/*
      {
        path: '/member',
        component: require('@/views/Member'),
        // ネストされたルート
        children: [
          {
            path: '',
            name: 'member-list',
            component: require('@/views/Member/List')
          },
          {
            path: ':id',
            name: 'member-detail',
            component: require('@/views/Member/Detail'),
            // パラメータをpropsとして渡すことでRouterに依存しなくなる
            props: route => ({ id: Number(route.params.id) })
          }
        ]
      }
      // 大きく「login」と「member」に分ける。member以下はログインしてないと遷移できないように。
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'member',
          name: 'member',
          component: Member,
          meta: {
            requiresAuth: true
          },
          // 各ページは以下に追加していく
          children: [
            {
              path: 'product/list',
              name: 'product/list',
              component: ProductList
            },
            {
              path: 'product/detail/:id',
              name: 'product/detail',
              component: ProductDetail
            }
          ]
        }
      ]
*/
		{
			component: Route404,
			path     : "*",
		},
	],
});

// ログイン認証はここで行う
router.beforeEach((to, from, next) => {
	//console.log(to, from, next);
	if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.loggedIn){
		next({
			path: "/login",
		});
	} else if (to.matched.some(record => record.meta.requiresNotAuth) && store.state.auth.loggedIn){
		next({
			path: "/",
		});
	} else {
		next();
	}
});
console.log(store.state);
export default router;
