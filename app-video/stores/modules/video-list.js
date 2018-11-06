const videoList = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    GET_VIDEO_LIST(state) {
      let data = [
        {name: '权力的游戏', time: '45min'},
        {name: '复仇者联盟', time: '120min'},
        {name: '神盾局特工', time: '45min'}
      ];
      state.list = data;
    }
  },
  actions: {
    getVideoList: ({ commit }) => {
      commit('GET_VIDEO_LIST');
    }
  }
};

export default videoList;