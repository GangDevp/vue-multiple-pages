import Vue from 'vue';
import Vuex from 'vuex';
import indexStores from 'index/stores/index';
import videoStores from 'video/stores/index';

Vue.use(Vuex);
const modules = Object.assign({}, indexStores, videoStores);
const store = new Vuex.Store({
	modules: modules
});

export default store;
