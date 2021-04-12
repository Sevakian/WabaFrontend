import todoapi from '../../api/todoapi'

export default {
    namespaced: true,
    
    state: {
        selectedTodo: [{
            todo_id: '',
            title: '',
            text: '',
            verwendung_id: '',
            priorität: '',
            status: ''
        }],

        todos: [],
        verwendungen: [],
        filterVerwendung: [],
    },

    getters: {
        _getVerwendungen(state){
            return state.verwendungen;
        },
        _getTodos(state){
            let verw = state.verwendungen;
            let filterVal = state.filterVerwendung;
            let list = state.todos;
            let newList = {};
            console.log(filterVal);


            for(let i = 0; i < verw.length;i++){

                let kategorie = [];
                for(let j = 0; j < list.length; j++){     
                    if(verw[i].verwendung_id == list[j].verwendung_id){
                        kategorie.push(list[j])
                    }
                }
                let condition = filterVal.filter(x => x == verw[i].verwendung_id)

                if(condition.length != 0){
                    newList[verw[i].verwendung_id] = {index: verw[i].title , data: kategorie}
                }
                
            }
            console.log(newList);
            return newList
        },

        _getSelectedTodo(state){
            return state.selectedTodo
        }
    },

    mutations: { 
        setTodos(state, inTodos){
            state.todos = inTodos
        },
        setVerwendungen(state, inVerwendungen){
            state.verwendungen = inVerwendungen
        },
        setFilterVerwendung(state, inVerwendung){
            state.filterVerwendung = inVerwendung
        },
        setSelectedTodo(state, id){
            if(id == null){
                state.selectedTodo = [{      
                    todo_id: '',
                    title: '',
                    text: '',
                    verwendung_id: 6,
                    priorität: 'Neutral',
                    status: 'erledigen'
                }]
            }
            else if (id != null){
                state.selectedTodo = state.todos.filter(x => x.todo_id == id)
            }
        },
    },

    actions: { 
        async getTodos({commit}){
            let results = await todoapi.getTodos();
            commit('setTodos', results)
        },
        async getVerwendungen({commit}){
            let results = await todoapi.getVerwendungen();
            commit('setVerwendungen', results)
        },

        async addTodo({dispatch}, toTodo){
            if(toTodo.id == null){
                await todoapi.addTodo(
                    toTodo.title,
                    toTodo.text,
                    toTodo.verwendung,
                    toTodo.priorität,
                    toTodo.status,

                )
            }
            else if(toTodo.id != null){
                await todoapi.updateTodo(
                    toTodo.id,
                    toTodo.title,
                    toTodo.text,
                    toTodo.verwendung,
                    toTodo.priorität,
                    toTodo.status,

                )
            }
            dispatch('getTodos')
        },
        async selectTodo({commit}, inId){
            commit("setSelectedTodo", inId)
        },
        async filterByVerwendung({commit}, inVerwendung){
            commit('setFilterVerwendung', inVerwendung)

        }
    },

}