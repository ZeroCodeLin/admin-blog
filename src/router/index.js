import Vue from 'vue';
import VueRouter from 'vue-router';

import User from '../view/user.vue'
import Home from '../view/home.vue'
import List from '../view/list.vue'
import Login from '../view/login.vue'
import Main from '../view/main.vue'
import Write from '../view/write.vue'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', component: Main, redirect: '/home', children: [
            { path: '/home', component: Home },
            { path: '/user', component: User },
            { path: '/list', component: List },
            { path: '/write', component: Write },
        ]},
        
        { path: '/login', component: Login },
    ]
})