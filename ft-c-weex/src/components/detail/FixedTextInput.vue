<template>
  <div class="box">
      <input ref="input" class="input" type="text" :placeholder="placeholder" @change="change"/>
  </div>
</template>

<script>
const defaultPlaceholder = '来说点什么吧~'
export default {
  props: ['foot'],
  data () {
    return {
      placeholder: defaultPlaceholder
    }
  },
  methods: {
    focus (text = '') {
      this.$refs.input.focus()
      this.placeholder = text || defaultPlaceholder
    },
    blur () {
      this.$refs.input.blur()
      this.placeholder = defaultPlaceholder
    }
  }

}
</script>

<style scoped>
.box{
    position: fixed;
    background-color: #ffffff;
    left: 0;
    right: 0;
    height: 100px;
    bottom: 0;
    border-top-width: 1px;
    border-top-color: #CBCBCB;
}
.input{
    background-color: #F1F1F1;
    height: 60px;
    margin-left: 30px;
    margin-right: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 16px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    color: #333333;
    font-size: 30px;
}
</style>
