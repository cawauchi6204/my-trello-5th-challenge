import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists-5th')

const store = new Vuex.Store({
  state:{
    lists:savedLists ? JSON.parse(savedLists):[
      {
        title:'Backlog',
        cards:[
          {body:'English'},
          {body:'Mathmatics'}
        ]
      },
      {
        title:'hogehoge',
        cards:[
          {body:'unchi'}
        ]
      },
      {
        title:'fugafuga',
        cards:[]
      }
    ]
  },
  mutations:{
    addList(state,payload) {
      state.lists.push({ title:payload.title,cards:[] })
    },
    removeList(state,payload) {
      state.lists.splice(payload.listIndex,1)
    },
    // [payload.listIndex]あたりが理解できていない
    addCardToList(state,payload) {
      state.lists[payload.listIndex].cards.push({body:payload.body})
    },
    removeCardFromList(state,payload) {
      state.lists[payload.listIndex].cards.splice(payload.cardIndex,1)
    },
    updateList(state,payload) {
      state.lists = payload.lists
    }

  },
  actions:{
    addList(context,payload) {
      context.commit('addList' , payload)
    },
    removeList(context,payload) {
      context.commit('removeList',payload)
    },
    addCardToList(context,payload) {
      context.commit('addCardToList',payload)
    },
    removeCardFromList(context,payload) {
      context.commit('removeCardFromList',payload)
    },
    updateList(context,payload) {
      context.commit('updateList',payload)
    }
  },
  getters:{
    // boardに表示させる全てのタスク数をgettersで出している
    totalCardCount(state) {
      let count = 0
      state.lists.map(content => count += content.cards.length)
      return count
    }
  }
})

// この下のstoreをsubscribeするために上のvuexを定数化した
// subscribeはストアのインスタンスメソッドで、全てのmutationの後に呼ばれます。
// 第一引数にmutationインスタンス、第二引数にmutation後のデータの状態を受け取ります。
// ストアへのミューテーションを購読します。handler は、全てのミューテーションの後に呼ばれ、引数として、ミューテーション ディスクリプタとミューテーション後の状態を受け取ります。

  store.subscribe((mutation,state) => {
    localStorage.setItem('trello-lists-5th', JSON.stringify(state.lists))
  })

  export default store