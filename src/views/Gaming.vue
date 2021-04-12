<template>
    <div>
        <div class="container"> 
            <addGame :selected="selectedGame"/>
            <div>
                <div class="head"> 
                    <h3> Anzahl Spiele: {{ count }}</h3>
                </div>
    
                <div class="container"> 
                    <div class="box"> 
                    <table>
                        <tr>
                            <th> Bild </th>
                            <th> Name </th> 
                            <th> Serie </th>
                            <th> Genre </th>
                            <th> Datum </th>
                            <th> Entwickler </th>
                            <th> Größe </th>
                            <th> Verkaufte einheiten </th>
                        </tr>
                        <tr :style="getColor(x.Status)" v-for="x in this.games" :key="x.id"> 
                            <td> 
                                <div v-if="x.Bild != null"> 
                                <img height="auto" width="80" :src="getImgGame(x.Bild)" alt="" />
                                </div>
                            </td>
                            <td style="width:200px;" @click="setselectGame(x.Spielid)">  {{ x.Spielename }} </td>
                            <td> {{ x.Spieleserie }}</td>
                            <td> {{ x.Genre }}</td>
                            <td style="width:100px;"> {{ getDate(x.Erscheinungsjahr)}}</td>
                            <td> {{ x.Entwickler }}</td>
                            <td> {{ x.GrößeGB }}</td>
                            <td> {{ x.AnzahlVerkauft}}</td>

                        </tr>
                    </table>
                    </div>
                    <!-- Filter Konsol -->
                    <div> 
                        <div class="eingabe"> 
                            <label> Suche Parameter: </label><br>
                            <input @input="filterValue(filterVal)" v-model="filterVal" type="text" size="45">
                        </div>
                        <div class="eingabecheck"> 
                            <div :style="getColor(x.Status)" v-for="x in this.konsoles" :key="x.id">
                                <label> {{ x.KonsoleName }}</label>
                                <input :value="x.Konsoleid" v-model="filterKonsol"  type="checkbox">
                            </div>
                        </div>
                        <div>
                            <h4> Status </h4>
                                <p> 
                                <input v-model="filterStatus" type="checkbox" value=''> 
                                <label> Nichts ausgewählt</label>
                                </p>
                                <p> 
                                
                                <input v-model="filterStatus" type="checkbox" value="hab">  
                                <label> Hab </label>
                                
                                <input v-model="filterStatus" type="checkbox" value="hab digital"> 
                                <label> Hab Digital </label>

                                <input v-model="filterStatus" type="checkbox" value="hab physisch">  
                                <label> Hab Physisch </label>
                                </p>
                                <p> 
                                <input v-model="filterStatus" type="checkbox" value="verloren"> 
                                <label> Verloren/Neu Kaufen </label>   
                                </p>
                                <p> 
                                <input v-model="filterStatus" type="checkbox" value="kaufen">  
                                <label> Kaufen</label>

                                <input v-model="filterStatus" type="checkbox" value="downloaden">  
                                <label> Downloaden </label>

                                <input v-model="filterStatus" type="checkbox" value="merken"> 
                                <label> Merken </label>
                                </p>

                                
                        </div>
                    </div>

                </div>
            </div>
            <!-- <div class="listItem"> 
                <div v-for="x in this.games" :key="x.id">
                    <div @click="setselectGame(x.Spielid)"> {{ x.Spielename }}</div>
                </div>
            </div> -->
        </div>
        <hr>
        <div> 
            <!-- <div style="width:100px;">
                <span  v-for="x in this.games" :key="x.id"> {{ x.Spielename }}</span><br>
            </div> -->
        </div>



        <hr>

        <button @click="setselectKonsole(null)"> Neue Konsole </button>
        <div class="container"> 
            <addKonsole :selected="selectedKonsole"/>
            <div class="container"> 
                <div class="box"> 
                <table>
                    <tr>
                        <th> Bild </th>
                        <th> Name </th> 
                        <th> Jahr </th>
                        <th> Hersteller </th>
                        <th> Typ </th>
                        <th> Generation </th>
                    </tr>
                    <tr :style="getColor(x.Status)" v-for="x in this.konsoles" :key="x.id"> 
                        <td> 
                            <div v-if="x.Bild != null"> 
                                <img height="auto" width="100" :src="getImgKonsol(x.Bild)" alt="" />
                            </div>
                        </td>
                        <td @click="setselectKonsole(x.Konsoleid)">  {{ x.KonsoleName }} </td>
                        <td style="width:100px;"> {{ getDate(x.Erscheinungsjahr) }}</td>
                        <td> {{ x.Hersteller }} </td>
                        <td> {{ x.Typ }}</td>
                        <td> {{ x.Generation }}</td>
                    </tr>
                </table>
                </div> 
            </div>
        </div>

    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import addGame from '@/components/gaming/addGame.vue'
import addKonsole from '@/components/gaming/addKonsole.vue'
import moment from 'moment'
// import selectedGame from '@/components/gaming/selectedGame.vue'
// import selectedKonsole from '@/components/gaming/selectedKonsole.vue'

export default {
    name: "Gaming",
    components: {
        addGame,
        addKonsole,
        // selectedGame,
        // selectedKonsole
    },
    data() {
        return {
            count: 0,
            filterVal: "",
            filterStatus: [],
            filterKonsol: [],
        }
    },

    methods: {
    ...mapActions('game', [ 'getKonsoles', 'getGames', 
                            'selectGame', 'selectKonsole', 
                            'filterByVal', 'filterByStatus', 'filterByKonsol']),

        getImgGame(val){
            if(val != null){
                return require('./../assets/gaming/games/' + val)
            }
        },
        getImgKonsol(val){
            if(val != null){
                return require('./../assets/gaming/konsoles/' + val)
            }
        },

        getDate(val){
            if(val != null){

            
            // val = moment(val).format('YYYY-MM-DD')
            let day = moment(val).format('DD');
            let month = moment(val).format('MM');
            switch(month){
                case "01": month = "Jan"; break;
                case "02": month = "Feb"; break;
                case "03": month = "März"; break;
                case "04": month = "Apr"; break;
                case "05": month = "Mai"; break;
                case "06": month = "Juni"; break;
                case "07": month = "Juli"; break;
                case "08": month = "Aug"; break;
                case "09": month = "Sep"; break;
                case "10": month = "Okt"; break;
                case "11": month = "Nov"; break;
                case "12": month = "Dez"; break;  
            }
            let year = moment(val).format('YYYY')
            return year + " " + month + " " + day;
            }
        },

        getColor(val){
            switch(val){
                case null:
                    break
                // case 'hab':
                //     return 'background-color:#87CEFA;';
                // case 'hab physisch':
                //     return 'background-color:#87BEFA;';
                // case 'hab digital':
                //     return 'background-color:#87DEFA;';
                case 'hab':
                    return 'background-color:black;';
                case 'hab physisch':
                    return 'background-color:black;';
                case 'hab digital':
                    return 'background-color:black;';

                case 'verloren':
                    return 'background-color:#FF4500;'
                case 'kaufen':
                    return 'background-color:#ADFF2F;'
                case 'downloaden':
                    return 'background-color:#FFD700;'
                case 'merken':
                    return 'background-color:#CAD700;'
            }
        },
        setselectGame(inId){
            event.preventDefault();
            this.selectGame(inId);
        },
        setselectKonsole(inId){
            event.preventDefault();
            this.selectKonsole(inId);
        },

        filterValue(filterVal){
            var filter = filterVal.toString().split(',')
            for(var i = 0; i < filter.length; i++){
              filter[i] = filter[i].trim();
            }   
            filter = filter.filter(x => x != "");  
            this.filterByVal(filter);       
        }
    },

    computed: {
        ...mapGetters('game', [ '_getKonsoles','_getGames', '_getGameList', 
                                '_getSelectedGame', '_getSelectedKonsole']),

        konsoles: function(){
            return this._getKonsoles
        },
        games: function(){
            return this._getGameList
        },
        selectedGame: function(){
            return this._getSelectedGame[0]
        },
        selectedKonsole: function(){
            return this._getSelectedKonsole[0]
        },   
    },

    watch: {
        filterKonsol: function(){
            this.filterByKonsol(this.filterKonsol)
        },
        filterStatus: function(){
            this.filterByStatus(this.filterStatus)
        },

        konsoles: function(){
            return this._getKonsoles;
        },
        games: function(){
            this.count = this._getGameList.length
            return this._getGameList;
        },
        selectedGame: function(){
            return this._getSelectedGame[0]
        }
    },

    created(){
        this.getKonsoles();
        this.getGames();
    },
}
</script>
<style scoped>
    .container{
        display:flex;
    }
    .listItem{
        flex-direction:column;
    }
    .box{
        height: 1000px;
        overflow: auto;
        margin: 20px;
    }
    .head{
        margin: 20px;
    }
    table {
        border-collapse: collapse;

    }
    .row:hover{
        background-color: #9999
    }
    td, th {
        padding: 0.5rem;
        text-align: left;
        border: 1px solid #999;
    }


</style>