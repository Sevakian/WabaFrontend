import Vue from 'vue'
import Vuex from 'vuex'

import date from './modules/date'
import track from './modules/track'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    date,
    track,
  },
  mutations: {},
  actions: {},

});
