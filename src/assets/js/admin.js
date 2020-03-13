window.addEventListener("load", function(event) {
    //require('materialize-css/dist/js/materialize.js');

    let Vue = require('vue');
    let VueRouter = require('vue-router');

    Vue.use(VueRouter);

    let Admin_pages = require('./vue/admin/admin_pages/admin_pages.component');
    let Admin_page_edit = require('./vue/admin/Admin_page_edit/Admin_page_edit.component');

    const routes = [
        { path: '/admin/pages', component: Admin_pages },
        { path: '/admin/pages/:pageName', component: Admin_page_edit, props: route => {
                return {pageName: route.params.pageName}
            }
        }
    ];

    const router = new VueRouter({
        mode: 'history',
        routes
    });


    new Vue({
        el: '#admin',
        router
    });

});