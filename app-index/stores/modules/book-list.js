import { DataBase } from "utils/database";
import dbcfg from "utils/db.cfg";

const bookList = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    QUERY_BOOK_LIST(state) {
      let db = new DataBase(dbcfg.dbConfig, dbcfg.storeConfig);
      db.getAll().then(res => {
        let result = [];
        if (res.status) {
          result = res.data;
        }
        state.list = result;
      });
    }
  },
  actions: {
    queryBookList: ({ commit }) => {
      commit('QUERY_BOOK_LIST');
    }
  }
};

export default bookList;