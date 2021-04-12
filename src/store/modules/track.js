export default {
    namespaced: true,
    state:{
        list: [],
        counter: 0,
    },

    getters: {
        getTrackList: state => {
            return state.list
        }
    },

    mutations: {
        setTrack(state){
            state.list[state.counter] = state.counter;
            state.counter++;
        }
    },

    actions: {
        init({commit}){
            var j = 0;
            while(j < 100){((j) => {
                setTimeout(() => { commit("setTrack");
                }, 111 * j)
              })(j++)
            }   
        }
    }
}