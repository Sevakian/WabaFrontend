import Vue from 'vue'
import Vuex from 'vuex'

import timestats from './modules/timestats'
import track from './modules/track'
import calendar from './modules/calendar'
import game from './modules/game'
import todo from './modules/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timestats,
    track,
    calendar,
    game,
    todo
  },
  mutations: {},
  actions: {},

});
