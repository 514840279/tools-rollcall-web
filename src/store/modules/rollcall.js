
 const rollcall = {
  namespaced: true,
  state: {
    classRoom: {},
    persons:[],
      mess:"asdfff",
  },
  getters: {
  },
  mutations: {
    setClassRoom(state,n){
      state.classRoom = n;
    },
    setMess(state,n){
      state.mess = n;
    },
    setPersonList(state,n){
      state.persons = n;
    },
    
  },
  actions: {
  },
  modules: {
  }
}

export default rollcall;