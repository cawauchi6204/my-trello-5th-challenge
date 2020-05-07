<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <p class="list-counter">total: {{ totalCardInList }}</p>
      <div class="deletelist" @click="removeList">✖︎</div>
    </div>
    <!-- group属性を使うことで他のコンポーネントへドラッグ&ドロップさせる、または他のコンポーネントからのドラッグ&ドロップを受け付けることができます。

    互いのコンポーネントを同じnameにすることで実装できます。

    ここでのnameはcardsです。

    リストレンダリングとdraggableの相性はかなり良さそう

    これでカードをリスト間でもドラッグ&ドロップできるようになりました。 -->
    <!-- 見た目ではドラッグ&ドロップできましたが、実はこれだけでは、並び替えて新しくなったカードの順番は保存されていません。

    試しにリロードすると、カードは戻ってしまいます。

    カードを並び替えた状態で保存できた方が便利ですね。

    カードを並び替えた状態で保存するためにまず①コンポーネントのdataを更新→ ②ストアにdataを保存する 必要があります。 -->


    <draggable group="cards" :list="cards">
      <Card
      v-for="(item,index) in cards"
      :body="item.body"
      :key="item.id"
      :cardIndex="index"
      :listIndex="listIndex"
      ></Card>
    </draggable>
    <CardAdd :listIndex="listIndex"></CardAdd>
  </div>
</template>

<script>
import CardAdd from './CardAdd'
import Card from './Card'
import draggable from 'vuedraggable'
export default {
  // もし、propsで定義したデータをdataでも定義した場合、ブラウザのJavaScriptコンソールに警告が出る
  // draggableコンポーネントはpropsの1つとして、listプロパティを受け取ります。

  // listプロパティはコンポーネントがドラッグ&ドロップされるたびに定義されたcardsのデータを更新してくれます。

  // propsで受け取った値は直接更新してはいけないというVueのルールがありました。

  // 単方向のデータフロー

  // 今回のlistは特別ですが、基本的にpropsで受け取った値は直接更新できないということは覚えておきましょう。
  props:{
    title:{
      type:String,
      required:true
    },
    listIndex:{
      type:Number,
      required:true
    },
    cards:{
      type:Array,
      required:true
    }
  },
  methods:{
    removeList() {
      if(confirm('本当にこのリストを削除しますか?')) {
        this.$store.dispatch('removeList',{listIndex:this.listIndex})
      }
    }
  },
  components:{
    CardAdd,
    Card,
    draggable
  },
  computed:{
    totalCardInList() {
      return this.cards.length
    }
  }
}
</script>