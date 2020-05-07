//クラスバインディングの理解が浅い
<template>
  <form
  @submit.prevent="addList"
  :class="classList"
  >
  <!-- 元々はaddlistのみクラスに入っていたがcomputedプロパティの配列の中にaddlistを入れていて、条件によっては他のクラスも配列に入れるような仕様になっている -->
  <input
  type="text"
  v-model="title"
  class="text-input"
  placeholder="Add new list"
  @focusin="startEditing"
  @focusout="finishEditing"
  >
  <button
  type="submit"
  class="add-button"
  v-if="isEditing || titleExists"
  >Add</button>
  </form>
<!--  フォームにフォーカスが当たっている時とフォームの中に文字が入っている場合のみボタンが現れる -->
</template>

<script>
export default {
  data() {
    return {
      title:'',
      isEditing:false,
    }
  },
  methods:{
    addList() {
      this.$store.dispatch('addList' , {title:this.title})
      this.title = ""
    },
    startEditing() {
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    }
  },
  computed:{
    // const classListの中に入っているaddlistは既定のクラス
    // 条件(boolean)によって他のクラスを入れている
    classList() {
      const classList = ['addlist']
      if (this.isEditing) {
        classList.push('active')
      }
      if(this.titleExists) {
        classList.push('addable')
      }
      return classList
    },
    titleExists() {
      return this.title.length > 0
    }

  }
}
</script>
