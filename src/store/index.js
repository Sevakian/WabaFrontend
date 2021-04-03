import Vue from 'vue'
import Vuex from 'vuex'

import date from './modules/date'
import track from './modules/track'
import calendar from './modules/calendar'
import game from './modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    date,
    track,
    calendar,
    game
  },
  mutations: {},
  actions: {},

});
