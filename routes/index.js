import Vue from 'vue';
import Router from 'vue-router';
import {indexRoutes} from 'index/routes/index'; 
import {videoRoutes} from 'video/routes/index'; 

const temp = [];
const routes = temp.concat(indexRoutes, videoRoutes);
Vue.use(Router);

export default new Router({
	routes: routes
});
