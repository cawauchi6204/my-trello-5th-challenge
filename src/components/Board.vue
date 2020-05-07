<template>
  <div>
    <header>
      my Trello 5th challenge
    </header>
    <main>
      <p class="info-line">All: {{ totalCardCount }} tasks</p>
      <draggable 
      :list="lists" 
      class="list-index"
      @end="movingList"
      >
        <list
        v-for="(item,index) in lists"
        :key="item.id"
        :listIndex="index"
        :title="item.title"
        :cards="item.cards"
        >
        </list>
      <listAdd/>
      </draggable>
    </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import ListAdd from './ListAdd'
import List from './List'
// mapStateのfromはvuexでないといけない
// 今回from '../store/index.js'としてバグがおきた
import { mapState } from 'vuex'

export default {
  components:{
    ListAdd,
    List,
    draggable
  },
    computed:{
    ...mapState([
      'lists'
    ]),
    totalCardCount() {
      return this.$store.getters.totalCardCount
    }
  },
  methods:{
    movingCard() {
      this.$store.dispatch('updateList' , {lists:this.lists})
    },
    movingList() {
      this.$store.dispatch('updateList' ,{lists:this.lists})
    }
  }
}
</script>

<style>

</style>