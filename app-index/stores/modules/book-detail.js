import { DataBase } from "utils/database";
import dbcfg from "utils/db.cfg";

const bookDetail = {
  namespaced: true,
  state: {
    detail: []
  },
  mutations: {
    GET_BOOK_DETAIL(state, param) {
      let db = new DataBase(dbcfg.dbConfig, dbcfg.storeConfig);
      db.getData(param).then(res => {
        let result = null;
        if (res.status) {
          result = res.data;
        }
        state.detail = result;
      });
    }
  },
  actions: {
    getBookDetail: ({ commit }, param) => {
      commit('GET_BOOK_DETAIL', param);
    }
  }
};

export default bookDetail;