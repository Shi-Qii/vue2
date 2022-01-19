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
        path: "/test123564",
        name: "test123564",
        component: () => import("./components/test123564.vue")
      }

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