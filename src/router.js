import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Theater from './views/theater.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/login',
            component: Login
        }, {
            path: '/theater',
            component: Theater
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            name: 'profile',
            // lazy-loaded
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            // lazy-loaded
            component: () => import('./views/BoardAdmin.vue')
        },
        {
            path: '/mod',
            name: 'moderator',
            // lazy-loaded
            component: () => import('./views/BoardModerator.vue')
        },
        {
            path: '/user',
            name: 'user',
            // lazy-loaded
            component: () => import('./views/BoardUser.vue')
        },
        {

            path: "/management",
            name: "Courses",
            component: () => import("./components/management.vue")
        },
        {
            path: "/addFilmCritics/:id",
            name: "addFilmCritics",
            component: () => import("./components/addFilmCritics.vue")
        }, {
            path: "/comment/:id",
            name: "comment Details",
            component: () => import("./components/comment.vue")
        }, {

            path: "/readcomment/:id",
            name: "Readcomment",
            component: () => import("./components/readcomment.vue")
        }, {
            path: "/filmCritics",
            name: "FilmCritics",
            component: () => import("./components/filmCritics.vue")
        },
        {
            path: "/stockHome",
            name: "stockHome",
            component: () => import("./components/stockHome.vue")
        },
        {
            path: "/foreignPurchases",
            name: "foreignPurchases",
            component: () => import("./components/featuresVue/foreignPurchases.vue")
        },
        {
            path: "/ListedForeignCapitalSoldOver",
            name: "ListedForeignCapitalSoldOver",
            component: () => import("./components/featuresVue/ListedForeignCapitalSoldOver.vue")
        },
        {
            path: "/listedTrustBuy",
            name: "listedTrustBuy",
            component: () => import("./components/featuresVue/listedTrustBuy.vue")
        },
        {
            path: "/listedTrustSell",
            name: "listedTrustSell",
            component: () => import("./components/featuresVue/listedTrustSell.vue")
        },
        {
            path: "/listedDealerSell",
            name: "listedDealerSell",
            component: () => import("./components/featuresVue/listedDealerSell.vue")
        },
        {
            path: "/listedDealerBuy",
            name: "listedDealerBuy",
            component: () => import("./components/featuresVue/listedDealerBuy.vue")
        }, {
            path: "/listedForeignDealerBuy",
            name: "listedForeignDealerBuy",
            component: () => import("./components/featuresVue/listedForeignDealerBuy.vue")
        },{
            path: "/listedForeignDealerSell",
            name: "listedForeignDealerSell",
            component: () => import("./components/featuresVue/listedForeignDealerSell.vue")
        },{
            path: "/listedForeignTrustBuy",
            name: "listedForeignTrustBuy",
            component: () => import("./components/featuresVue/listedForeignTrustBuy.vue")
        },{
            path: "/listedForeignTrustSell",
            name: "listedForeignTrustSell",
            component: () => import("./components/featuresVue/listedForeignTrustSell.vue")
        },{
            path: "/listedTrustDealerBuy",
            name: "listedTrustDealerBuy",
            component: () => import("./components/featuresVue/listedTrustDealerBuy.vue")
        },{
            path: "/listedTrustDealerSell",
            name: "listedTrustDealerSell",
            component: () => import("./components/featuresVue/listedTrustDealerSell.vue")
        },
        {
            path: "/sndividualStockInquiry",
            name: "sndividualStockInquiry",
            component: () => import("./components/featuresVue/sndividualStockInquiry.vue")
        },
        {
            path: "/hightcharts_sndividualStockInquiry",
            name: "hightcharts_sndividualStockInquiry",
            component: () => import("./components/chartFolder/hightcharts_sndividualStockInquiry.vue")
        },{
            path: "/stockCandlesstick",
            name: "stockCandlesstick",
            component: () => import("./components/chartFolder/stockCandlesstick.vue")
        },{
            path: "/hightcharts_monthlyChart",
            name: "monthlyChart",
            component: () => import("./components/chartFolder/monthlyChart.vue")
        },{
            path: "/monthlyrevenue",
            name: "monthlyrevenue",
            component: () => import("./components/featuresVue/monthlyrevenue.vue")
        },
        {
            path: "/mainStockSearch",
            name: "mainStockSearch",
            component: () => import("./components/mainFunction/mainStockSearch.vue")
        },
        {
            path: "/allStockQuery",
            name: "allStockQuery",
            component: () => import("./components/featuresVue/allStockQuery.vue")
        }, {
            path: "/stockRevenueQuery",
            name: "stockRevenueQuery",
            component: () => import("./components/featuresVue/stockRevenueQuery.vue")
        }, {
            path: "/annualGrowthRate",
            name: "annualGrowthRate",
            component: () => import("./components/featuresVue/annualGrowthRate.vue")
        },

    ]
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });