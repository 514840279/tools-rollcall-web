import { createStore } from 'vuex'
import rollcall from './modules/rollcall';

export default  createStore({
  modules: {
    rollcall,
  }
})