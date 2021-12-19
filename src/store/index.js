import {
  createStore
} from 'vuex'
// import {GetStorage,SetStorage}  from '../untils/localStorage'
export default createStore({
  state: {
    isCollapse: false
  },
  mutations: {
    //菜单栏收缩
    Change_isCollapse(state,data) {
      state.isCollapse =data
    },
  },
  actions: {},
  modules: {}
})